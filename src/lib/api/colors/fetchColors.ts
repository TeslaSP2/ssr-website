import { Palette } from "../../../interfaces/Palette";
import { read } from "../../utils/Dependency";

export async function fetchColors() {
    return await read<Palette[]>(`colorTags.json`);
}