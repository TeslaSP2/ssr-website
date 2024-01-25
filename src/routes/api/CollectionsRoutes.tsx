import { Handler } from "hono";

import { fetchCollections } from "../../lib/api/collections/fetchCollections";
import { fetchCollection } from "../../lib/api/collections/fetchCollection";

export const getCollections: Handler <
{},
"/api/collections"
> = async (c) => {
    const { cringe, nsfw, scrapped } = c.req.query();
    const data = await fetchCollections(cringe != undefined ? cringe == 'true' : undefined,
                                        nsfw != undefined ? nsfw == 'true' : undefined,
                                        scrapped != undefined ? scrapped == 'true' : undefined);
    return c.json(data);
}

export const getCollection: Handler <
{},
"/api/collection/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchCollection(id);
    return c.json(data);
}