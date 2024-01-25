import { BodyBlock, LangKeyedString } from "./General";

export interface Announcement {
    id: string;
    title?: LangKeyedString[];
    pinned?: boolean;
    system?: boolean;
    body: BodyBlock[];
}