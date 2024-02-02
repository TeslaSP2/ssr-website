import { Announcement } from "../../../interfaces/Announcement";
import { readAsObject } from "../../utils/Dependency";

export async function fetchAnnouncements(noPinned: boolean = false) {
    let unlocked: Announcement[] = [];
    let pinned: Announcement[] = [];
    let nonPinned: Announcement[] = [];
    let ret: Announcement[] = [];

    let announcementsRef = (await readAsObject<{ date: string, id: string }[]>(`announcements.json`))
    .sort((a1, a2) => {
        return a1.date.toDate() > a2.date.toDate() ? -1 : 1;
    });

    let announcements: Announcement[] = [];
    for(const ref of announcementsRef)
    {
        announcements.push(await readAsObject<Announcement>(`announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`));
    }

    unlocked = announcements.filter(a => announcementsRef.filter(r => r.id == a.id).firstOrDefault().date.checkForUnlock());
    pinned = unlocked.filter(a => a.pinned);
    nonPinned = unlocked.filter(a => !a.pinned);

    if(!noPinned)
        ret = pinned;
    
    for(const a of nonPinned)
        ret.push(a);
    
    return ret;
}