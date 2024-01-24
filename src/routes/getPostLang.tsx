import { Handler } from "hono";
import { Post } from "../components/Post";
import { fetchPost } from "../lib/fetchPost";

export const getPostLang: Handler<
  {},
  "/p/:post/:lang" | "/https://teslasp2.com/archive/post/:post/:lang"
> = async (c) => {
  const { post, lang } = c.req.param();
  const data = await fetchPost(post, lang);

  return c.html(
    <Post
      post={data}
      url={data.externalLink != undefined ? data.externalLink : `/archive/post/${post}`}
    />
  );
}