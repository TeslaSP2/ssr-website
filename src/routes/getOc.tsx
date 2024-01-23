import { Handler } from "hono";
import { Oc } from "../components/Oc";
import { fetchOc } from "../lib/fetchOc";

export const getOc: Handler <
    {},
  "/oc/:cat/:char"
> = async (c) => {
    const { cat, char } = c.req.param();
    const data = await fetchOc(char, "en");

    return c.html(
        <Oc
          oc={data}
          url={`/oc-bios/${cat}/${char}`}
        />
      );
}