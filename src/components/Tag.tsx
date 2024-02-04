import { DisplayTag } from "../interfaces/General";
import { Layout } from "./Layout";

interface TagProps {
    url: string;
    tag: DisplayTag;
}

export const Tag = ({ tag, url }: TagProps) => (
    <Layout url={url}>
        <title>{tag.name}</title>
        <meta content={tag.color??'#00968f'} name="theme-color" />

        <meta property="og:title" content={tag.name} />
        <meta property="og:image" content={tag.featuredImage} />
        <meta property="og:image:type" content="image/webp" />

        <meta name="twitter:title" content={tag.name} />
        <meta name="twitter:image" content={tag.featuredImage} />
    </Layout>
  );