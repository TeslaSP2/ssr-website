import { Handler } from "hono";

import { fetchQna } from "../../lib/api/qna/fetchQna";
import { fetchQnaByAnswerer } from "../../lib/api/qna/fetchQnaByAnswerer";

export const getQna: Handler <
{},
"/api/qna/:id?"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchQna(id);
    return c.json(data);
}

export const getQnaByAnswerer: Handler <
{},
"/api/qna/MainAnswerer/:main/:parent?"
> = async (c) => {
    const { main, parent } = c.req.param();
    const data = await fetchQnaByAnswerer(main, parent);
    return c.json(data);
}