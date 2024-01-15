import { Injectable } from '@angular/core';
import { ArchivePost } from '../interfaces/archive-post';
import { Post } from '../interfaces/post';
import { RemoteJsonReaderService } from './remote-json-reader.service';
import { RandomInt } from '../interfaces/gen-methods';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private remoteJson: RemoteJsonReaderService) {}
  getPost(year: string, name:string) {
    return this.remoteJson.get<Post>("posts/"+year+"/"+name+".json");
  }

  getPostSalted(year: string, name:string) {
    let salt = RandomInt(99999999999);
    return this.remoteJson.get<Post>("posts/"+year+"/"+name+".json?"+salt);
  }

  async isFeaturedImageCensored(year: string, name:string) {
    if(name != "" && name != undefined && name != null)
    {
      let post = await this.getPost(year, name);
      return post.censoredFeaturedImage == undefined;
    }
    
    return false;
  }

  async getFeaturedStuff(year:string, name:string, currLang: string, cen: boolean = true)
  {
    let post = await this.getPost(year, name);

    let ret: { image: string; censImage?: string; alt?: string; } = {image: "", censImage: undefined, alt: undefined};

      ret.image = post.featuredImage != undefined ? ("https://files.teslasp2.com/assets/imgs/posts/"+year+"/"+name+"/"+(cen && post.censoredFeaturedImage != undefined ? post.censoredFeaturedImage : post.featuredImage)) : '';
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
                if(imgBlock.alt.filter(a => a.key == currLang).firstOrDefault() != null) {
                  let stuff = imgBlock.alt.filter(a => a.key == currLang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !cen : true);

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
              if(firstImage.alt.filter(a => a.key == currLang).firstOrDefault() != null) {
                let stuff = firstImage.alt.filter(a => a.key == currLang).firstOrDefault().stuff.filter(s => s.nsfw == true ? !cen : true).firstOrDefault();
                ret.alt = stuff != null ? stuff.str : undefined;
              }
        }
      }
      return ret;
  }

  async getFeaturedStuffFromPost(archivePost: ArchivePost, currLang: string, cen:boolean = true) {
    if(archivePost.jsonName != "" && archivePost.jsonName != undefined && archivePost.jsonName != null)
    {
      let year = archivePost.unlockDate.toDate().getFullYear()+""
      return await this.getFeaturedStuff(year, archivePost.jsonName, currLang, cen);
    }
    else
    {
      return {image: archivePost.featuredImage != undefined ? archivePost.featuredImage : '', censImage: undefined, alt: archivePost.altFeaturedImage};
    }
  }

  async getExternalLinkFromPost(archivePost: ArchivePost) {
    if(archivePost.externalLink != undefined)
      return archivePost.externalLink;

    let post = await this.getPost(archivePost.unlockDate.toDate().getFullYear()+"", archivePost.jsonName);
    if (post.outsideLinks != undefined) {
      if (post.outsideLinks.length > 0)
        return post.outsideLinks.firstOrDefault().link;
    }

    return undefined;
  }
}
