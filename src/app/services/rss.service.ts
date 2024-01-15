import { Injectable } from '@angular/core';
import { Feed } from "feed";
import { Category } from 'feed/lib/typings';
import { ArchivePost } from '../interfaces/archive-post';
import { ArchiveService } from './archive.service';
import { PostService } from './post.service';
import { AnnouncementsService } from './announcements.service';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(private archiveService: ArchiveService,
    private postService: PostService,
    private announcementsService: AnnouncementsService) { }

  async generateRSS()
  {
    await this.archiveService.awake();
    let posts = await this.archiveService.getLastXPosts(12, {uncut: true});
    let years = await this.archiveService.getAvailableArchiveYears();

    const feed = new Feed({
      title: "TeslaSP2's Dumpster",
      description: "Teslasp2's portfolio and art repository",
      id: "https://teslasp2.com/",
      link: "https://teslasp2.com/",
      language: "en",
      image: "https://files.teslasp2.com/assets/imgs/oc-bios/alisThumb.webp",
      favicon: "http://teslasp2.com/favicon.ico",
      copyright: "©2022"+((new Date().getFullYear() != 2022) ? ("-"+years[years.length-1]) : "")
    });

    for(const post of posts)
    {
      let name = "";
      let titleLine = post.linkPart.filter(h => h.key == 'en' || h.key == 'def').firstOrDefault();
      name = titleLine != null ? titleLine.str : post.linkPart.firstOrDefault().str;

      feed.addItem({
        title: name,
        id: "https://teslasp2.com/archive/post/"+post.id,
        link: "https://teslasp2.com/archive/post/"+post.id,
        description: post.jsonName != undefined ? await this.getDescriptionPost(post) : undefined,
        date: post.unlockDate.toDate(),
        image: (await this.getFeaturedStuff(post, true)).image,
        category: this.tagsToCategories(post.tags)
      });
    }

    for (const year of years) {
      feed.addItem({
        title: year,
        id: "https://teslasp2.com/archive/"+year,
        link: "https://teslasp2.com/archive/"+year,
        description: "The rest of "+year+" posts",
        date: (year+'/01/01 00:00:01').toDate()
      });
    }
    
    return feed.rss2();
  }

  private tagsToCategories(tags: string[] | undefined) : Category[]
  {
    let categories: Category[] = [];

    if(tags != undefined)
    {
      for(const tag of tags) {

        let category: Category = {
          name: tag
        };

        categories.push(category);
      }
    }

    return categories;
  }

  private getDescriptionPost(archivePost: ArchivePost) {
    return this.postService.getPost(this.archiveService.getPostYear(archivePost.id)+"", archivePost.jsonName).then(post => {
      let content = post.body;
      let description = "";
  
      if(archivePost.nsfw || archivePost.cringe)
      {
        description += "<p style=\"text-align: center;\">TW// ";
  
        if(archivePost.nsfw && !archivePost.cringe)
        {
          description += "This post contains content not suitable for minors";
        }
        else if(!archivePost.nsfw && archivePost.cringe)
        {
          description += "This post contains content that I don't currently identify with";
        }
        else if(archivePost.nsfw && archivePost.cringe)
        {
          description += "This post contains content not suitable for minors that I don't currently identify with";
        }
  
        description += "</p>"
      }
  
      for(const element of content)
      {
        switch (element.type) {
          case "p":
            for(const line of element.content.filter(c => c.key == "en" || c.key == "def").firstOrDefault().stuff){
              description += "<p>"+line.str+"</p>";
            }
            break;
          case "img":
            for(const line of element.content.filter(c => c.key == "en" || c.key == "def").firstOrDefault().stuff){
              description += "<img src=\""+line.str+"\" style=\"width: 100%\">"
            }
            break;
          default:
            break;
        }
      }
  
      return description;
    })
  }

  getFeaturedStuff(archivePost: ArchivePost, cen: boolean) {
    return this.postService.getFeaturedStuffFromPost(archivePost, "en", cen);
  }
}
