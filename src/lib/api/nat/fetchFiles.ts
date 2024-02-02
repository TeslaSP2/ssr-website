import { FileNat } from "../../../interfaces/FileNat";
import { readAsObject } from "../../utils/Dependency";

export async function fetchFiles() {
    let files: {Id: string, File: FileNat}[] = [];
    let filesRef = await readAsObject<{ Id: string }[]>(`nat-pc/files-repo.json`);
    for(const fileRef of filesRef)
    {
      files.push({Id: fileRef.Id, File: await readAsObject<FileNat>(`nat-pc/files/${fileRef.Id}.json`)});
    }

    return files;
}