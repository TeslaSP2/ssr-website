import { DNI, SetDNI } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchBiosBySet(set: number) {
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