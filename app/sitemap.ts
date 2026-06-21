import { MetadataRoute } from "next";
import { quotes } from "./data/quotes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://losujwerset.pl";
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const categories = ["pokoj", "milosc", "nadzieja", "sila", "wiara", "wdziecznosc", "madrosc"];
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/temat/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const versePages = quotes.map((q) => ({
    url: `${baseUrl}/werset/${q.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...versePages];
}
