import { Collection } from "../../../interfaces/Collection";
import { PaginationFilter } from "../../../interfaces/PaginationFilter";
import { getPostLength } from "../../utils/Dependency";

export async function fetchCollections(cringe?: boolean, nsfw?:boolean, scrapped?: boolean) {
    if(cringe == undefined)
        cringe = false

    if(nsfw == undefined)
        nsfw = false

    if(scrapped == undefined)
        scrapped = false

    let collections = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/post-collections.json`)).json()) as Collection[]);
    let ret: Collection[] = [];
    for(const collection of collections)
    {
        if(!(collection.hidden??false))
        {
            let paginationFilter: PaginationFilter = {
                seeCringe: cringe,
                seeNSFW: nsfw,
                seeScrapped: scrapped,
                seeMusical: true,
                seeNormal: true,
                collections: [collection.id],
                sortType: 'date',
                currentLang: 'en'
            };
            let posts = await getPostLength(paginationFilter)
            if(posts > 1)
                ret.push(collection);
        }
    }

    return ret;
}