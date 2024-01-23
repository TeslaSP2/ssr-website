export interface DisplayPost {
    id: string;
    name: string;
    description: string;
    featuredImage?: string;
    altFeaturedImage?: string;
    externalLink?: string;
}

export interface DisplayCollection {
    id: string;
    name: string;
    featuredImage: string;
}

export interface DisplayTag {
    tag: string;
    name: string;
    featuredImage: string;
}

export interface OutLink {
    type: string
    link: string;
    tooltip?: string;
    nsfw?: boolean;
}

export interface BodyBlock {
    type: string;
    altVers?: AltVersion[]
    content: LangKeyedString[];
    alt?: LangKeyedString[];
    messages?: LangKeyedString[];
    downloads?: LangKeyedString[];
    internalType?: string[];
}

export interface AltVersion {
    name: LangKeyedString[];
    positions?: number[];
    child?: AltVersion[];
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