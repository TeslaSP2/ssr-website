import { Handler } from "hono";
import { Collection } from "../components/Collection";
import { fetchCollectionLang } from "../lib/fetchCollectionLang";

export const getCollectionLang: Handler <
    {},
  "/c/:collection/:lang"
> = async (c) => {
    const { collection, lang } = c.req.param();
    const data = await fetchCollectionLang(collection, lang);

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${collection}`}
        />
      );
}