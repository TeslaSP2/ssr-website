import { Injectable } from '@angular/core';
import { ArchivePost } from '../interfaces/archive-post';
import { RandomInt } from '../interfaces/gen-methods';
import { PaginationFilter } from '../interfaces/pagination-filter';
import { OcBiosService } from './oc-bios.service';
import { PostService } from './post.service';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  private archivePosts: ArchivePost[] = []

  constructor(private postService: PostService,
    private ocBiosService: OcBiosService,
    private remoteJson: RemoteJsonReaderService) {
      this.awake();
  }

  public async awake() {
    this.remoteJson.get<ArchivePost[]>('archive-posts.json').then(data => {
      this.archivePosts = data.sort((p1, p2) => {
        return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
      })
    });
  }

  public getPost(id: string) {
    return this.archivePosts.filter(p => p.id == id).firstOrDefault();
  }

  public async getPostAsync(id: string) {
    let salt = RandomInt(99999999999);
    return (await this.remoteJson.get<ArchivePost[]>('archive-posts.json?'+salt)).filter(p => p.id == id).firstOrDefault();
  }

  public getPostsByCollection(id: string): ArchivePost[] {
    return this.archivePosts.filter(p => p.unlisted != true && p.unlockDate.checkForUnlock()).filter(p => p.collection != undefined ? p.collection.includes(id) : false);
  }
  
  public getPosts(paginationFilter?: PaginationFilter) {
    let retPag: {data: ArchivePost[]; length: number; hasNSFW: boolean; hasCringe: boolean; hasScrapped: boolean; hasMusical: boolean} = {
      data: [],
      length: 0,
      hasNSFW: true,
      hasCringe: true,
      hasScrapped: true,
      hasMusical: true
    }
    return this.remoteJson.get<ArchivePost[]>('archive-posts.json').then(async data => {
      if(paginationFilter == undefined)
      {
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
      else
      {
        if(paginationFilter.search != undefined) {
          paginationFilter.search = paginationFilter.search.filter(s => s != "");
        }

        let ret = data.sort((p1, p2) => {
          return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
        }).filterAsync(async (p: ArchivePost) => 
          ((paginationFilter.seeSpecific == "scrapped" ? p.scrapped : (p.scrapped ? paginationFilter.seeScrapped : true))
        && (paginationFilter.seeSpecific == "nsfw" ? p.nsfw : (p.nsfw ? (paginationFilter.seeNSFW ? true : await this.hasSFW(p)) : true))
        && (paginationFilter.seeSpecific == "cringe" ? p.cringe : (p.cringe ? paginationFilter.seeCringe : true))
        && (paginationFilter.seeSpecific == "musical" ? p.musical : (p.musical ? paginationFilter.seeMusical : true))
        && (paginationFilter.year != undefined ? paginationFilter.year == (p.unlockDate.toDate().getFullYear()+"") : true)
        && (this.tagsCollectionHandler(p, paginationFilter))
        && (paginationFilter.postExclude != undefined ? !paginationFilter.postExclude.includes(p.jsonName) : true)
        && (p.unlockDate.checkForUnlock())
        && (this.unlistedHandler(p, paginationFilter)))??false
        ).then(data => {
          return data.search(paginationFilter.search, paginationFilter.currentLang)
        .sort((p1, p2) => {
          switch(paginationFilter.sortType)
          {
            case 'date':
              {
                return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? 
                  paginationFilter.ascending ?
                    1:-1
                :
                  paginationFilter.ascending ?
                    -1:1;
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
        retPag.hasNSFW = (await ret).filter(p => p.nsfw).length > 0;
        retPag.hasCringe = (await ret).filter(p => p.cringe).length > 0;
        retPag.hasScrapped = (await ret).filter(p => p.scrapped).length > 0;
        retPag.hasMusical = (await ret).filter(p => p.musical).length > 0;
        retPag.length = (await ret).length;
        retPag.data = (await ret).slice(paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page-1) * paginationFilter.pageSize : undefined, paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page * paginationFilter.pageSize) : undefined);
        return retPag;
      }
    })
  }

  unlistedHandler(p: ArchivePost, paginationFilter: PaginationFilter)
  {
    if(p.unlisted == true)
      if(paginationFilter.search != undefined)
        return paginationFilter.search.includes("id:"+p.id) || this.compareTerms(paginationFilter.search, p.tags) || paginationFilter.search.filter(s => s.includes("🔑:")).length > 0;
      else
        return false;
    else
      return true;
  }

  tagsCollectionHandler(p: ArchivePost, paginationFilter: PaginationFilter)
  {    
    if(paginationFilter.collections != undefined)
    {
      if(p.collection != undefined)
      {
        return p.collection.filter(c => paginationFilter.collections?.includes(c)).length > 0;
      }
      else
        return paginationFilter.collections.length > 1;
    }
    else if(paginationFilter.tags != undefined)
    {
      if(p.tags != undefined)
      {
        return p.tags.filter(c => paginationFilter.tags?.includes(c)).length > 0;
      }
      else
        return paginationFilter.tags.length > 1;
    }
    
     return true;
  }

  public async getPostLength(paginationFilter?: PaginationFilter)
  {
    if(paginationFilter == undefined)
      return (await this.getPosts()).length;
    else
    {
      let copy = paginationFilter;
      copy.page = undefined;
      copy.pageSize = undefined;
      return (await this.getPosts(copy)).length;
    }
  }

  //#region Has X
  public async hasSFW(p: ArchivePost) {

    if(p == undefined)
      return true;

    if(p.unlockDate == "")
      return true;

    if(isNaN(p.unlockDate.toDate().getFullYear()))
      return true;

    if(p.jsonName == undefined)
      return !p.nsfw;
    else
    {
      let post = await this.postService.getPost(this.getPostYear(p.id)+"", p.jsonName);
  
      if(post.allNsfw == true)
        return false;
  
      let hasSFW = false;
      let cont = 0;
  
      let stuffCanNSFW = post.body.filter(b => b.type != "p" && b.type != "space" && b.type != "player");
      
      if(stuffCanNSFW.length > 0)
        while(!hasSFW && cont < stuffCanNSFW.length)
        {
          const block = stuffCanNSFW[cont];
  
          for(const content of block.content)
          {
            if(content.stuff.filter(s => s.nsfw != true).length > 0 || content.stuff.filter(s => s.onlySfw == true).length > 0)
            {
              hasSFW = true;
              break;
            }
          }
  
          if(block.alt != undefined && !hasSFW)
          {
            for(const alt of block.alt)
            {
              if(alt.stuff.filter(s => s.nsfw != true).length > 0 || alt.stuff.filter(s => s.onlySfw == true).length > 0)
              {
                hasSFW = true;
                break;
              }
            }
          }
  
          if(block.downloads != undefined && !hasSFW)
          {
            for(const download of block.downloads)
            {
              if(download.stuff.filter(s => s.nsfw != true).length > 0 || download.stuff.filter(s => s.onlySfw == true).length > 0)
              {
                hasSFW = true;
                break;
              }
            }
          }
  
          if(block.messages != undefined && !hasSFW)
          {
            for(const message of block.messages)
            {
              if(message.stuff.filter(s => s.nsfw != true).length > 0 || message.stuff.filter(s => s.onlySfw == true).length > 0)
              {
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
  //#endregion Has X

  //#region Is Post X
  public isPostNSFW(post:string): boolean {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().nsfw == true;
  }

  public isPostCringe( post:string): boolean {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().cringe == true;
  }
  
  public isPostScrapped( post:string): boolean {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().scrapped == true;
  }

  public isPostMusical( post:string): boolean {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().musical == true;
  }
  //#endregion Is Post X

  public getPostUnlockDate(post:string)
  {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().unlockDate;
  }

  public getTagsByPost(post:string)
  {
    return this.archivePosts.filter(p => p.id == post).firstOrDefault().tags;
  }

  public async getLastXPosts(num: number, options?: { startDate?: Date; endDate?: Date, random?: boolean, uncut?: boolean}) {
    let allPosts = (await this.remoteJson.get<ArchivePost[]>('archive-posts.json')).filter(p => p.unlockDate.checkForUnlock() && ((p.unlisted??false) == false));

    if(options != undefined)
    {  
      if(options.startDate != undefined)
        allPosts = allPosts.filter(p => options.startDate != undefined ? p.unlockDate.toDate() >= options.startDate : true);
      
      if(options.endDate != undefined)
        allPosts = allPosts.filter(p => options.endDate != undefined ? p.unlockDate.toDate() <= options.endDate : true);
    }

    if(options != undefined)
      if (options.uncut == true)
        return allPosts.filter(p => p.unlockDate != '').limit(12);
    
    let limitedList: ArchivePost[] = [];
    if(allPosts.length > 0)
    {
      let i = 0;
      let inList = 0;
      if(options != undefined)
      {
        if(options.random == true)
        {
          while(inList < num)
          {
            i = RandomInt(allPosts.length);
            let ret = false;
            let p = allPosts[i];
            if(p.jsonName != undefined)
            {
              const post = await this.postService.getPost(this.getPostYear(p.id)+"", p.jsonName);
              ret = post.censoredFeaturedImage == undefined && post.featuredImage != ''
            }
            else ret = p.showInRecent;
            if(ret)
            {
              limitedList.push(p);
              allPosts = allPosts.exclude(p);
              inList++;
            }
          }

          return limitedList;
        }
      }

      while(i < allPosts.length && inList < num)
      {
        limitedList.push(allPosts[i]);
        inList++;
        i++;
      }
    }

    return limitedList;
  }

  public async getAvailableArchiveYears() {
    let years: string[] = [];
    const allPosts = await this.getPosts();
    for(const element of allPosts.data)
    {
      let year = this.getPostYear(element.id)+"";
      let unlockDate = element.unlockDate != undefined ? element.unlockDate : "";
      if(!years.includes(year) && year != "" && unlockDate != "" && unlockDate.checkForUnlock() && element.unlisted != true)
        years.push(year);
    }

    return years.sort((s1, s2) => {
      if(+s1 < +s2)
      {
        return 1;
      }

      if(+s1 > +s2)
      {
        return -1;
      }

      return 0;
    });
  }

  public getAvailableArchiveYearsPostDecember(): string [] {
    let years: string[] = [];
    for(const element of this.archivePosts)
    {
      let year = this.getPostYear(element.id)+"";
      let unlockDate = element.unlockDate != undefined ? element.unlockDate : "";
      if(!years.includes(year) && year != "" && unlockDate != "" && unlockDate.checkForUnlock() && this.dateIsPostDecember(unlockDate) && element.unlisted != true)
        years.push(year);
    }

    return years.sort((s1, s2) => {
      if(+s1 < +s2)
      {
        return 1;
      }

      if(+s1 > +s2)
      {
        return -1;
      }

      return 0;
    });
  }

  private dateIsPostDecember(date: string) {
    let now = new Date();
    let nowMonth = now.getMonth();
    let nowYear = now.getFullYear();
    
    if(date != undefined)
    {
      const unlockDate = date.toDate();      

      if(nowYear > unlockDate.getFullYear() || (nowYear == unlockDate.getFullYear() && nowMonth >= 11))
      {
        return true;
      }
    }
    return false;
  }

  getRandomPost(options?: {year: number, month: number}) {
    if(options != undefined)
    {
      const postsInMonth = this.archivePosts.filter(p => p.unlockDate.toDate().getFullYear() == options.year && p.unlockDate.toDate().getMonth()+1 == options.month && p.unlockDate.checkForUnlock() && p.unlisted != true)
      const maxPosts = postsInMonth.length;
      
      return postsInMonth[RandomInt(maxPosts)];
    }
    else
    {
      const cleanPosts = this.archivePosts.filter(p => p.unlockDate.checkForUnlock() && p.unlisted != true);
      const maxPosts = cleanPosts.length;
      
      return cleanPosts[RandomInt(maxPosts)];
    }
  }

  getPostYear(id: string) {
    let post = this.archivePosts.filter(p => p.id == id).firstOrDefault();
    return post.unlockDate.toDate().getFullYear();
  }

  getLinkPart(id: string) {
    let post = this.archivePosts.filter(p => p.id == id).firstOrDefault();
    return post.linkPart;
  }

  getCWs() {
    let warnedP = this.archivePosts.filter(p => p.cw != undefined && p.nsfw);
    let CWs: string[] = [];
    for(const post of warnedP)
    {
      for(const cw of post.cw!)
      {
        if(!CWs.includes(cw))
          CWs.push(cw);
      }
    }

    return CWs.sort((name1, name2) => name1.toLowerCase().localeCompare(name2.toLowerCase()));
  }

  getCWsPost(id:string) {
    return this.archivePosts.filter(p => p.id == id).firstOrDefault().cw;
  }

  compareTerms(searchTerms: string[], tags?: string[])
  {
    if(tags != undefined)
    {
      let l = tags.length;
      let c: string[] = [];
      for (const tag of tags)
      {

        if(searchTerms.includes("t:"+tag))
        {
          c.push("t:"+tag);
        }
      }
      return c.length == l;
    }
    return false;
  }
}

