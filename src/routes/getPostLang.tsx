import { Handler } from "hono";
import { Post } from "../components/Post";
import { fetchPostLang } from "../lib/fetchPostLang";

export const getPostLang: Handler<
{},
"/post/:post/:lang"
> = async (c) => {
const { post, lang } = c.req.param();
const data = await fetchPostLang(post, lang);

return c.html(
    <Post
      post={data}
      url={data.externalLink != undefined ? data.externalLink : c.req.path}
    />
  );
}