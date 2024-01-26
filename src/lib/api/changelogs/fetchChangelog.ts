import { Changelog } from "../../../interfaces/Changelog";
import { read } from "../../utils/Dependency";

export async function fetchChangelog(id: string) {
    return (await read<Changelog[]>(`changelogs.json`)).filter(c => c.id == id).firstOrDefault();
}