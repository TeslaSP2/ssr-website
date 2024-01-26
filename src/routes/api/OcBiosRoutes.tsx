import { Handler } from "hono";

import { fetchBios } from "../../lib/api/ocBios/fetchBios";
import { fetchChars } from "../../lib/api/ocBios/fetchChars";
import { fetchFAQChars } from "../../lib/api/ocBios/fetchFAQ";
import { fetchOutfitCats } from "../../lib/api/ocBios/fetchOutfitCats";

export const getBios: Handler <
{},
"/api/ocBios"
> = async (c) => {
    const data = await fetchBios();
    return c.json(data);
}

export const getChars: Handler <
{},
"/api/ocBios/chars/all"
> = async (c) => {
    const data = await fetchChars();
    return c.json(data);
}

export const getFAQ: Handler <
{},
"/api/ocBios/chars/faq"
> = async (c) => {
    const data = await fetchFAQChars();
    return c.json(data);
}

export const getOutfitCats: Handler <
{},
"/api/ocBio/outfits/categories/:set/:route"
> = async (c) => {
    const { set, route } = c.req.param();
    const data = await fetchOutfitCats(+set, route);
    return c.json(data);
}