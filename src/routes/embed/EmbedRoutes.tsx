import { Handler } from "hono";
import { isUUID } from "validator";

import { Post } from "../../components/Post";
import { Tag } from "../../components/Tag";
import { Collection } from "../../components/Collection";
import { Oc } from "../../components/Oc";

import { fetchPost, fetchTag, fetchCollection, fetchOc } from "../../lib/embed/EmbedFetch";

export const getCollectionEmbed: Handler <
    {},
  "/c/:collection"
> = async (c) => {
    const { collection } = c.req.param();
    const lang = c.req.query('lang');
    const data = await fetchCollection(collection, lang??"en");

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${collection}`}
        />
      );
}

export const getOcEmbed: Handler <
    {},
  "/oc/:cat/:char" | "/https://teslasp2.com/oc-bios/:cat/:char"
> = async (c) => {
    const { cat, char } = c.req.param();
    const lang = c.req.query('lang');
    const data = await fetchOc(char, lang??"en");

    return c.html(
        <Oc
          oc={data}
          url={`/oc-bios/${cat}/${char}`}
        />
      );
}

export const getPostEmbed: Handler<
  {},
  "/p/:post" | "/https://teslasp2.com/archive/post/:post"
> = async (c) => {
  const { post } = c.req.param();
  const lang = c.req.query('lang');
  const data = await fetchPost(post, lang??"en");

  return c.html(
    <Post
      post={data}
      url={data.externalLink != undefined ? data.externalLink : `/archive/post/${post}`}
    />
  );
}

export const getTagEmbed: Handler <
    {},
  "/t/:tag"
> = async (c) => {
    const { tag } = c.req.param();
    const lang = c.req.query('lang');
    const data = await fetchTag(tag, lang??"en");

    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tag}`}
        />
      );
}

export const getTagOrCollectionEmbed: Handler <
  {},
  "/archive/:tagCol"
> = async (c) => {
  const { tagCol } = c.req.param();
  const lang = c.req.query('lang');
  let isCollection = isUUID(tagCol, 4);
  if(isCollection)
  {
    const data = await fetchCollection(tagCol, lang??"en");

    return c.html(
        <Collection
          collection={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
  else
  {
    const data = await fetchTag(tagCol, lang??"en");
  
    return c.html(
        <Tag
          tag={data}
          url={`/archive/${tagCol}`}
        />
      );
  }
}