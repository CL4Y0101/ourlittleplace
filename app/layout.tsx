import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Geist } from "next/font/google";
import { PaperTransition, PaperLink } from "@/components/motion/PaperTransition";
import { site } from "@/lib/mock/site";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const handwriting = Caveat({ subsets: ["latin"], variable: "--font-handwriting", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: site.title,
  description: site.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${handwriting.variable}`}>
      <body>
        <PaperTransition>
          <a className="skip-link" href="#main">Skip to content</a>
          <header className="site-header">
            <PaperLink href="/" className="brand" aria-label="Our Little Place, home">our little place<span className="brand-mark">.</span></PaperLink>
            <nav className="site-nav" aria-label="Main navigation">
              <PaperLink href="/story">story</PaperLink>
              <PaperLink href="/gallery">gallery</PaperLink>
              <PaperLink href="/letters">letters</PaperLink>
            </nav>
          </header>
          {children}
          <footer className="site-footer"><span>our little place <span aria-hidden="true">✳</span></span><span>made to hold the small things</span><PaperLink href="/">back to the beginning ↑</PaperLink></footer>
        </PaperTransition>
      </body>
    </html>
  );
}
