import { Handler } from "hono";
import { Post } from "../components/Post";
import { fetchPostLang } from "../lib/fetchPostLang";

export const getPost: Handler<
  {},
  "/p/:post"
> = async (c) => {
  const { post } = c.req.param();
  const data = await fetchPostLang(post, "en");

  return c.html(
    <Post
      post={data}
      url={data.externalLink != undefined ? data.externalLink : `/archive/post/${post}`}
    />
  );
}