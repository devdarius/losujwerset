import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LosujWerset.pl | Losuj werset z Pisma Świętego",
  description: "Losuj werset z Pisma Świętego w dowolnej kategorii. Wylosuj fragment Słowa Bożego na dziś i pobieraj estetyczne grafiki do udostępnienia.",
  keywords: ["Biblia", "Pismo Święte", "werset", "cytat dnia", "losowanie Biblii", "Nowa Biblia Gdańska", "Słowo Boże", "losuj werset", "wylosuj cytat", "losujwerset.pl"],
  authors: [{ name: "LosujWerset.pl" }],
  openGraph: {
    title: "LosujWerset.pl | Losuj werset z Pisma Świętego",
    description: "Wylosuj fragment Słowa Bożego na dziś. Pobieraj estetyczne grafiki z wersetami.",
    type: "website",
    locale: "pl_PL",
  }
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body>
        {children}
        {/* Google tag (gtag.js) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-PN8VB1QWM2" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PN8VB1QWM2');
          `}
        </Script>
      </body>
    </html>
  );
}
