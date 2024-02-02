import { Char, DNI, Outfit, OutfitCat, SetDNI } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchOutfits(set: number, route:string) { 
    let ids = await get(set);
    let outfits: Outfit[] = [];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();

    try {
        let char = await readAsObject<Char>(`oc-bios/chars/${charDNI.oc}/${charDNI.alts.filter(a => a.source == route).firstOrDefault().source}.json`);
        let outfitsChar = (await readAsObject<{categories?: OutfitCat[], outfits: Outfit[]}>(`oc-bios/outfits/${char.route}.json`)).outfits
      .filter(o => o.skins.filter(s => s.layers.length > 0).length > 0 && char.outfits != undefined ? !char.outfits.includes(o.id) : true);
      outfits = outfitsChar.filter(o => o.skins.filter(s => s.unlockDate != undefined ? s.unlockDate.checkForUnlock() : true).length > 0);
    } catch {
      
    }
    return outfits;
}

async function get(set:number) {
    let Bios = await readAsObject<SetDNI[]>(`oc-bios.json`);
    if(set == undefined)
      set = 0;
    
    let ids: DNI[] = [];
    
    while(set >= Bios.length && set > 0)
      set--;

      for(const bio of Bios[set].DNIs)
      {
        try {
          ids.push(bio);
        } catch (error) {
          
        }
      }
    return ids;
}