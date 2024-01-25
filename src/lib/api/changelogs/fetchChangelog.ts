import { Changelog } from "../../../interfaces/Changelog";

export async function fetchChangelog(id: string) {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/changelogs.json`)).json()) as Changelog[]).filter(c => c.id == id).firstOrDefault();
}