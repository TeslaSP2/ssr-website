import { Handler } from "hono";

import { fetchPost } from "../../lib/api/posts/fetchPost";
import { fetchPostById } from "../../lib/api/posts/fetchPostById";
import { fetchRandomPost } from "../../lib/api/posts/fetchRandomPost";

export const getPost: Handler <
{},
"/api/post/:year/:name"
> = async (c) => {
    const { year, name } = c.req.param();
    const data = await fetchPost(year, name);
    return c.json(data);
}

export const getPostById: Handler <
{},
"/api/post/:id"
> = async (c) => {
    const { id } = c.req.param();
    const lang = c.req.query('lang');
    const data = await fetchPostById(id, lang??"en");
    return c.json(data);
}

export const getRandomPost: Handler <
{},
"/api/post/random"
> = async (c) => {
    const year = c.req.query('year');
    const month = c.req.query('month');
    let options: {year: number; month: number} | undefined = undefined;

    if(year != undefined && month != undefined)
        options = {year: +year, month: +month};

    const data = await fetchRandomPost(options);
    return c.json(data);
}