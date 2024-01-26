import { Tag } from "../../../interfaces/Tag";
import { read } from "../../utils/Dependency";

export async function fetchTag(tag: string) {
    return (await read<Tag[]>('tags.json')).filter(t => t.code == tag).firstOrDefault();
}