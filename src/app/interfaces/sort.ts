import { LangKeyedString } from "./general";

export interface Sort {
    code: string;
    allowChangeMeasure?: boolean;
    measures?: string[];
    name: LangKeyedString[];
    reverseAsc?: boolean;
    sortBlock: string;
    sortValue: string;
}
