import { BodyBlock, LangKeyedString, OutLink } from "./general";

export interface Post {
    canon?: "Yes" | "YesSFW" | "Maybe" | "MaybeSFW" | "No" | "Impossible";
    canonContext?: LangKeyedString[];
    featuredImage: string;
    altFeaturedImage?: string;
    censoredFeaturedImage?: string;
    allNsfw?: boolean;
    longTracks?: boolean;
    tracks?: {
        download?: string[];
        songs: string[];
    };
    body: BodyBlock[];
    outsideLinks?: OutLink[];
}