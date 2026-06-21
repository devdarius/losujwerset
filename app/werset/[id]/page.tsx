import { quotes } from "../../data/quotes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import VerseClientPage from "./VerseClientPage";

export function generateStaticParams() {
  return quotes.map((q) => ({
    id: q.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quote = quotes.find((q) => q.id === parseInt(id, 10));
  if (!quote) return {};

  const cleanText = quote.text.length > 150 ? quote.text.substring(0, 147) + "..." : quote.text;
  
  return {
    title: `${quote.reference} – Werset z Pisma Świętego – LosujWerset.pl`,
    description: `Przeczytaj werset: „${cleanText}” z księgi ${quote.book}. Pobierz piękną grafikę z cytatem na Instagram lub podziel się Słowem Bożym.`,
    alternates: {
      canonical: `/werset/${quote.id}`,
    },
    openGraph: {
      title: `${quote.reference} – LosujWerset.pl`,
      description: `„${cleanText}” – Przeczytaj pełny fragment i stwórz estetyczną grafikę z cytatem.`,
      type: "article",
      locale: "pl_PL",
    }
  };
}

export default async function VersePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quoteId = parseInt(id, 10);
  const quote = quotes.find((q) => q.id === quoteId);
  
  if (!quote) {
    notFound();
  }

  // Get up to 4 other quotes from the same category for internal linking
  const relatedQuotes = quotes
    .filter((q) => q.category === quote.category && q.id !== quote.id)
    .slice(0, 4);

  return (
    <VerseClientPage 
      initialQuote={quote} 
      relatedQuotes={relatedQuotes}
    />
  );
}
