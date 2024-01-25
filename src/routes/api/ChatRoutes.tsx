import { Handler } from "hono";

import { fetchChat } from "../../lib/api/chat/fetchChat";

export const getChat: Handler <
{},
"/api/chat/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchChat(id);
    return c.json(data);
}