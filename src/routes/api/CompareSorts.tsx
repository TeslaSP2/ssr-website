import { Handler } from "hono";

import { fetchCompareSorts } from "../../lib/api/compareSorts/fetchCompareSorts";

export const getCompareSorts: Handler <
{},
"/api/compareSorts"
> = async (c) => {
    const data = await fetchCompareSorts();
    return c.json(data);
}