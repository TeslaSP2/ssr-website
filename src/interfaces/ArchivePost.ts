export interface ArchivePost {
    id: string;
    unlockDate: string;
    jsonName: string;
    featuredImage?: string;
    altFeaturedImage?: string;
    linkPart: {
        key: string;
        str: string;
    }[];
    nsfw?: boolean;
    cringe?: boolean;
    scrapped?: boolean;
    musical?: boolean;
    unlisted?: boolean;
    showInRecent: boolean;
    externalLink?: string;
    tags?:string[];
    cw?: string[];
    collection?: string[];
}