import { Handler } from "hono";
import { Collection } from "../components/Collection";
import { fetchCollection } from "../lib/fetchCollection";

export const getCollection: Handler <
    {},
  "/c/:collection"
> = async (c) => {
    const { collection } = c.req.param();
    const data = await fetchCollection(collection);

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${collection}`}
        />
      );
}