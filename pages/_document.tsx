import { Head, Html, Main, NextScript } from "next/document";

const themeInitScript = `(function(){try{var k='saya-theme',m=localStorage.getItem(k)||'dark';if(m!=='light')m='dark';document.documentElement.setAttribute('data-theme',m);document.documentElement.style.colorScheme=m==='light'?'light':'dark';}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}})();`;

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
