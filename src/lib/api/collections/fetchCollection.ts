import { Collection } from "../../../interfaces/Collection";
import { read } from "../../utils/Dependency";

export async function fetchCollection(id: string) {
    return (await read<Collection[]>(`post-collections.json`)).filter(c => c.id == id).firstOrDefault();
}