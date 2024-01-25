import { Announcement } from "../../../interfaces/Announcement";

export async function fetchAnnouncement(id: string) {
    let ref = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/announcements.json`)).json()) as { date: string, id: string }[]).filter(a => a.id == id && a.date.checkForUnlock()).firstOrDefault();    
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`)).json()) as Announcement);
}