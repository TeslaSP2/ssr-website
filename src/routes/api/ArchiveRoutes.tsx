import { Handler } from "hono";

import { fetchArchive } from "../../lib/api/archive/fetchArchive";
import { fetchArchivePost } from "../../lib/api/archive/fetchArchivePost";
import { fetchArchiveLastPosts } from "../../lib/api/archive/fetchArchiveLastPosts";
import { fetchNextPost } from "../../lib/api/archive/fetchNextPost";
import { fetchArchiveRecap } from "../../lib/api/archive/fetchArchiveRecap";

export const getArchive: Handler <
{},
"/api/archive"
> = async (c) => {
    const data = await fetchArchive();
    return c.json(data);
}

export const getArchiveRecap: Handler <
{},
"/api/archive/recap"
> = async (c) => {
    const data = await fetchArchiveRecap();
    return c.json({recap: data});
}

export const getArchivePost: Handler <
{},
"/api/archive/post/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchArchivePost(id);
    return c.json(data);
}

export const getArchiveLastPosts: Handler <
{},
"/api/archive/last/:x/posts"
> = async (c) => {
    const { x } = c.req.param();
    const { startDate, endDate, random, uncut } = c.req.query();

    let options: { startDate?: Date; endDate?: Date, random?: boolean, uncut?: boolean} | undefined;

    if(startDate != undefined) {if(options == undefined) options = {}; if(options != undefined) options.startDate = startDate.replaceAll('A', '/').replaceAll('B', ':').replace('T', ' ').toDate();}
    if(endDate != undefined) {if(options == undefined) options = {}; if(options != undefined) options.endDate = endDate.replaceAll('A', '/').replaceAll('B', ':').replace('T', ' ').toDate();}
    if(random != undefined) {if(options == undefined) options = {}; if(options != undefined) options.random = random == "true";}
    if(uncut != undefined) {if(options == undefined) options = {}; if(options != undefined) options.uncut = uncut == "true";}

    const data = await fetchArchiveLastPosts(+x, options);
    return c.json(data);
} 

export const getNextPost: Handler <
{},
"/api/archive/nextPost"
> = async (c) => {
    const data = await fetchNextPost();
    return c.json(data);
}