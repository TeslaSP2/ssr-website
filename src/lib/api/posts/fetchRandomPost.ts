import { ArchivePost } from "../../../interfaces/ArchivePost";
import { readAsObject } from "../../utils/Dependency";
import { RandomInt } from "../../utils/extension-methods";

export async function fetchRandomPost(options?: {year: number, month: number}){
    let archivePosts = (await readAsObject<ArchivePost[]>(`archive-posts.json`)).sort((p1, p2) => {
        return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
    });

    if(options != undefined)
    {
      const postsInMonth = archivePosts.filter(p => {
        let [datecomponents, timecomponents] = p.unlockDate.split(' ');
        let [year, month, day] = datecomponents.split('/');

        return +year == options.year && +month == options.month && p.unlockDate.checkForUnlock() && p.unlisted != true
      })
      const maxPosts = postsInMonth.length;
      
      return postsInMonth[RandomInt(maxPosts)];
    }
    else
    {
      const cleanPosts = archivePosts.filter(p => p.unlockDate.checkForUnlock() && p.unlisted != true);
      const maxPosts = cleanPosts.length;
      
      return cleanPosts[RandomInt(maxPosts)];
    }
}