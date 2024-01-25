import { Announcement } from "../../../interfaces/Announcement";

export async function fetchAllAnnouncements() {
    let announcementsRef = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/announcements.json`)).json()) as { date: string, id: string }[])
    .sort((a1, a2) => {
        return a1.date.toDate() > a2.date.toDate() ? -1 : 1;
    });

    let announcements: Announcement[] = [];
    for(const ref of announcementsRef)
    {
        announcements.push(((await (await fetch(`https://files.teslasp2.com/assets/jsons/announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`)).json()) as Announcement));
    }
    
    return announcements;
}