import { BodyBlock, LangKeyedString } from "./General";

export interface FilesAbos {
    Name: LangKeyedString[];
    Type: string;
    Folder: string;
    Size: number;
    Date: string;
    Special?: boolean;
    Content: BodyBlock[];
}