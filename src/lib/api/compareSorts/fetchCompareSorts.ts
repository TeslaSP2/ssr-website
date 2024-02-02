import { LangKeyedString } from "../../../interfaces/General";
import { readAsObject } from "../../utils/Dependency";

export async function fetchCompareSorts() {
    return await readAsObject<Sort[]>(`oc-bios/sorts.json`);
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