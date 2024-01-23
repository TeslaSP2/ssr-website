import { Handler } from "hono";
import { Oc } from "../components/Oc";
import { fetchOc } from "../lib/fetchOc";

export const getOcLang: Handler <
    {},
  "/oc/:cat/:char/:lang"
> = async (c) => {
    const { cat, char, lang } = c.req.param();
    const data = await fetchOc(char, lang);

    return c.html(
        <Oc
          oc={data}
          url={`/oc-bios/${cat}/${char}`}
        />
      );
}