import { Handler } from "hono";
import { isUUID } from 'validator';

import { Tag } from "../components/Tag";
import { Collection } from "../components/Collection";

import { fetchTag } from "../lib/fetchTag";
import { fetchCollection } from "../lib/fetchCollection";

export const getTagOrCollection: Handler <
  {},
  "/archive/:tagCol"
> = async (c) => {
  const { tagCol } = c.req.param();
  let isCollection = isUUID(tagCol, 4);
  if(isCollection)
  {
    const data = await fetchCollection(tagCol);

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
  else
  {
    const data = await fetchTag(tagCol);
  
    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
}