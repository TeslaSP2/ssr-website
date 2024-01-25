import { Handler } from "hono";

import { fetchFiles } from "../../lib/api/abos/fetchFiles";
import { fetchTable } from "../../lib/api/abos/fetchTable";

export const getAbosFiles: Handler <
{},
"/api/abos/files"
> = async (c) => {
    const data = await fetchFiles();
    return c.json(data);
}

export const getAbosTable: Handler <
{},
"/api/abos/table/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchTable(id);
    return c.json(data);
}