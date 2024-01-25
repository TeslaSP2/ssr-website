import { LangKeyedString } from "../../../interfaces/General";

export async function fetchCompareSorts() {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/sorts.json`)).json()) as Sort[]);
}

export interface Sort {
    code: string;
    allowChangeMeasure?: boolean;
    measures?: string[];
    name: LangKeyedString[];
    reverseAsc?: boolean;
    sortBlock: string;
    sortValue: string;
}