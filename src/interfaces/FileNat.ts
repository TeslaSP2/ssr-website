import { BodyBlock, LangKeyedString } from "./General";

export interface FileNat {
    BelongsTo?: string;
    Type: string;
    Name: LangKeyedString[];
    FileExt?: string;
    LastModDate: string;
    TypeFull: LangKeyedString[];
    Size?: number;
    Content?: BodyBlock[];
}