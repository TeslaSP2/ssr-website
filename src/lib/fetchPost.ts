import { ArchivePost } from "../interfaces/ArchivePost";
import { Post } from "../interfaces/Post";
import { RandomInt, Interpreter } from "./extension-methods";

export async function fetchPost(id: string) {
  let archivePost = ((await (await fetch('https://files.teslasp2.com/assets/jsons/'+`archive-posts.json?${RandomInt(99999999999)}`)).json()) as ArchivePost[]).filter(p => p.id == id).firstOrDefault();
  if(archivePost == null)
  {
    return {id: id, name: "", description: "", featuredImage: "https://files.teslasp2.com/assets/imgs/404.png"}
  }

  let titleLine = archivePost.linkPart.filter(h => h.key == "en" || (h.key != "en" && h.key == "def")).firstOrDefault();
  let title = titleLine != null ? titleLine.str : archivePost.linkPart[0].str;

  if(archivePost.jsonName == "" || archivePost.jsonName == undefined || archivePost.jsonName == null)
  {
    return {id: id, name: title, description: title, featuredImage: (archivePost.featuredImage != undefined ? archivePost.featuredImage : ''), externalLink: archivePost.externalLink}
  }

  let post = (await (await fetch('https://files.teslasp2.com/assets/jsons/'+"posts/"+archivePost.unlockDate.toDate().getFullYear()+"/"+archivePost.jsonName+".json?"+RandomInt(99999999999))).json()) as Post;
  if(post == null)
  {
    return {id: id, name: "", description: "", featuredImage: "https://files.teslasp2.com/assets/imgs/404.png"}
  }

  let indicators = "";
  if(archivePost.nsfw == true)
    indicators += "🔞 (Contains elements for mature audiences) "
  if(archivePost.cringe == true)
    indicators += "🤢 (Cringe) "
  if(archivePost.scrapped == true)
    indicators += "🗑️ (Scrapped) "
  if(archivePost.musical == true)
    indicators += "🎶 (Has music) "
  if(indicators.length > 0)
    indicators += "\n"

  let firstLine = indicators+Interpreter(post.body.filter(b => b.type == 'p').firstOrDefault().content, "en").stuff.firstOrDefault();

  function getFeaturedStuffFromPost(archivePost: ArchivePost, post: Post) {
    let year = archivePost.unlockDate.toDate().getFullYear()+""
      let ret: { image: string; censImage?: string; alt?: string; } = {image: "", censImage: undefined, alt: undefined};
  
        ret.image = post.featuredImage != undefined ? ("https://files.teslasp2.com/assets/imgs/posts/"+year+"/"+archivePost.jsonName+"/"+(true && post.censoredFeaturedImage != undefined ? post.censoredFeaturedImage : post.featuredImage)) : '';
        if(post.censoredFeaturedImage == undefined)
        {
          if(post.altFeaturedImage != undefined)
          {        
            if(isNaN(+post.altFeaturedImage))
              ret.alt = post.altFeaturedImage;
            else
            {
              let altLines: string[] = [];
              let imgBlock = post.body.filter(block => block.type == 'img').firstOrDefault();
              if(imgBlock != null)
                if(imgBlock.alt != undefined)
                  if(imgBlock.alt.filter(a => a.key == "en").firstOrDefault() != null) {
                    let stuff = imgBlock.alt.filter(a => a.key == "en").firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true);
  
                    if(stuff.length > 0)
                      for(const s of stuff)
                      {
                        altLines.push(s.str);
                      }
                  }
  
              if(altLines.length > 0)
                ret.alt = altLines[(+post.altFeaturedImage - 1)];
            }
          }
          else
          {
            let firstImage = post.body.filter(block => block.type == 'img').firstOrDefault();
  
            if(firstImage != null)
              if(firstImage.alt != undefined)
                if(firstImage.alt.filter(a => a.key == "en").firstOrDefault() != null) {
                  let stuff = firstImage.alt.filter(a => a.key == "en").firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true).firstOrDefault();
                  ret.alt = stuff != null ? stuff.str : undefined;
                }
          }
        }
        return ret;
  };

  let fs = getFeaturedStuffFromPost(archivePost, post);
  
  return {id: id, name: title, description: firstLine, featuredImage: fs.censImage != undefined ? fs.censImage : fs.image}
}