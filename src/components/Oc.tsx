import { DisplayOc } from "../interfaces/General";
import { Layout } from "./Layout";

interface OcProps {
    url: string;
    oc: DisplayOc;
}

export const Oc = ({ oc, url }: OcProps) => (
    <Layout url={url}>
        <title>{oc.name}</title>
        <meta name="description" content={oc.description} />
        <meta content={oc.color??'#00968f'} name="theme-color" />
        
        <meta property="og:title" content={oc.name} />
        <meta property="og:description" content={oc.description} />
        <meta property="og:image" content={oc.featuredImage} />
        <meta property="og:image:type" content="image/webp" />

        <meta name="twitter:title" content={oc.name} />
        <meta name="twitter:description" content={oc.description} />
        <meta name="twitter:image" content={oc.featuredImage} />
    </Layout>
);