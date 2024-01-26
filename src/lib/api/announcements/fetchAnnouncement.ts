import { Announcement } from "../../../interfaces/Announcement";
import { read } from "../../utils/Dependency";

export async function fetchAnnouncement(id: string) {
    let ref = (await read<{ date: string, id: string }[]>(`announcements.json`)).filter(a => a.id == id && a.date.checkForUnlock()).firstOrDefault();    
    return await read<Announcement>(`announcements/${ref.date.toDate().getFullYear()}/${ref.id}.json`);
}