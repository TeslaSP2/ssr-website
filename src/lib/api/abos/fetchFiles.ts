import { AbosFiles } from "../../../interfaces/AbosFiles";
import { readAsObject } from "../../utils/Dependency";

export async function fetchFiles() {
    let files: {Id:string; File:AbosFiles}[] = [];
    let filesRef = await readAsObject<{ Id: string }[]>(`abos/abos-files.json`);
    for(const fileRef of filesRef)
    {
        files.push({Id: fileRef.Id, File: await readAsObject<AbosFiles>(`abos/files/${fileRef.Id}.json`)});
    }

    return files;
}