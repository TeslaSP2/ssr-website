import { AmeDiaryNote } from "../../../interfaces/AmeDiaryNote";
import { readAsObject } from "../../utils/Dependency";

export async function fetchDiary() {
    return await readAsObject<AmeDiaryNote[]>(`diary/diary-entries.json`);
}