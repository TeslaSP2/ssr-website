import { Tag } from "../../../interfaces/Tag";
import { readAsObject } from "../../utils/Dependency";

export async function fetchTag(tag: string) {
    return (await readAsObject<Tag[]>('tags.json')).filter(t => t.code == tag).firstOrDefault();
}