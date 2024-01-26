import { SetDNI } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchBios() {
    return await read<SetDNI[]>(`oc-bios.json`);
}