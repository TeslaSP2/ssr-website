import { Handler } from "hono";

import { fetchMusic } from "../../lib/api/music/fetchMusic";

export const getMusic: Handler <
{},
"/api/music"
> = async (c) => {
    const ids = c.req.queries('song');
    const data = await fetchMusic(...ids??[]);
    return c.json(data);
}