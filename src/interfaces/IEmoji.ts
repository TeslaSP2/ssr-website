import { LangKeyedString } from "./General";

export interface Iemoji {
    emoji: string;
    fallback: string;
    color?: string;
    link?: string;
    tooltip?: LangKeyedString[];
}

export interface MtntEmoji {
    cat: string;
    code: number[];
    desc: string;
    root: string;
    short: string;
    src: string;
}