import { ArchivePost } from "../interfaces/ArchivePost";
import { Post } from "../interfaces/Post";
import { getFeaturedStuffFromPost } from "./Dependency";
import { RandomInt, Interpreter } from "./extension-methods";

export async function fetchPost(id: string, lang: string = "en") {
  let archivePost = ((await (await fetch('https://files.teslasp2.com/assets/jsons/'+`archive-posts.json?${RandomInt(99999999999)}`)).json()) as ArchivePost[]).filter(p => p.id == id).firstOrDefault();
  if(archivePost == null)
  {
    return {id: id, name: "", description: "", featuredImage: ""}
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
    return {id: id, name: title, description: title, featuredImage: (archivePost.featuredImage != undefined ? archivePost.featuredImage : ''), altFeaturedImage: (archivePost.altFeaturedImage != undefined ? archivePost.altFeaturedImage : ''),  externalLink: archivePost.externalLink}
  }

  let post = (await (await fetch('https://files.teslasp2.com/assets/jsons/'+"posts/"+archivePost.unlockDate.toDate().getFullYear()+"/"+archivePost.jsonName+".json?"+RandomInt(99999999999))).json()) as Post;
  if(post == null)
  {
    return {id: id, name: title, description: title, featuredImage: (archivePost.featuredImage != undefined ? archivePost.featuredImage : ''), altFeaturedImage: (archivePost.altFeaturedImage != undefined ? archivePost.altFeaturedImage : ''),  externalLink: archivePost.externalLink}
  }

  let firstLine = Interpreter(post.body.filter(b => b.type == 'p').firstOrDefault().content, lang).stuff.rasterize();

  let fs = getFeaturedStuffFromPost(archivePost, post, lang);
  
  return {id: id, name: title, description: firstLine, featuredImage: fs.censImage != undefined ? fs.censImage : fs.image, altFeaturedImage: fs.alt}
}