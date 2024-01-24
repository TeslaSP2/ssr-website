import { ArchivePost } from "../interfaces/ArchivePost";
import { Post } from "../interfaces/Post";
import { Tag } from "../interfaces/Tag";
import { getFeaturedStuffFromPost } from "./Dependency";
import { Interpreter, RandomInt } from "./extension-methods";

export async function fetchTag(tagCode: string, lang: string = "en") {
    let archivePosts = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/archive-posts.json?${RandomInt(999999999)}`)).json()) as ArchivePost[]).filter(p => p.tags != undefined ? p.tags.includes(tagCode) : false)
    let tag = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/tags.json?${RandomInt(999999999)}`)).json()) as Tag[]).filter(t => t.code == tagCode).firstOrDefault();
    let images: string[] = [];

    let title = Interpreter(tag.name, lang).stuff.firstOrDefault();

    for(const archivePost of archivePosts)
    {
        if(archivePost.jsonName == "" || archivePost.jsonName == undefined || archivePost.jsonName == null)
        {
            if(archivePost.featuredImage != undefined)
                images.push(archivePost.featuredImage);
        }
        else
        {
            let post = (await (await fetch('https://files.teslasp2.com/assets/jsons/'+"posts/"+archivePost.unlockDate.toDate().getFullYear()+"/"+archivePost.jsonName+".json?"+RandomInt(99999999999))).json()) as Post;
            if(post != null)
            {
                let fs = getFeaturedStuffFromPost(archivePost, post, lang);
                images.push(fs.censImage != undefined ? fs.censImage : fs.image);
            }
        }
    }

    return {tag: tagCode, name: title, featuredImage: images[RandomInt(images.length)]}
}