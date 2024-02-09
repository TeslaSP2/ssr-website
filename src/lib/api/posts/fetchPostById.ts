import { ArchivePost } from "../../../interfaces/ArchivePost";
import { Post } from "../../../interfaces/Post";
import { Tag } from "../../../interfaces/Tag";
import { hasSFW, readAsObject, getNext, getPrev } from "../../utils/Dependency";
import { fetchTags } from "../tags/fetchTags";

export async function fetchPostById(id: string, lang: string = "en"): Promise<{
    archRef: ArchivePost;
    hasSFW: boolean;
    isUnlisted: boolean;
    year: string;
    postName: string;
    header: string | {
        key: string;
        str: string;
    }[];
    nextPost?: string;
    nextPostSFW?: string;
    prevPost?: string;
    prevPostSFW?: string;
    supposedTags?: string[];
    tagsTrue: Tag[];
    post?: Post; 
}> {
    let archRef = (await readAsObject<ArchivePost[]>(`archive-posts.json`)).filter(p => p.id == id).firstOrDefault();
    let hasSFWV = await hasSFW(archRef);
    let isUnlisted = archRef.unlisted??false;
    let postName = archRef.jsonName;
    let year = archRef.unlockDate.toDate().getFullYear()+"";
    let header = archRef.linkPart;
    let nextPost = await getNext(archRef.id, true);
    let nextPostSFW = await getNext(archRef.id, false);
    let prevPost = await getPrev(archRef.id, true);
    let prevPostSFW = await getPrev(archRef.id, false);
    let supposedTags = archRef.tags;
    let tagsTrue = (await fetchTags(undefined, lang)).filter(t => supposedTags?.includes(t.code))
    let post = await readAsObject<Post>(`posts/${year}/${postName}.json`);

    return {archRef, hasSFW: hasSFWV, isUnlisted, year, postName, header, nextPost, nextPostSFW, prevPost, prevPostSFW, supposedTags, tagsTrue, post};
}