import { Handler } from "hono";
import { Collection } from "../components/Collection";
import { fetchCollection } from "../lib/fetchCollection";

export const getCollectionLang: Handler <
    {},
  "/c/:collection/:lang"
> = async (c) => {
    const { collection, lang } = c.req.param();
    const data = await fetchCollection(collection, lang);

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${collection}`}
        />
      );
}