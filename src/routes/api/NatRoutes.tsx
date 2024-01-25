import { Handler } from "hono";

import { fetchFiles } from "../../lib/api/nat/fetchFiles";

export const getNatFiles: Handler <
{},
"/api/nat/files"
> = async (c) => {
    const data = await fetchFiles();
    return c.json(data);
}