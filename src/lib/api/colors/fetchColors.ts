import { Palette } from "../../../interfaces/Palette";
import { readAsObject } from "../../utils/Dependency";

export async function fetchColors() {
    return await readAsObject<Palette[]>(`colorTags.json`);
}