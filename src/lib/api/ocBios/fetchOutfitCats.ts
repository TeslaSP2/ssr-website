import { Char, DNI, Outfit, OutfitCat, SetDNI } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchOutfitCats(set: number, route:string) { 
    let ids = await get(set);
    let outfitsCats: OutfitCat[] = [{code: undefined, name: undefined, toolTip: undefined, parent: undefined}];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();

    try {
      let char = await read<Char>(`oc-bios/chars/${charDNI.oc}/${charDNI.alts.filter(a => a.source == route).firstOrDefault().source}.json`);
      let outfitsChar = (await read<{categories?: OutfitCat[], outfits: Outfit[]}>(`oc-bios/outfits/${char.route}.json`)).categories;
      if(outfitsChar != undefined)
        outfitsCats.push(...outfitsChar);
    } catch (err) {
      console.log(err);
    }
    return outfitsCats;
    
}

async function get(set:number) {
    let Bios = await read<SetDNI[]>(`oc-bios.json`);
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