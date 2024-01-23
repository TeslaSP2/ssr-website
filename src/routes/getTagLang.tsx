import { Handler } from "hono";
import { Tag } from "../components/Tag";
import { fetchTag } from "../lib/fetchTag";

export const getTagLang: Handler <
    {},
  "/t/:tag/:lang"
> = async (c) => {
    const { tag, lang } = c.req.param();
    const data = await fetchTag(tag, lang);

    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tag}`}
        />
      );
}