import { BodyBlock, LangKeyedString } from "./general";

export interface Announcement {
    id: string;
    title?: LangKeyedString[];
    pinned?: boolean;
    system?: boolean;
    body: BodyBlock[];
}
