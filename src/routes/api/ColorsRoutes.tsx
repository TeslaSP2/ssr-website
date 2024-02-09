import { Handler } from "hono";

import { fetchColors } from "../../lib/api/colors/fetchColors";
import { fetchPalette } from "../../lib/api/colors/fetchPalette";

export const getColors: Handler <
{},
"/api/colors"
> = async (c) => {
    const data = await fetchColors();
    return c.json(data);
}

export const getPalette: Handler <
{},
"/api/colors/palette/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchPalette(id);
    return c.json(data);
}