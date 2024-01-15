import { Injectable } from '@angular/core';
import { Announcement } from '../interfaces/announcement';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  get announcements(): Promise<Announcement[]> {
    return this.announcementsRef.then(async announcementsRef => {
      let ret: Announcement[] = [];
      for(const ref of announcementsRef)
      {
        let date = ref.date.toDate();
        ret.push(await this.remoteJson.get<Announcement>("announcements/"+date.getFullYear()+"/"+ref.id+".json"));
      }
  
      return ret;
    })
  }

  get announcementsRef() {
    return this.remoteJson.get<{ date: string, id: string }[]>('announcements.json').then(announcementsRef => {
      return announcementsRef.sort((a1, a2) => {
        return a1.date.toDate() > a2.date.toDate() ? -1 : 1;});
    });
  }

  constructor(private remoteJson: RemoteJsonReaderService) {
  }

  getAnnouncements(noPinned: boolean = false)
  {
    let unlocked: Announcement[] = [];
    let pinned: Announcement[] = [];
    let nonPinned: Announcement[] = [];
    let ret: Announcement[] = [];
    return this.announcementsRef.then(announcementsRef => {
      return this.announcements.then(announcements => {
        unlocked = announcements.filter(a => announcementsRef.filter(r => r.id == a.id).firstOrDefault().date.checkForUnlock());
        pinned = unlocked.filter(a => a.pinned);
        nonPinned = unlocked.filter(a => !a.pinned);

        if(!noPinned)
          ret = pinned;
    
        for(const a of nonPinned)
          ret.push(a);
    
        return ret;
      })
    });
  }

  getAnnouncement(id: string)
  {
    return this.announcementsRef.then(announcementsRef => {
      return this.announcements.then(announcements => {
        return announcements.filter(a => a.id == id && announcementsRef.filter(r => r.id == a.id).firstOrDefault().date.checkForUnlock()).firstOrDefault();
      })
    });
  }

  getAnnouncementDate(id: string, currentLang: string, format: boolean = true)
  {
    return this.announcementsRef.then(announcementsRef => {
      let date = announcementsRef.filter(a => a.id == id && a.date.checkForUnlock()).firstOrDefault().date.toDate();
      if(format)
        return date.toLocaleDateString(currentLang, {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        });
      else
        return date;
    })
  }

  getAnnouncementRawDate(id: string)
  {
    return this.announcementsRef.then(announcementsRef => {
      let date = announcementsRef.filter(a => a.id == id && a.date.checkForUnlock()).firstOrDefault().date;
      return date.replace(" ", "T").replace("/", "-").replace("/", "-");
    })
  }
}
