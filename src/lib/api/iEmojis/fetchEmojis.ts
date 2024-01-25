import { MtntEmoji } from "../../../interfaces/IEmoji";

export async function fetchEmojis() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/mtnt_data.json`)).json()) as MtntEmoji[]);
}