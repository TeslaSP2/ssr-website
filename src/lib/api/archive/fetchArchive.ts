import { ArchivePost } from "../../../interfaces/ArchivePost";
import { readAsObject } from "../../utils/Dependency";

export async function fetchArchive() {
    return (await readAsObject<ArchivePost[]>(`archive-posts.json`)).sort((p1, p2) => {
        return p1.unlockDate.toDate() > p2.unlockDate.toDate() ? -1 : 1;
    });
}