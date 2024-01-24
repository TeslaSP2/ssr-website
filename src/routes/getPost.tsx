import { Handler } from "hono";
import { Post } from "../components/Post";
import { fetchPost } from "../lib/fetchPost";

export const getPost: Handler<
  {},
  "/p/:post" | "/https://teslasp2.com/archive/post/:post"
> = async (c) => {
  const { post } = c.req.param();
  const data = await fetchPost(post);

  return c.html(
    <Post
      post={data}
      url={data.externalLink != undefined ? data.externalLink : `/archive/post/${post}`}
    />
  );
}