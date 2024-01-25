import { OutLink } from "../../../interfaces/General";

export async function fetchLinks() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/links-gen.json`)).json()) as OutLink[]);
}