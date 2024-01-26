import { Char, SetDNI } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchChars() {
    let Bios = await read<SetDNI[]>(`oc-bios.json`);

    let chars: Char[] = [];

    for(const set of Bios)
    {
      for(const dni of set.DNIs)
      {
        if(!dni.hidden)
        {
          for(const alt of dni.alts)
          {
            chars.push(await read<Char>(`oc-bios/chars/${dni.oc}/${alt.source}.json`));
          }
        }
      }
    }

    return chars;
}