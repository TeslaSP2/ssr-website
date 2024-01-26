import { Char, DNI, OutArt, SetDNI } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchOtherArtists(set: number, route: string) {
  let ids = await get(set);
  let otherArtists: OutArt[] = [];

  let charDNI = ids.filter((c) => c.alts.filter((a) => a.source == route).length > 0).firstOrDefault();

  try {
    let char = await read<Char>(`oc-bios/chars/${charDNI.oc}/${charDNI.alts.filter((a) => a.source == route).firstOrDefault().source}.json`);
    otherArtists = (await read<OutArt[]>("oc-bios/other-artists.json")).filter((i) => i.shows.includes(char.route) && char.givenArt?.includes(i.id) != true);
  } catch {

  }
  return otherArtists;
}

async function get(set: number) {
  let Bios = await read<SetDNI[]>(`oc-bios.json`);
  if (set == undefined) set = 0;

  let ids: DNI[] = [];

  while (set >= Bios.length && set > 0) set--;

  for (const bio of Bios[set].DNIs) {
    try {
      ids.push(bio);
    } catch (error) {}
  }
  return ids;
}
