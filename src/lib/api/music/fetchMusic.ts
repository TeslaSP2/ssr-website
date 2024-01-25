import { Song } from "../../../interfaces/Song";

export async function fetchMusic(...id: string[]) {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/songs.json`)).json()) as Song[]).filter(x=> id.includes(x.id));
}