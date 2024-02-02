import { OutLink } from "../../../interfaces/General";
import { readAsObject } from "../../utils/Dependency";

export async function fetchLinks() {
    return await readAsObject<OutLink[]>(`links-gen.json`);
}