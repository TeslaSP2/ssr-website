import { Handler } from "hono";

import { fetchPost } from "../../lib/api/posts/fetchPost";
import { fetchResizeImage } from "../../lib/api/posts/fetchResizePostImage";

export const getPost: Handler <
{},
"/api/post/:year/:name"
> = async (c) => {
    const { year, name } = c.req.param();
    const data = await fetchPost(year, name);
    return c.json(data);
}

export const getResizedImage: Handler <
{},
"/api/img/:path"
> = async (c) => {
    const path = c.req.param('path');
    const realPath = decodeURIComponent(path);
    const size = c.req.query('size');
    const data = await fetchResizeImage(realPath, size == undefined ? 0 : (isNaN(+size) ? 0 : +size));
    return c.json(data);
}