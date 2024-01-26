import { MtntEmoji } from "../../../interfaces/IEmoji";
import { read } from "../../utils/Dependency";

export async function fetchEmojis() {
    return await read<MtntEmoji[]>(`mtnt_data.json`);
}