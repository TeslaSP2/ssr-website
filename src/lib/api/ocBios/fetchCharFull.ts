import { SetDNI } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";
import { fetchQnaByAnswerer } from "../qna/fetchQnaByAnswerer";
import { fetchOtherArtists } from "./fetchOtherArtists";
import { fetchOutfitCats } from "./fetchOutfitCats";
import { fetchOutfits } from "./fetchOutfits";

export async function fetchCharFull(oc: string) {
    let set = await getSet(oc);
    let qna = await fetchQnaByAnswerer(oc);
    let outfits = await fetchOutfits(set, oc);
    let outfitsCats = await fetchOutfitCats(set, oc);
    let otherArtists = await fetchOtherArtists(set, oc);

    return {qna: qna, outfits: outfits, outfitsCats: outfitsCats, otherArtists: otherArtists}
}

async function getSet(oc: string) {
    let Bios = await read<SetDNI[]>(`oc-bios.json`);

    for(const set of Bios)
    {
      for(const dni of set.DNIs)
      {
        if(!dni.hidden)
        {
          for(const alt of dni.alts)
          {
            if(alt.source == oc)
                return Bios.indexOf(set);
          }
        }
      }
    }

    return 0;
}