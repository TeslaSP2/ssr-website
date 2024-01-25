import { AmeFile } from "../../../interfaces/AmeFile";

export async function fetchFiles() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/ame-pc/files.json`)).json()) as AmeFile[]);
}