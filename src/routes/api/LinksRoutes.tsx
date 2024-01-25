import { Handler } from "hono";

import { fetchLinks } from "../../lib/api/links/fetchLinks";

export const getLinks: Handler <
{},
"/api/links"
> = async (c) => {
    const data = await fetchLinks();
    return c.json(data);
}