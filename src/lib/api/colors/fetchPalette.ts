import { Palette } from "../../../interfaces/Palette";
import {
    colorConditional,
    getDarkColor,
    getDefColor,
    getInvColor,
    getLightColor,
    getPalette,
    getSecondColor,
    getSecondDarkColor,
    hasDarkColor,
    hasLightColor,
    hasSecondDarkColor, 
    hasSpecialColor } from "../../utils/ColorService";
import { readAsObject } from "../../utils/Dependency";

export async function fetchPalette(search: string): Promise<{
    isSpecialColor: boolean;
    palette: Palette;
    defColor: string;
    secondColor?: string;
    light?: string;
    dark?: string;
    secondDark?: string;
    inv?: string;
    colorCond?: string;
}> {
    let tags = await readAsObject<Palette[]>(`colorTags.json`);

    let palette = await getPalette(search, tags);
    let isSpecialColor = await hasSpecialColor(search, tags);
    let defColor = await getDefColor(search, tags);
    let secondColor = await getSecondColor(search, tags);
    let light = await getLightColor((await hasLightColor(search, tags), tags) ? search : (`#`+defColor));
    let dark = await getDarkColor((await hasDarkColor(search, tags), tags) ? search : (`#`+defColor));
    let secondDark = await getSecondDarkColor(await hasSecondDarkColor(search, tags) ? search : (`#`+secondColor), tags);
    let inv = await getInvColor(search, tags) == "light" ? light : (await getInvColor(search, tags) == "dark" ? dark : await getInvColor(search, tags));
    let colorCond = await colorConditional(search, tags);
    return {isSpecialColor, palette, defColor, secondColor, light, dark, secondDark, inv, colorCond};
}