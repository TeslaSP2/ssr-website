import { Announcement } from "../../../interfaces/Announcement";
import { readAsObject } from "../../utils/Dependency";

export async function fetchAnnouncement(id: string) {
    let ref = (await readAsObject<{ date: string, id: string }[]>(`announcements.json`)).filter(a => a.id == id && a.date.checkForUnlock()).firstOrDefault();    
    return await readAsObject<Announcement>(`announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`);
}