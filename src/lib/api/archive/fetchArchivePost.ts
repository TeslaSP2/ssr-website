import { ArchivePost } from "../../../interfaces/ArchivePost";
import { read } from "../../utils/Dependency";

export async function fetchArchivePost(id: string) {
    return (await read<ArchivePost[]>(`archive-posts.json`)).filter(p => p.id == id).firstOrDefault();
}