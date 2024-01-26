import { AmeDiaryNote } from "../../../interfaces/AmeDiaryNote";
import { read } from "../../utils/Dependency";

export async function fetchDiary() {
    return await read<AmeDiaryNote[]>(`diary/diary-entries.json`);
}