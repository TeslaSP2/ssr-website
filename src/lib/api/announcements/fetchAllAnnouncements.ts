import { Announcement } from "../../../interfaces/Announcement";
import { readAsObject } from "../../utils/Dependency";

export async function fetchAllAnnouncements() {
    let announcementsRef = (await readAsObject<{ date: string, id: string }[]>(`announcements.json`))
    .sort((a1, a2) => {
        return a1.date.toDate() > a2.date.toDate() ? -1 : 1;
    });

    let announcements: Announcement[] = [];
    for(const ref of announcementsRef)
    {
        announcements.push(await readAsObject<Announcement>(`announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`));
    }
    
    return announcements;
}