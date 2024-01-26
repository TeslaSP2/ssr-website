import { Handler } from "hono";

import { fetchPost } from "../../lib/api/posts/fetchPost";

export const getPost: Handler <
{},
"/api/post/:year/:name"
> = async (c) => {
    const { year, name } = c.req.param();
    const data = await fetchPost(year, name);
    return c.json(data);
}