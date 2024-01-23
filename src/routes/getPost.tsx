import { Handler } from "hono";
import { Post } from "../components/Post";
import { fetchPost } from "../lib/fetchPost";

export const getPost: Handler<
    {},
    "/post/:post"
> = async (c) => {
    const { post } = c.req.param();
    const data = await fetchPost(post);

    return c.html(
        <Post
          post={data}
          url={data.externalLink != undefined ? data.externalLink : c.req.path}
        />
      );
}