import { Char, SetDNI } from "../../../interfaces/Id";

export async function fetchChars() {
    let Bios = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios.json`)).json()) as SetDNI[]);

    let chars: Char[] = [];

    for(const set of Bios)
    {
      for(const dni of set.DNIs)
      {
        if(!dni.hidden)
        {
          for(const alt of dni.alts)
          {
            chars.push(((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/chars/${dni.oc}/${alt.source}.json`)).json()) as Char));
          }
        }
      }
    }

    return chars;
}