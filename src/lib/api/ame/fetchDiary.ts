import { AmeDiaryNote } from "../../../interfaces/AmeDiaryNote";

export async function fetchDiary() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/diary/diary-entries.json`)).json()) as AmeDiaryNote[]);
}