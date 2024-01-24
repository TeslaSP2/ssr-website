import { Handler } from "hono";
import { isUUID } from 'validator';

import { Tag } from "../components/Tag";
import { Collection } from "../components/Collection";

import { fetchTag } from "../lib/fetchTag";
import { fetchCollection } from "../lib/fetchCollection";

export const getTagOrCollectionLang: Handler <
  {},
  "/archive/:tagCol/:lang"
> = async (c) => {
  const { tagCol, lang } = c.req.param();
  let isCollection = isUUID(tagCol, 4);
  if(isCollection)
  {
    const data = await fetchCollection(tagCol, lang);

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
  else
  {
    const data = await fetchTag(tagCol, lang);
  
    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
}