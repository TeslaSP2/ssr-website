import { FileNat } from "../../../interfaces/FileNat";

export async function fetchFiles() {
    let files: {Id: string, File: FileNat}[] = [];
    let filesRef = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/nat-pc/files-repo.json`)).json()) as { Id: string }[]);
    for(const fileRef of filesRef)
    {
      files.push({Id: fileRef.Id, File: ((await (await fetch(`https://files.teslasp2.com/assets/jsons/nat-pc/files/${fileRef.Id}.json`)).json()) as FileNat)});
    }

    return files;
}