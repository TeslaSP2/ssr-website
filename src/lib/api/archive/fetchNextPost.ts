import { ArchivePost } from "../../../interfaces/ArchivePost";
import { read } from "../../utils/Dependency";

export async function fetchNextPost() {
    return (await read<ArchivePost[]>(`archive-posts.json`))
    .filter(p => (p.unlockDate != '' && p.unlockDate != undefined))
    .filter(p => p.unlockDate.toDate() > (new Date()))
    .firstOrDefault();
}