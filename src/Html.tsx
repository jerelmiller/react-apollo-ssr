import { ReactNode } from 'react';

interface HtmlProps {
  assets: Record<string, string>;
  children: ReactNode;
  title?: string;
}

const Html = ({ assets, children, title }: HtmlProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href={assets['main.css']} />
        <title>{title ?? 'React Apollo SSR'}</title>
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
      </body>
    </html>
  );
};

export default Html;
