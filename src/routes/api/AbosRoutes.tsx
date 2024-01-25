import { Handler } from "hono";

import { fetchFiles } from "../../lib/api/abos/fetchFiles";

export const getAbosFiles: Handler <
{},
"/api/abos/files"
> = async (c) => {
const data = await fetchFiles();

return c.json(data);
}