import { Collection } from "../../../interfaces/Collection";

export async function fetchCollection(id: string) {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/post-collections.json`)).json()) as Collection[]).filter(c => c.id == id).firstOrDefault();
}