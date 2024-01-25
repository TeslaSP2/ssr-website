import { Handler } from "hono";

import { fetchChangelogs } from "../../lib/api/changelogs/fetchChangelogs";
import { fetchChangelog } from "../../lib/api/changelogs/fetchChangelog";

export const getChangelogs: Handler <
{},
"/api/changelogs"
> = async (c) => {
    const { pageSize, page } = c.req.query();

    let options: { pageSize: number; page: number } | undefined;

    if(pageSize != undefined && page != undefined)
        options = {pageSize: +pageSize, page: +page };

    const data = await fetchChangelogs(options);
    return c.json(data);
}

export const getChangelog: Handler <
{},
"/api/changelog/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchChangelog(id);
    return c.json(data);
}