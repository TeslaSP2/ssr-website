import { Handler } from "hono";
import { Tag } from "../components/Tag";
import { fetchTag } from "../lib/fetchTag";

export const getTag: Handler <
    {},
  "/t/:tag"
> = async (c) => {
    const { tag } = c.req.param();
    const data = await fetchTag(tag, "en");

    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tag}`}
        />
      );
}