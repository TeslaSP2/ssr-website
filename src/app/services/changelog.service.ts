import { Injectable } from '@angular/core';
import { Changelog } from '../interfaces/changelog';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  constructor(private remoteJson: RemoteJsonReaderService) { }

  getChangelogs(paginationFilter?: {pageSize: number, page: number})
  {
    return this.remoteJson.get<Changelog[]>('changelogs.json').then(data => {
      if(paginationFilter != undefined)
        return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock())
      .slice(paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page-1) * paginationFilter.pageSize : undefined,
            paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page * paginationFilter.pageSize) : undefined);
      else
        return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock());
    })
  }

  getChangelogAsset(id: string, currentLang: string) {
    return `https://files.teslasp2.com/assets/changelogs/${id}/${currentLang}.md`;
  }

  getChangelogDate(id: string, currentLang: string)
  {
    return this.remoteJson.get<Changelog[]>('changelogs.json').then(data => {
      return (data.filter(c => c.id == id).firstOrDefault().date).toDate().toLocaleString(currentLang, {
        hourCycle: "h24",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).toFirstUpperCase();
    })
  }
}
