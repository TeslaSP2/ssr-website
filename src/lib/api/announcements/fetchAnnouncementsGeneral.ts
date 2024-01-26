import { read } from "../../utils/Dependency";

export async function fetchAnnouncementsGeneral() {
    return (await read<{ date: string, id: string }[]>(`announcements.json`))
    .sort((a1, a2) => {
        return a1.date.toDate() > a2.date.toDate() ? -1 : 1;
    });
}