import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${poppins.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
