import { ArchivePost } from "../interfaces/ArchivePost";
import { Collection } from "../interfaces/Collection";
import { Post } from "../interfaces/Post";
import { getFeaturedStuffFromPost } from "./Dependency";
import { RandomInt } from "./extension-methods";

export async function fetchCollection(id: string, lang: string = "en") {
    let collection = (await (await fetch(`https://files.teslasp2.com/assets/jsons/post-collections.json?${RandomInt(999999999)}`)).json() as Collection[]).filter(c => c.id == id).firstOrDefault();
    let archivePosts = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/archive-posts.json?${RandomInt(999999999)}`)).json()) as ArchivePost[]).filter(p => p.collection != undefined ? p.collection.includes(id) : false)
    let images: string[] = [];

    let titleLine = collection.name.filter(h => h.key == lang || (h.key != lang && h.key == "def")).firstOrDefault();
    let title = (titleLine != null ? titleLine.str : collection.name[0].str);

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

    return {id: id, name: title, featuredImage: images[RandomInt(images.length)]}
}