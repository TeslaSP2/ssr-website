import { DNI, SetDNI } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchSetByChar(route: string) {
    let Bios = await readAsObject<SetDNI[]>(`oc-bios.json`);

    let setId = 0;

    for(const set of Bios)
    {
      for(const bio of set.DNIs)
      {
        if(bio.oc == route)
          setId = Bios.indexOf(set);
      }
    }

    return setId;
}