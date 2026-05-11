import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

/** Tanpa next/font/google: unduhan font ke Google sering macet di jaringan terbatas dan membuat dev terasa tidak pernah selesai. */
const themeInitScript = `(function(){try{var k='saya-theme',m=localStorage.getItem(k)||'dark';if(m!=='light')m='dark';document.documentElement.setAttribute('data-theme',m);document.documentElement.style.colorScheme=m==='light'?'light':'dark';}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}})();`;

export const metadata: Metadata = {
  title: "SA'YA Umroh OS",
  description: "Operating system for SA'YA Umroh travel management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
