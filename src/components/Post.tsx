import { DisplayPost } from "../interfaces/General";
import { Layout } from "./Layout";

interface PostProps {
    url: string;
    post: DisplayPost;
}

export const Post = ({ post, url }: PostProps) => (
    <Layout url={'/archive'+url}>
        <title>{post.name}</title>
        <meta name="description" content={post.description} />

        <meta property="og:title" content={post.name} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content={post.altFeaturedImage} />

        <meta name="twitter:title" content={post.name} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.featuredImage} />
    </Layout>
  );
  