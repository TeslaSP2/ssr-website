import { MtntEmoji } from "../../../interfaces/IEmoji";
import { readAsObject } from "../../utils/Dependency";

export async function fetchEmojis() {
    return await readAsObject<MtntEmoji[]>(`mtnt_data.json`);
}