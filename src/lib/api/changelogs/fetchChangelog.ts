import { Changelog } from "../../../interfaces/Changelog";
import { readAsObject } from "../../utils/Dependency";

export async function fetchChangelog(id: string) {
    return (await readAsObject<Changelog[]>(`changelogs.json`)).filter(c => c.id == id).firstOrDefault();
}