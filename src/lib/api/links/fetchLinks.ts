import { OutLink } from "../../../interfaces/General";
import { read } from "../../utils/Dependency";

export async function fetchLinks() {
    return await read<OutLink[]>(`links-gen.json`);
}