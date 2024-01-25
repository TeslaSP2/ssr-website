import { ArchivePost } from "../../../interfaces/ArchivePost";

export async function fetchArchivePost(id: string) {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/archive-posts.json`)).json()) as ArchivePost[]).filter(p => p.id == id).firstOrDefault();
}