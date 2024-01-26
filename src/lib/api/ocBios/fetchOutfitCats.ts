import { Char, DNI, Outfit, OutfitCat, SetDNI } from "../../../interfaces/Id";

export async function fetchOutfitCats(set: number, route:string) { 
    let ids = await get(set);
    let outfitsCats: OutfitCat[] = [{code: undefined, name: undefined, toolTip: undefined, parent: undefined}];

    let charDNI = ids.filter(c => c.alts.filter(a => a.source == route).length > 0).firstOrDefault();

    try {
      let char = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/chars/${charDNI.oc}/${charDNI.alts.filter(a => a.source == route).firstOrDefault().source}.json`)).json()) as Char);
      let outfitsChar =((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/outfits/${char.route}.json`)).json()) as {categories?: OutfitCat[], outfits: Outfit[]}).categories;
      if(outfitsChar != undefined)
        outfitsCats.push(...outfitsChar);
    } catch {
      
    }
    return outfitsCats;
    
}

async function get(set:number) {
    let Bios = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios.json`)).json()) as SetDNI[]);
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