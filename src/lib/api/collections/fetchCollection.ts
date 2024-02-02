import { Collection } from "../../../interfaces/Collection";
import { readAsObject } from "../../utils/Dependency";

export async function fetchCollection(id: string) {
    return (await readAsObject<Collection[]>(`post-collections.json`)).filter(c => c.id == id).firstOrDefault();
}