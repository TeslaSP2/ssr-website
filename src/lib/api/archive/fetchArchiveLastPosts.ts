import { ArchivePost } from "../../../interfaces/ArchivePost";
import { Post } from "../../../interfaces/Post";
import { RandomInt } from "../../utils/extension-methods";

export async function fetchArchiveLastPosts(num: number, options?: { startDate?: Date; endDate?: Date, random?: boolean, uncut?: boolean}) {
  console.log(num, options)

  let allPosts = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/archive-posts.json`)).json()) as ArchivePost[]).filter(p => p.unlockDate.checkForUnlock() && ((p.unlisted??false) == false));

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
            const post = (await (await fetch(`https://files.teslasp2.com/assets/jsons/posts/${p.unlockDate.toDate().getFullYear()}/${p.jsonName}.json`)).json()) as Post;
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