import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PostCollection } from '../interfaces/archive-post';
import { PaginationFilter } from '../interfaces/pagination-filter';
import { ArchiveService } from './archive.service';
import { CookiesService } from './cookies.service';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(public archiveService: ArchiveService,
    private cookiesService: CookiesService,
    private translate: TranslateService,
    private remoteJson: RemoteJsonReaderService) { }

  async get(cringe?: boolean, nsfw?:boolean, scrapped?: boolean) {
    let prefs = this.cookiesService.getArchive();
    if(cringe == undefined)
      cringe = prefs.seeCringe

    if(nsfw == undefined)
      nsfw = prefs.seeNSFW

    if(scrapped == undefined)
      scrapped = prefs.seeScrapped

    let collections = await this.remoteJson.get<PostCollection[]>('post-collections.json');
    let ret: PostCollection[] = [];
    for(const collection of collections)
    {
      if(!(collection.hidden??false))
      {
        let paginationFilter: PaginationFilter = {
          seeCringe: cringe,
          seeNSFW: nsfw,
          seeScrapped: scrapped,
          seeMusical: true,
          seeNormal: true,
          collections: [collection.id],
          sortType: 'date',
          currentLang: 'en'
        };

        let posts = await this.archiveService.getPostLength(paginationFilter)
        if(posts > 1)
          ret.push(collection);
      }
    }

    return ret.sort((c1, c2) => {
      let name1 = "";
      let titleLine1 = c1.name.filter(h => h.key == this.translate.currentLang || (h.key != this.translate.currentLang && h.key == "def")).firstOrDefault();
      name1 = titleLine1 != null ? titleLine1.str : c1.name[0].str;

      let name2 = "";
      let titleLine2 = c2.name.filter(h => h.key == this.translate.currentLang || (h.key != this.translate.currentLang && h.key == "def")).firstOrDefault();
      name2 = titleLine2 != null ? titleLine2.str : c2.name[0].str;

      return name1.toLowerCase().localeCompare(name2.toLowerCase());
    });
  }

  async getById(id: string) {
    return (await this.remoteJson.get<PostCollection[]>('post-collections.json')).filter(c => c.id == id).firstOrDefault();
  }
}
