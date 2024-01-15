export interface OutLink {
    type: string
    link: string;
    tooltip?: string;
    nsfw?: boolean;
}

export interface BodyBlock {
    type: string;
    altVers?: {name: LangKeyedString[], starts: string, ends?: string}[]
    content: LangKeyedString[];
    alt?: LangKeyedString[];
    messages?: LangKeyedString[];
    downloads?: LangKeyedString[];
    internalType?: string[];
}

export interface LangKeyedString {
    key: string;
    stuff: SpicyString[];
}

export interface SpicyString {
    str: string;
    strExp?: string;
    nsfw?: boolean;
    onlySfw?: boolean;
}