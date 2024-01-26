import { AmeFile } from "../../../interfaces/AmeFile";
import { read } from "../../utils/Dependency";

export async function fetchFiles() {
    return await read<AmeFile[]>(`ame-pc/files.json`);
}