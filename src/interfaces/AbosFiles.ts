import { BodyBlock, LangKeyedString } from "./General";

export interface AbosFiles {
    Name: LangKeyedString[];
    Type: string;
    Folder: string;
    Size: number;
    Date: string;
    Special?: boolean;
    Content: BodyBlock[];
}