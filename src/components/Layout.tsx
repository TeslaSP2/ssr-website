import { html } from "hono/html";

export interface LayoutProps {
  url: string;
  children: any;
}

export const Layout = ({ url, children }: LayoutProps) => {
  const removeLeadingSlash = url.substring(1);
  const redirectUrl = !url.startsWith("https://") ? (removeLeadingSlash.startsWith("https://")
    ? removeLeadingSlash
    : `https://teslasp2.com/${removeLeadingSlash}`) : url;
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="canonical" href="${url.substring(1)}" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta content="#00968f" name="theme-color" />
        <meta property="og:site_name" content="TeslaSP2" />
        <meta property="og:url" content="${redirectUrl}" />

        <meta name="twitter:url" content="${redirectUrl}" />
        <meta name="twitter:creator" content="TeslaSP2" />
        <meta name="twitter:card" content="summary_large_image" />

        ${children}
        <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
      </head>
    </html>
  `;
};
