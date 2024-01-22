import { ArchivePost } from "../interfaces/General";
import { Layout } from "./Layout";

interface PostProps {
    url: string;
    post: ArchivePost;
}

export const Post = ({ post, url }: PostProps) => (
    <Layout url={url}>
        <title>{post.name}</title>
        <meta name="description" content={post.description} />

        <meta property="og:title" content={post.name} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.featuredImage} />

        <meta name="twitter:title" content={post.name} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.featuredImage} />
    </Layout>
  );
  