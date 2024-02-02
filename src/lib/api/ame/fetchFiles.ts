import { AmeFile } from "../../../interfaces/AmeFile";
import { readAsObject } from "../../utils/Dependency";

export async function fetchFiles() {
    return await readAsObject<AmeFile[]>(`ame-pc/files.json`);
}