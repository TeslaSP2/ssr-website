import { AbosFiles } from "../../../interfaces/AbosFiles";
import { read } from "../../utils/Dependency";

export async function fetchFiles() {
    let files: {Id:string; File:AbosFiles}[] = [];
    let filesRef = await read<{ Id: string }[]>(`abos/abos-files.json`);
    for(const fileRef of filesRef)
    {
        files.push({Id: fileRef.Id, File: await read<AbosFiles>(`abos/files/${fileRef.Id}.json`)});
    }

    return files;
}