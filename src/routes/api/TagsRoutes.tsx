import { Handler } from "hono";

import { fetchTags } from "../../lib/api/tags/fetchTags";
import { fetchTagsCodes } from "../../lib/api/tags/fetchTagCodes";
import { fetchTag } from "../../lib/embed/EmbedFetch";

export const getTags: Handler <
{},
"/api/tags"
> = async (c) => {
    const lang = c.req.query('lang');
    const tags = c.req.queries('tag');
    const data = await fetchTags(tags, lang??"en");
    return c.json(data);
}

export const getTagCodes: Handler <
{},
"/api/tags/codes"
> = async (c) => {
    const lang = c.req.query('lang');
    const data = await fetchTagsCodes(lang);
    return c.json(data);
}

export const getTag: Handler <
{},
"/api/tag/:tag"
> = async (c) => {
    const { tag } = c.req.param();
    const lang = c.req.query('lang');
    const data = await fetchTag(tag, lang??"en");
    return c.json(data);
}