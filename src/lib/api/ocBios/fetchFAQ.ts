import { Char, DNI, SetDNI } from "../../../interfaces/Id";

export async function fetchFAQChars() {
    let ids: DNI[] = [];
    let ret: {ref: string, char: Char}[] = [];
    let Bios = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios.json`)).json()) as SetDNI[]);

    for(const set of Bios)
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
      const char = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/chars/${id.alts.firstOrDefault().source}/${id.alts.firstOrDefault().source}.json`)).json()) as Char);
      ret.push({ref: (id.alts.firstOrDefault().source), char: char});
    }
    return ret;
  }