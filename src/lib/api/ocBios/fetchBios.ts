import { SetDNI } from "../../../interfaces/Id";

export async function fetchBios() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios.json`)).json()) as SetDNI[]);
}