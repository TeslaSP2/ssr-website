import { FilesAbos } from "../../../interfaces/FilesAbos";

export async function fetchFiles() {
    let files: {Id:string; File:FilesAbos}[] = [];
    let filesRef = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/abos-files.json`)).json()) as { Id: string }[]);
    for(const fileRef of filesRef)
    { 
        files.push({Id: fileRef.Id, File: ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/files/${fileRef.Id}.json`)).json()) as FilesAbos)});
    }

    return files;
}