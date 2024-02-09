import { ArchivePost } from "../../../interfaces/ArchivePost";
import { readAsObject } from "../../utils/Dependency";

export async function fetchArchiveRecap() {
    let archivePosts = (await readAsObject<ArchivePost[]>(`archive-posts.json`))
    
    let years: string[] = [];
    for(const element of archivePosts)
    {
      let year = element.unlockDate.toDate().getFullYear()+"";
      let unlockDate = element.unlockDate != undefined ? element.unlockDate : "";
      if(!years.includes(year) && year != "" && unlockDate != "" && unlockDate.checkForUnlock() && dateIsPostDecember(unlockDate) && element.unlisted != true)
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

function dateIsPostDecember(date: string) {
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