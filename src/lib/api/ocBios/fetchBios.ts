import { SetDNI } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchBios() {
    return await readAsObject<SetDNI[]>(`oc-bios.json`);
}