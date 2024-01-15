import { Injectable } from '@angular/core';
import { RemoteJsonReaderService } from './remote-json-reader.service';
import { TagRemote } from '../interfaces/tag-remote';
import { TranslateService } from '@ngx-translate/core';
import { Interpreter } from '../interfaces/gen-methods';
import { Char, SetDNI } from '../interfaces/id';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private remoteJson: RemoteJsonReaderService,
    private translate: TranslateService) { }

  async getTags(search?: string[]) {
    if(search != undefined)
    {
      return (await this.remoteJson.get<TagRemote[]>('tags.json')).filter(t => search.includes(t.code))
    }
    else
    {
      let tags = await this.remoteJson.get<TagRemote[]>('tags.json');
      let ocTags = await this.getBiosTags();
      let normalTags = tags.filter(t => ocTags.filter(oc => oc.code == t.code).length <= 0).sort((s1, s2) => {
        let s1Trans = Interpreter(s1.name, this.translate.currentLang).stuff.firstOrDefault();
        let s2Trans = Interpreter(s2.name, this.translate.currentLang).stuff.firstOrDefault();
  
        return s1Trans.localeCompare(s2Trans);
      });
      ocTags.push(...normalTags);
      return ocTags;
    }
  }

  async getTagsCodes() {
    let tags = await this.remoteJson.get<TagRemote[]>('tags.json');
    let ocTags = await this.getBiosTags();
    let normalTags = tags.filter(t => ocTags.filter(oc => oc.code == t.code).length <= 0).sort((s1, s2) => {
      let s1Trans = Interpreter(s1.name, this.translate.currentLang).stuff.firstOrDefault();
      let s2Trans = Interpreter(s2.name, this.translate.currentLang).stuff.firstOrDefault();

      return s1Trans.localeCompare(s2Trans);
    });
    ocTags.push(...normalTags);

    let ret: string[] = [];
    for (const tag of ocTags) {
      ret.push(tag.code);
    }

    return ret;
  }

  async getTag(tag: string) {
    return (await this.remoteJson.get<TagRemote[]>('tags.json')).filter(t => t.code == tag).firstOrDefault();
  }

  private async getBiosTags() {
    let Bios = await this.remoteJson.get<SetDNI[]>('oc-bios.json');

    let bios: TagRemote[] = [];

    for(const set of Bios)
    {
      for(const bio of set.DNIs)
      {
        if(!bio.hidden)
          for(const alt of bio.alts)
          {
            try {
              const char = await this.remoteJson.get<Char>("oc-bios/chars/"+bio.oc+"/"+alt.source+".json");
              if (char.hidden != true)
              {
                let possible = await this.getTag(alt.source);
                if(possible != null)
                  bios.push(possible);
              }
            } catch (error) {
              
            }
          }
      }
    }

    return bios;
  }
}
