import { LangKeyedString } from "./general";

export interface PhoneticSound {
    ipaChar: string;
    letter?: string;
    sound: string;
    colSpan?: number;
    impossible?: boolean
}

export interface VerbTimes {
    name: LangKeyedString[];
    times: {
        person: LangKeyedString[];
        conjugations: {
            indefinite: {
                infinitive?: string;
                gerund: string;
                participle: string;
            };
            past: {
                simple: string;
                continuous: string;
                compound: string;
            }
            present: {
                simple: string;
                continuous: string;
            }
            future: {
                simple: string;
                continuous: string;
                compound: string;
            }
            conditional: {
                simple: string;
                compound: string;
            }
        }
    }[]
}

export interface LexWordBase {
    og: LangKeyedString[];
    font: string;
    ipa: string;
    romanization: string;
}

export interface LexWord {
    word: LexWordBase;
    prefix?: string;
    suffix?: string;
}

export interface LexNum {
    og: string;
    font: string;
    cardinal: LexWordBase;
    ordinal: LexWordBase;
    prefix: string;
}

export interface LexBasicTable {
    name: LangKeyedString[];
    words: {
        title?: LangKeyedString[][];
        rowSpan?: number[];
        colSpan?: number[];
        word?: LexWordBase;
    }[]
}

export interface LexPhoneticTable {
    name: LangKeyedString[];
    sounds: {
        soundPoses: LangKeyedString[][];
        colSpan?: number[];
        letters?: PhoneticSound[];
        noTitle: boolean;
    }[];
}