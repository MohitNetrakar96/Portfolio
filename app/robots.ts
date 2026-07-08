// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mohitnetrakar.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Disallow crawling backend API endpoints
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
