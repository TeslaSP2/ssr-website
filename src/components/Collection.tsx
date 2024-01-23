import { DisplayCollection } from "../interfaces/General";
import { Layout } from "./Layout";

interface CollectionProps {
    url: string;
    collection: DisplayCollection;
}

export const Collection = ({ collection, url }: CollectionProps) => (
    <Layout url={url}>
        <title>{collection.name}</title>
        
        <meta property="og:title" content={collection.name} />
        <meta property="og:image" content={collection.featuredImage} />
        <meta property="og:image:type" content="image/webp" />

        <meta name="twitter:title" content={collection.name} />
        <meta name="twitter:image" content={collection.featuredImage} />
    </Layout>
);