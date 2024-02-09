import { Handler } from "hono";

import { fetchBios } from "../../lib/api/ocBios/fetchBios";
import { fetchChars } from "../../lib/api/ocBios/fetchChars";
import { fetchFAQChars } from "../../lib/api/ocBios/fetchFAQ";
import { fetchOutfitCats } from "../../lib/api/ocBios/fetchOutfitCats";
import { fetchOutfits } from "../../lib/api/ocBios/fetchOutfits";
import { fetchOtherArtists } from "../../lib/api/ocBios/fetchOtherArtists";
import { fetchChar } from "../../lib/api/ocBios/fetchChar";
import { fetchCharFull } from "../../lib/api/ocBios/fetchCharFull";
import { fetchBiosBySet } from "../../lib/api/ocBios/fetchBiosBySet";
import { fetchSetByChar } from "../../lib/api/ocBios/fetchSetByChar";

export const getBios: Handler <
{},
"/api/ocBios"
> = async (c) => {
    const data = await fetchBios();
    return c.json(data);
}

export const getBiosBySet: Handler <
{},
"/api/ocBios/:set"
> = async (c) => {
    const { set } = c.req.param();
    const data = await fetchBiosBySet(+set);
    return c.json(data);
}

export const getChars: Handler <
{},
"/api/ocBios/chars/all"
> = async (c) => {
    const data = await fetchChars();
    return c.json(data);
}

export const getCharsQna: Handler <
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

export const getOutfits: Handler <
{},
"/api/ocBio/outfits/:set/:route"
> = async (c) => {
    const { set, route } = c.req.param();
    const data = await fetchOutfits(+set, route);
    return c.json(data);
}

export const getOtherArtists: Handler <
{},
"/api/ocBio/otherArtists/:set/:route"
> = async (c) => {
    const { set, route } = c.req.param();
    const data = await fetchOtherArtists(+set, route);
    return c.json(data);
}

export const getChar: Handler <
{},
"/api/ocBio/char/:oc"
> = async (c) => {
    const { oc } = c.req.param();
    const data = await fetchChar(oc);
    return c.json(data);
}

export const getFullChar: Handler <
{},
"/api/ocBio/char/full/:oc"
> = async (c) => {
    const { oc } = c.req.param();
    const data = await fetchCharFull(oc);
    return c.json(data);
}

export const getSetByChar: Handler <
{},
"/api/ocBio/set/:oc"
> = async (c) => {
    const { oc } = c.req.param();
    const data = await fetchSetByChar(oc);
    return c.json({set: data});
}