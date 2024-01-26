import { Handler } from "hono";

import { fetchSocialsExt } from "../../lib/api/socialsExt/fetchSocialsExt";

export const getSocialsExt: Handler <
{},
"/api/socialsExt"
> = async (c) => {
    const data = await fetchSocialsExt();
    return c.json(data);
}