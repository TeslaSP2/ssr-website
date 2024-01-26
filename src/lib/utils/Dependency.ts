import { ArchivePost } from "../../interfaces/ArchivePost";
import { PaginationFilter } from "../../interfaces/PaginationFilter";
import { Post } from "../../interfaces/Post";
import { promises } from 'node:fs'

export async function read<T>(path: string) {
  let r = await promises.readFile(`../website-data/jsons/${path}`, { encoding: 'utf8' });
  return JSON.parse(r) as T;
}

export function getFeaturedStuffFromPost(archivePost: ArchivePost, post: Post, lang: string = "en") {
  let year = archivePost.unlockDate.toDate().getFullYear() + ""
  let ret: { image: string; censImage?: string; alt?: string; } = { image: "", censImage: undefined, alt: undefined };

  ret.image = post.featuredImage != undefined ? (`https://files.teslasp2.com/assets/imgs/posts/${year}/${archivePost.jsonName}/${true && post.censoredFeaturedImage != undefined ? post.censoredFeaturedImage : post.featuredImage}`) : '';
  if (post.censoredFeaturedImage == undefined) {
    if (post.altFeaturedImage != undefined) {
      if (isNaN(+post.altFeaturedImage))
        ret.alt = post.altFeaturedImage;
      else {
        let altLines: string[] = [];
        let imgBlock = post.body.filter(block => block.type == 'img').firstOrDefault();
        if (imgBlock != null)
          if (imgBlock.alt != undefined)
            if (imgBlock.alt.filter(a => a.key == lang).firstOrDefault() != null) {
              let stuff = imgBlock.alt.filter(a => a.key == lang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true);

              if (stuff.length > 0)
                for (const s of stuff) {
                  altLines.push(s.str);
                }
            }

        if (altLines.length > 0)
          ret.alt = altLines[(+post.altFeaturedImage - 1)];
      }
    }
    else {
      let firstImage = post.body.filter(block => block.type == 'img').firstOrDefault();

      if (firstImage != null)
        if (firstImage.alt != undefined)
          if (firstImage.alt.filter(a => a.key == lang).firstOrDefault() != null) {
            let stuff = firstImage.alt.filter(a => a.key == lang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true).firstOrDefault();
            ret.alt = stuff != null ? stuff.str : undefined;
          }
    }
  }
  return ret;
};

export async function getPosts(paginationFilter?: PaginationFilter) {
  let retPag: { data: ArchivePost[]; length: number; hasNSFW: boolean; hasCringe: boolean; hasScrapped: boolean; hasMusical: boolean } = {
    data: [],
    length: 0,
    hasNSFW: true,
    hasCringe: true,
    hasScrapped: true,
    hasMusical: true
  }
  let data = await read<ArchivePost[]>(`archive-posts.json`);
  if (paginationFilter == undefined) {
    retPag.data = data.sort((p1, p2) => {
      return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
    });
    retPag.length = data.length;
    retPag.hasNSFW = data.filter(p => p.nsfw).length > 0;
    retPag.hasCringe = data.filter(p => p.cringe).length > 0;
    retPag.hasScrapped = data.filter(p => p.scrapped).length > 0;
    retPag.hasMusical = data.filter(p => p.musical).length > 0;
    return retPag;
  }
  else {
    if (paginationFilter.search != undefined) {
      paginationFilter.search = paginationFilter.search.filter(s => s != "");
    }

    let ret = await data.sort((p1, p2) => {
      return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
    }).filterAsync(async (p: ArchivePost) =>
      ((paginationFilter.seeSpecific == "scrapped" ? p.scrapped : (p.scrapped ? paginationFilter.seeScrapped : true))
        && (paginationFilter.seeSpecific == "nsfw" ? p.nsfw : (p.nsfw ? (paginationFilter.seeNSFW ? true : await hasSFW(p)) : true))
        && (paginationFilter.seeSpecific == "cringe" ? p.cringe : (p.cringe ? paginationFilter.seeCringe : true))
        && (paginationFilter.seeSpecific == "musical" ? p.musical : (p.musical ? paginationFilter.seeMusical : true))
        && (paginationFilter.year != undefined ? paginationFilter.year == (p.unlockDate.toDate().getFullYear() + "") : true)
        && (tagsCollectionHandler(p, paginationFilter))
        && (paginationFilter.postExclude != undefined ? !paginationFilter.postExclude.includes(p.jsonName) : true)
        && (p.unlockDate.checkForUnlock())
        && (unlistedHandler(p, paginationFilter))) ?? false
    ).then(data => {
      return data.search(paginationFilter.search, paginationFilter.currentLang)
        .sort((p1, p2) => {
          switch (paginationFilter.sortType) {
            case 'date':
              {
                return p1.unlockDate.toDate() > p2.unlockDate.toDate() ?
                  paginationFilter.ascending ?
                    1 : -1
                  :
                  paginationFilter.ascending ?
                    -1 : 1;
              }
            case 'alph':
              {
                let name1 = "";
                let titleLine1 = p1.linkPart.filter(h => h.key == paginationFilter.currentLang || (h.key != paginationFilter.currentLang && h.key == "def")).firstOrDefault();
                name1 = titleLine1 != null ? titleLine1.str : p1.linkPart[0].str;

                let name2 = "";
                let titleLine2 = p2.linkPart.filter(h => h.key == paginationFilter.currentLang || (h.key != paginationFilter.currentLang && h.key == "def")).firstOrDefault();
                name2 = titleLine2 != null ? titleLine2.str : p2.linkPart[0].str;

                return paginationFilter.ascending ? name1.toLowerCase().localeCompare(name2.toLowerCase()) : -name1.toLowerCase().localeCompare(name2.toLowerCase());
              }
          }

          return 0;
        });

    })
    retPag.hasNSFW = ret.filter(p => p.nsfw).length > 0;
    retPag.hasCringe = ret.filter(p => p.cringe).length > 0;
    retPag.hasScrapped = ret.filter(p => p.scrapped).length > 0;
    retPag.hasMusical = ret.filter(p => p.musical).length > 0;
    retPag.length = ret.length;
    retPag.data = ret.slice(paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page - 1) * paginationFilter.pageSize : undefined, paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page * paginationFilter.pageSize) : undefined);
    return retPag;
  }
}

export function unlistedHandler(p: ArchivePost, paginationFilter: PaginationFilter) {
  if (p.unlisted == true)
    if (paginationFilter.search != undefined)
      return paginationFilter.search.includes("id:" + p.id) || compareTerms(paginationFilter.search, p.tags) || paginationFilter.search.filter(s => s.includes("🔑:")).length > 0;
    else
      return false;
  else
    return true;
}

export function tagsCollectionHandler(p: ArchivePost, paginationFilter: PaginationFilter) {
  if (paginationFilter.collections != undefined) {
    if (p.collection != undefined) {
      return p.collection.filter(c => paginationFilter.collections?.includes(c)).length > 0;
    }
    else
      return paginationFilter.collections.length > 1;
  }
  else if (paginationFilter.tags != undefined) {
    if (p.tags != undefined) {
      return p.tags.filter(c => paginationFilter.tags?.includes(c)).length > 0;
    }
    else
      return paginationFilter.tags.length > 1;
  }

  return true;
}

export async function getPostLength(paginationFilter?: PaginationFilter) {
  if (paginationFilter == undefined)
    return (await getPosts()).length;
  else {
    let copy = paginationFilter;
    copy.page = undefined;
    copy.pageSize = undefined;
    return (await getPosts(copy)).length;
  }
}

export async function hasSFW(p: ArchivePost) {

  if (p == undefined)
    return true;

  if (p.unlockDate == "")
    return true;

  if (isNaN(p.unlockDate.toDate().getFullYear()))
    return true;

  if (p.jsonName == undefined)
    return !p.nsfw;
  else {
    let post = await read<Post>(`posts/${p.unlockDate.toDate().getFullYear()}/${p.jsonName}.json`);

    if (post.allNsfw == true)
      return false;

    let hasSFW = false;
    let cont = 0;

    let stuffCanNSFW = post.body.filter(b => b.type != "p" && b.type != "space" && b.type != "player");

    if (stuffCanNSFW.length > 0)
      while (!hasSFW && cont < stuffCanNSFW.length) {
        const block = stuffCanNSFW[cont];

        for (const content of block.content) {
          if (content.stuff.filter(s => s.nsfw != true).length > 0 || content.stuff.filter(s => s.onlySfw == true).length > 0) {
            hasSFW = true;
            break;
          }
        }

        if (block.alt != undefined && !hasSFW) {
          for (const alt of block.alt) {
            if (alt.stuff.filter(s => s.nsfw != true).length > 0 || alt.stuff.filter(s => s.onlySfw == true).length > 0) {
              hasSFW = true;
              break;
            }
          }
        }

        if (block.downloads != undefined && !hasSFW) {
          for (const download of block.downloads) {
            if (download.stuff.filter(s => s.nsfw != true).length > 0 || download.stuff.filter(s => s.onlySfw == true).length > 0) {
              hasSFW = true;
              break;
            }
          }
        }

        if (block.messages != undefined && !hasSFW) {
          for (const message of block.messages) {
            if (message.stuff.filter(s => s.nsfw != true).length > 0 || message.stuff.filter(s => s.onlySfw == true).length > 0) {
              hasSFW = true;
              break;
            }
          }
        }

        cont++;
      }
    else
      hasSFW = true;

    return hasSFW;
  }
}

function compareTerms(searchTerms: string[], tags?: string[]) {
  if (tags != undefined) {
    let l = tags.length;
    let c: string[] = [];
    for (const tag of tags) {

      if (searchTerms.includes("t:" + tag)) {
        c.push("t:" + tag);
      }
    }
    return c.length == l;
  }
  return false;
}