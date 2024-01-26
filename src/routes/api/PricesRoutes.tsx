import { Handler } from "hono";

import { fetchPricesTable } from "../../lib/api/prices/fetchPricesTable";

export const getPricesTable: Handler <
{},
"/api/prices/:table"
> = async (c) => {
    const { table } = c.req.param();
    const data = await fetchPricesTable(table);
    return c.json(data);
}