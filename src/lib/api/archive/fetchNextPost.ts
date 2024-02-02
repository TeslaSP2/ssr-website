import { ArchivePost } from "../../../interfaces/ArchivePost";
import { readAsObject } from "../../utils/Dependency";

export async function fetchNextPost() {
    return (await readAsObject<ArchivePost[]>(`archive-posts.json`))
    .filter(p => (p.unlockDate != '' && p.unlockDate != undefined))
    .filter(p => p.unlockDate.toDate() > (new Date()))
    .firstOrDefault();
}