import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nanushi.org";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/community`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/missions`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/tutorials`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
