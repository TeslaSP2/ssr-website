import { Handler } from "hono";
import { fetchColors } from "../../lib/api/colors/fetchColors";

export const getColors: Handler <
{},
"/api/colors"
> = async (c) => {
    const data = await fetchColors();
    return c.json(data);
}