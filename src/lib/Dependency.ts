import { ArchivePost } from "../interfaces/ArchivePost";
import { Post } from "../interfaces/Post";

export function getFeaturedStuffFromPost(archivePost: ArchivePost, post: Post, lang: string = "en") {
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
                  if(imgBlock.alt.filter(a => a.key == lang).firstOrDefault() != null) {
                    let stuff = imgBlock.alt.filter(a => a.key == lang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true);
  
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
                if(firstImage.alt.filter(a => a.key == lang).firstOrDefault() != null) {
                  let stuff = firstImage.alt.filter(a => a.key == lang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !true : true).firstOrDefault();
                  ret.alt = stuff != null ? stuff.str : undefined;
                }
          }
        }
        return ret;
  };