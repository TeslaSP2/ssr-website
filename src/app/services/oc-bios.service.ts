import { Injectable } from '@angular/core';
import { RandomInt } from '../interfaces/gen-methods';
import { Char, DNI, OutArt, Outfit, OutfitCat, SetDNI } from '../interfaces/id';
import { RemoteJsonReaderService } from './remote-json-reader.service';
@Injectable({
  providedIn: 'root'
})
export class OcBiosService {

  private Bios: SetDNI[] = [];

  constructor(private remoteJson: RemoteJsonReaderService) {
    this.awake();
  }

  awake() {
    return this.remoteJson.get<SetDNI[]>('oc-bios.json').then(data => this.Bios = data);
  }

  totalSets() {
    return this.Bios;
  }

  async getAll() {
    let chars: Char[] = [];

    for(const set of this.Bios)
    {
      for(const dni of set.DNIs)
      {
        if(!dni.hidden)
        {
          for(const alt of dni.alts)
          {
            let salt = RandomInt(9999999999);
            chars.push(await this.remoteJson.get<Char>("oc-bios/chars/"+dni.oc+"/"+alt.source+".json?"+salt));
          }
        }
      }
    }

    return chars;
  }

  async getBio(route:string, parent?: string) {
    return await this.getSpecificChar(parent??route, route);
  }

  get(set: number | undefined):DNI[] {

    if(set == undefined)
      set = 0;
    
    let ids: DNI[] = [];
    
    while(set >= this.Bios.length && set > 0)
      set--;

      for(const bio of this.Bios[set].DNIs)
      {
        try {
          ids.push(bio);
        } catch (error) {
          
        }
      }
    return ids;
  }

  async getFAQChars() {
    let ids: DNI[] = [];
    let ret: {ref: string, char: Char}[] = [];

    for(const set of this.Bios)
    {
      for(const bio of set.DNIs)
      {
        try {
          if(!bio.hidden)
            ids.push(bio);
        } catch (error) {
          
        }
      }
    }
    
    for(const id of ids)
    {
      const char = await this.remoteJson.get<Char>("oc-bios/chars/"+id.alts.firstOrDefault().source+"/"+id.alts.firstOrDefault().source+".json");
      ret.push({ref: (id.alts.firstOrDefault().source), char: char});
    }
    return ret;
  }
  
  async getBiosTags() {
    let bios: string[] = [];

    for(const set of this.Bios)
    {
      for(const bio of set.DNIs)
      {
        if(!bio.hidden)
          for(const alt of bio.alts)
          {
            try {
              const char = await this.remoteJson.get<Char>("oc-bios/chars/"+bio.oc+"/"+alt.source+".json");
              if (char.hidden != true)
                bios.push(alt.source);
            } catch (error) {
              
            }
          }
      }
    }

    return bios;
  }

  async getOutfits(set: number, route: string) {
    let salt = RandomInt(9999999999);
    let ids = this.get(set);
    let outfits: Outfit[] = [];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();

    try {
      let char = await this.remoteJson.get<Char>("oc-bios/chars/"+charDNI.oc+"/"+charDNI.alts.filter(a => a.source == route).firstOrDefault().source+".json");
      let outfitsChar = (await this.remoteJson.get<{categories?: OutfitCat[], outfits: Outfit[]}>("oc-bios/outfits/"+char.route+".json?"+salt)).outfits
      .filter(o => o.skins.filter(s => s.layers.length > 0).length > 0 && char.outfits != undefined ? !char.outfits.includes(o.id) : true);
      outfits = outfitsChar.filter(o => o.skins.filter(s => s.unlockDate != undefined ? s.unlockDate.checkForUnlock() : true).length > 0);
    } catch {
      
    }
    return outfits;
  }

  async getOutfitsCat(set: number, route:string) {
    let salt = RandomInt(9999999999);
    let ids = this.get(set);
    let outfitsCats: OutfitCat[] = [{code: undefined, name: undefined, toolTip: undefined}];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();

    try {
      let char = await this.remoteJson.get<Char>("oc-bios/chars/"+charDNI.oc+"/"+charDNI.alts.filter(a => a.source == route).firstOrDefault().source+".json");
      let outfitsChar = (await this.remoteJson.get<{categories?: OutfitCat[], outfits: Outfit[]}>("oc-bios/outfits/"+char.route+".json?"+salt)).categories;
      if(outfitsChar != undefined)
        outfitsCats.push(...outfitsChar);
    } catch {
      
    }
    return outfitsCats;
  }
  
  async getOtherArtists(set: number, route: string) {
    let salt = RandomInt(9999999999);
    let ids = this.get(set);
    let otherArtists: OutArt[] = [];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();
    
    try {
      let char = await this.remoteJson.get<Char>("oc-bios/chars/"+charDNI.oc+"/"+charDNI.alts.filter(a => a.source == route).firstOrDefault().source+".json");
      otherArtists = (await this.remoteJson.get<OutArt[]>("oc-bios/other-artists.json?"+salt)).filter(i => i.shows.includes(char.route) && char.givenArt?.includes(i.id) != true);

    } catch {
      
    }
    return otherArtists;
  }

  async getSpecificChar(bio: string, source: string, oc?: string) {
    let salt = RandomInt(9999999999);
    let esChar: Char | undefined;
    if(oc == undefined)
      oc = bio;

    try {
      esChar = await this.remoteJson.get<Char>("oc-bios/chars/"+oc+"/"+source+".json?"+salt);
    } catch (error) {
      esChar = undefined;
    }

    return esChar;
  }
}
