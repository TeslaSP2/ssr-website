import { Song } from "../../../interfaces/Song";
import { read } from "../../utils/Dependency";

export async function fetchMusic(...id: string[]) {
    return (await read<Song[]>(`songs.json`)).filter(x=> id.includes(x.id));
}