import { ArchivePost } from "../../../interfaces/ArchivePost";
import { readAsObject } from "../../utils/Dependency";

export async function fetchArchivePost(id: string) {
    return (await readAsObject<ArchivePost[]>(`archive-posts.json`)).filter(p => p.id == id).firstOrDefault();
}