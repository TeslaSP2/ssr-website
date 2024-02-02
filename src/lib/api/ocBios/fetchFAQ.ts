import { Char, DNI, SetDNI } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchFAQChars() {
    let ids: DNI[] = [];
    let ret: {ref: string, char: Char}[] = [];
    let Bios = await readAsObject<SetDNI[]>(`oc-bios.json`);

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
      const char = await readAsObject<Char>(`oc-bios/chars/${id.alts.firstOrDefault().source}/${id.alts.firstOrDefault().source}.json`);
      ret.push({ref: (id.alts.firstOrDefault().source), char: char});
    }
    return ret;
  }