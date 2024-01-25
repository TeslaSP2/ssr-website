import { Handler } from "hono";

import { fetchFiles } from "../../lib/api/ame/fetchFiles";
import { fetchDiary } from "../../lib/api/ame/fetchDiary";

export const getAmeFiles: Handler <
{},
"/api/ame/files"
> = async (c) => {
const data = await fetchFiles();

return c.json(data);
}

export const getAmeDiary: Handler <
{},
"/api/ame/diary"
> = async (c) => {
const data = await fetchDiary();

return c.json(data);
}