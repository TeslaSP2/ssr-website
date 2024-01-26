import { FileNat } from "../../../interfaces/FileNat";
import { read } from "../../utils/Dependency";

export async function fetchFiles() {
    let files: {Id: string, File: FileNat}[] = [];
    let filesRef = await read<{ Id: string }[]>(`nat-pc/files-repo.json`);
    for(const fileRef of filesRef)
    {
      files.push({Id: fileRef.Id, File: await read<FileNat>(`nat-pc/files/${fileRef.Id}.json`)});
    }

    return files;
}