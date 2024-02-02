import { Song } from "../../../interfaces/Song";
import { readAsObject } from "../../utils/Dependency";

export async function fetchMusic(...id: string[]) {
    return (await readAsObject<Song[]>(`songs.json`)).filter(x=> id.includes(x.id));
}