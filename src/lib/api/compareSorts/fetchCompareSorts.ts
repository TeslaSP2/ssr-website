import { LangKeyedString } from "../../../interfaces/General";
import { read } from "../../utils/Dependency";

export async function fetchCompareSorts() {
    return await read<Sort[]>(`oc-bios/sorts.json`);
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