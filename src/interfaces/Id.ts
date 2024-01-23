import { BodyBlock, LangKeyedString, OutLink } from "./General";

export interface SetDNI {
    name: LangKeyedString[];
    DNIs: DNI[];
}

export interface DNI {
    oc:string;
    hidden:boolean;
    alts: {
        name:LangKeyedString[];
        source:string;
    }[]
}

export interface Char {
    name: string;
    firstName?: string;
    lastName?: string;
    route: string;
    hidden?: boolean;
    thumbImg: string;
    silliness?: number;
    personalData: {
        headshot?:string;
        alias?: LangKeyedString[];
        age?: number;
        birthday?: string;
        specialState?: LangKeyedString[];
        job?: LangKeyedString[];
        money?: number;
        hometown?: {
            name: LangKeyedString[];
            flags?: {
                code: string,
                tooltip?: LangKeyedString[]
            }[];
        }
        gender?: {
            name: LangKeyedString[];
            flags?: {
                code: string,
                tooltip?: LangKeyedString[]
            }[];
        };
        pronouns?: LangKeyedString[];
        sexuality?: {
            name: LangKeyedString[];
            flags?: {
                code: string,
                tooltip?: LangKeyedString[]
            }[];
        };
        favColor?: string[];
        specialItems?: {
            name: LangKeyedString[];
            detail: LangKeyedString[];
        }[];
    };
    appearance?: {
        compareVisual: string;
        bodySfw: string;
        bodyNsfw?: string;
        species?: LangKeyedString[];
        height?: number;
        trueHeight?: number;
        weight?: number;
        speed?: number;
        sex?: LangKeyedString[];
        eyeColor?: string[];
        skinColor?: string[];
        furColor?: string[];
        hairColor?: string[];
        hairStyle?: LangKeyedString[];
        hornColor?: string[];
        fleshColor?: string[];
        bustSizeGen?: LangKeyedString[];
        bustSize?: string;
        pSizeGen?: LangKeyedString[];
        pSize?: string;
        acc?: {
            thing: LangKeyedString[];
            color?: string;
            isNSFW?: boolean;
        }[];
        trivia?: {
            phrase: LangKeyedString[];
            isNSFW?: boolean;
        }[];
    };
    outfits?: string[];
    personality?: LangKeyedString[];
    likes?: {
        loves?: LangKeyedString[];
        likes?: LangKeyedString[];
        dislikes?: LangKeyedString[];
        hates?: LangKeyedString[];
        fetishes?: LangKeyedString[];
    };
    songs?: string[];
    spotifyPlaylist?: string;
    story?: LangKeyedString[];
    extras?: {
        type: "BODY" | "PERSONAL" | "FAMILY" | "ANECDOTE";
        phrase: LangKeyedString[];
        isNSFW?: boolean;
    }[];
    bskyFeed?: string;
    appearsIn?: string[];
    givenArt?: string[];
    notes?: LangKeyedString[];
    qna?: string[];
}

export interface OutfitCat {
    code?: string;
    name?: LangKeyedString[];
    toolTip?: LangKeyedString[];
    parent?: string;
}

export interface Outfit {
    id: string;
    name: LangKeyedString[];
    skins: [
        {
            default?: boolean;
            indicative: string;
            tooltip: LangKeyedString[];
            asSeenOn?: string;
            unlockDate?: string;
            layers: {
                src: string[];
                isNSFW?: boolean;
            }[];
        }
    ]
    isNSFW?: boolean;
    code?: string;
}

export interface OutArt {
    id: string;
    shows: string[];
    unlockDate: string;
    featuredImage: string;
    fullImages: string[];
    altFeaturedImage?: string;
    censoredFeaturedImage?: string;
    nsfw?: boolean;
    cw?: string[];
    type: "Commission" | "Gift" | "Raffle" | "YCH" | "Request" | "Trade";
    by: string;
    outsideLinks?: OutLink[];
    unlisted?: boolean;
    myTradePart?: string;
}

export interface QnA {
    id: string;
    mainAnswerer?: string;
    mainParent?: string;
    question: {
        author?: string;
        authorImg?: string;
        body: BodyBlock[];
    };
    answer: {
        author: string;
        parent?: string;
        authorImg?: string;
        body: BodyBlock[];
    }[];
}