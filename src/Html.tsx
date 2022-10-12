interface HtmlProps {
  assets: Record<string, string>;
  content: string;
  title?: string;
  initialState?: Record<string, any>;
}

const Html = ({ assets, content, title, initialState = {} }: HtmlProps) => {
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
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.assetManifest = ${JSON.stringify(assets)};
window.__APOLLO_STATE__ = ${JSON.stringify(initialState).replace(
              /</g,
              '\\u003c'
            )};
`.trim(),
          }}
        />
        <script type="text/javascript" src={assets['main.js']} />
      </body>
    </html>
  );
};

export default Html;
