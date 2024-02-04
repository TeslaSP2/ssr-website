import { ArchivePost } from "../../interfaces/ArchivePost";
import { Post } from "../../interfaces/Post";
import { Tag } from "../../interfaces/Tag";
import { Collection } from "../../interfaces/Collection";
import { Char } from "../../interfaces/Id";
import { getFeaturedStuffFromPost, readAsObject } from "../utils/Dependency";
import { RandomInt, Interpreter } from "../utils/extension-methods";
import { DisplayOc } from "../../interfaces/General";
import { getDefColor } from "../utils/ColorService";

export async function fetchPost(id: string, lang: string = "en") {
  let archivePost = (await readAsObject<ArchivePost[]>(`archive-posts.json`)).filter(p => p.id == id).firstOrDefault();
  if(archivePost == null)
  {
    return {id: id, name: "Fail", description: "404", featuredImage: 'https://files.teslasp2.com/assets/imgs/idk.webp'}
  }

  let titleLine = archivePost.linkPart.filter(h => h.key == lang || (h.key != lang && h.key == "def")).firstOrDefault();

  let indicators = "";
  if(archivePost.nsfw == true)
    indicators += "🔞 "
  if(archivePost.cringe == true)
    indicators += "🤢 "
  if(archivePost.scrapped == true)
    indicators += "🗑️ "
  if(archivePost.musical == true)
    indicators += "🎶 "

  let title = indicators+(titleLine != null ? titleLine.str : archivePost.linkPart[0].str);

  if(archivePost.jsonName == "" || archivePost.jsonName == undefined || archivePost.jsonName == null)
  {
    return {id: id, name: title, description: title, featuredImage: (archivePost.featuredImage != undefined ? archivePost.featuredImage : ''), altFeaturedImage: (archivePost.altFeaturedImage != undefined ? archivePost.altFeaturedImage : ''), externalLink: archivePost.externalLink, color: (archivePost.tags != undefined ? `#${await getDefColor(archivePost.tags[0])}` : undefined)}
  }

  let post = await readAsObject<Post>(`posts/${archivePost.unlockDate.toDate().getFullYear()}/${archivePost.jsonName}.json`);
  if(post == null)
  {
    return {id: id, name: title, description: title, featuredImage: (archivePost.featuredImage != undefined ? archivePost.featuredImage : ''), altFeaturedImage: (archivePost.altFeaturedImage != undefined ? archivePost.altFeaturedImage : ''), externalLink: archivePost.externalLink, color: (archivePost.tags != undefined ? `#${await getDefColor(archivePost.tags[0])}` : undefined)}
  }

  let firstLine = Interpreter(post.body.filter(b => b.type == 'p').firstOrDefault().content, lang).stuff.rasterize();

  let fs = getFeaturedStuffFromPost(archivePost, post, lang);
  
  return {id: id, name: title, description: firstLine, featuredImage: fs.censImage != undefined ? fs.censImage : fs.image, altFeaturedImage: fs.alt, color: (archivePost.tags != undefined ? `#${await getDefColor(archivePost.tags[0])}` : undefined)}
}

export async function fetchTag(tagCode: string, lang: string = "en") {
    let archivePosts = (await readAsObject<ArchivePost[]>(`archive-posts.json`) as ArchivePost[]).filter(p => p.tags != undefined ? p.tags.includes(tagCode) : false)
    let tag = (await readAsObject<Tag[]>(`tags.json`)).filter(t => t.code == tagCode).firstOrDefault();
    let images: string[] = [];

    let title = Interpreter(tag.name, lang).stuff.firstOrDefault();

    for(const archivePost of archivePosts)
    {
        if(archivePost.jsonName == "" || archivePost.jsonName == undefined || archivePost.jsonName == null)
        {
            if(archivePost.featuredImage != undefined)
                images.push(archivePost.featuredImage);
        }
        else
        {
            let post = await readAsObject<Post>(`${archivePost.unlockDate.toDate().getFullYear()}/${archivePost.jsonName}.json`);
            if(post != null)
            {
                let fs = getFeaturedStuffFromPost(archivePost, post, lang);
                images.push(fs.censImage != undefined ? fs.censImage : fs.image);
            }
        }
    }

    return {tag: tagCode, name: title, featuredImage: images[RandomInt(images.length)], color: `#${await getDefColor(tagCode)}`}
}

export async function fetchCollection(id: string, lang: string = "en") {
    let collection = (await readAsObject<Collection[]>(`post-collections.json`)).filter(c => c.id == id).firstOrDefault();
    let archivePosts = (await readAsObject<ArchivePost[]>(`archive-posts.json`)).filter(p => p.collection != undefined ? p.collection.includes(id) : false)
    let images: string[] = [];

    let titleLine = collection.name.filter(h => h.key == lang || (h.key != lang && h.key == "def")).firstOrDefault();
    let title = (titleLine != null ? titleLine.str : collection.name[0].str);

    for(const archivePost of archivePosts)
    {
        if(archivePost.jsonName == "" || archivePost.jsonName == undefined || archivePost.jsonName == null)
        {
            if(archivePost.featuredImage != undefined)
                images.push(archivePost.featuredImage);
        }
        else
        {
          let post = await readAsObject<Post>(`${archivePost.unlockDate.toDate().getFullYear()}/${archivePost.jsonName}.json`);
            if(post != null)
            {
                let fs = getFeaturedStuffFromPost(archivePost, post, lang);
                images.push(fs.censImage != undefined ? fs.censImage : fs.image);
            }
        }
    }

    return {id: id, name: title, featuredImage: images[RandomInt(images.length)]}
}

export async function fetchOc(source: string, lang: string = "en"): Promise<DisplayOc> {
    let char = await readAsObject<Char>(`oc-bios/chars/${source}/${source}.json`);
    if(char != undefined)
    {
        let name = char.name+(char.firstName != undefined ? ' '+char.firstName : '')+(char.lastName != undefined ? ' '+char.lastName : '');
        let description = "";
        if(char.personalData != null)
            if(char.personalData.alias != null)
                for(const alias of Interpreter(char.personalData.alias, lang).stuff) {
                    if(description.length <= 0)
                        description += "A.k.a. "
                    description += " \""+alias+"\"";
                    if(Interpreter(char.personalData.alias, lang).stuff.indexOf(alias) == Interpreter(char.personalData.alias, lang).stuff.length -1)
                        description += "\n";
                }

        description += Interpreter(char.personality, lang).stuff.rasterize();
        
        return {source: source, name: name, description: description, featuredImage: char.personalData.headshot, color: `#${await getDefColor(char.route)}`};
    }

    return {source: source, name: 'Unknown', description: 'idk mate', featuredImage: 'https://files.teslasp2.com/assets/imgs/idk.webp'}
}