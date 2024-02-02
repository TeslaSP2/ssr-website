import { Handler } from "hono";
import { readAsObject } from "../../lib/utils/Dependency";

export const getMisc: Handler <
    {},
  "/api/misc/:key"
> = async (c) => {
    const { key } = c.req.param();
    const data = await keyFindMisc(key);
    return c.json(data);
}

async function keyFindMisc(key: string) {
    let r = await readAsObject<any>(`misc-stuff.json`);
    return r[key];
}