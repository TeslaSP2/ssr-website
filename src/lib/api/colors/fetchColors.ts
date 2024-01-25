import { Palette } from "../../../interfaces/Palette";

export async function fetchColors() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/colorTags.json`)).json()) as Palette[]);
}