import { Handler } from "hono";

import { fetchEmojis } from "../../lib/api/iEmojis/fetchEmojis";
import { fetchEmoji } from "../../lib/api/iEmojis/fetchEmoji";

export const getEmojis: Handler <
{},
"/api/iEmojis"
> = async (c) => {
    const data = await fetchEmojis();
    return c.json(data);
}

export const getEmoji: Handler <
{},
"/api/iEmojis/:shortCode"
> = async (c) => {
    const { shortCode } = c.req.param();
    const size = c.req.query('size');
    const data = await fetchEmoji(shortCode, size == undefined ? 0 : (isNaN(+size) ? 0 : +size));
    return c.json(data);
}