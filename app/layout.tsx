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
  metadataBase: new URL("https://losujwerset.pl"),
  title: "LosujWerset.pl | Losuj werset z Pisma Świętego",
  description: "Znajdź pocieszenie, siłę w trudnych chwilach, pokój w lęku, mądrość, miłość i nadzieję. Wylosuj fragment Słowa Bożego dopasowany do Twoich potrzeb i pobierz grafikę z cytatem.",
  keywords: [
    "Biblia", "Pismo Święte", "werset na dziś", "cytaty o nadziei", "wersety na pocieszenie",
    "siła w trudnych chwilach", "spokój w lęku cytaty", "mądrość życiowa biblia", "cytaty o miłości boga",
    "wsparcie duchowe cytaty", "motywacja z biblii", "wdzięczność wersety", "losowanie Biblii",
    "Słowo Boże na dziś", "losuj werset", "wylosuj cytat", "losujwerset.pl"
  ],
  authors: [{ name: "LosujWerset.pl" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LosujWerset.pl | Losuj werset z Pisma Świętego",
    description: "Wylosuj fragment Słowa Bożego dopasowany do Twoich potrzeb. Pobierz estetyczną grafikę z cytatem.",
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
