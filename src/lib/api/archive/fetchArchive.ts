import { ArchivePost } from "../../../interfaces/ArchivePost";

export async function fetchArchive() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/archive-posts.json`)).json()) as ArchivePost[]).sort((p1, p2) => {
        return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
    });
}