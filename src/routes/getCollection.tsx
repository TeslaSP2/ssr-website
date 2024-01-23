import { Handler } from "hono";
import { Collection } from "../components/Collection";
import { fetchCollectionLang } from "../lib/fetchCollectionLang";

export const getCollection: Handler <
    {},
  "/c/:collection"
> = async (c) => {
    const { collection } = c.req.param();
    const data = await fetchCollectionLang(collection, "en");

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${collection}`}
        />
      );
}