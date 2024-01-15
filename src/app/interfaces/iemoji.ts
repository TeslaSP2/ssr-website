import { LangKeyedString } from "./general";

export interface Iemoji {
    emoji: string;
    color?: string;
    link?: string;
    tooltip?: LangKeyedString[];
}
