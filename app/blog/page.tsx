import BlogClient from '@/components/BlogClient';

interface Article {
  source?: { id: string | null; name: string };
  author?: string | null;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string;
}


export const metadata = {
  title: 'Daily Tech Radar & AI News Feed | Abhay Mallick',
  description: 'Stay updated with the latest trends in technology, artificial intelligence, SpaceX, and programming. Curated daily by Abhay Mallick.',
  keywords: [
    'Abhay Mallick',
    'Abhay Mallick developer',
    'Abhay Mallick freelancer',
    'Abhay Mallick Chandrapur',
    'Tech news',
    'AI news',
    'SpaceX news',
    'Programming blog',
  ],
};

const FALLBACK_ARTICLES = [
  {
    source: { id: "tech-radar", name: "System Radar" },
    author: "Abhay Mallick",
    title: "Large Language Models & Agentic Coding Ecosystems in 2026",
    description: "An in-depth analysis of high-end developer agents, self-correcting terminal loops, and runtime compilers that are reshaping professional software engineering workflows.",
    url: "https://github.com/Abhay2204",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: ""
  },
  {
    source: { id: "aerospace-intel", name: "Aerospace Intel" },
    author: "Space Exploration Group",
    title: "Starship Flight Test Updates and Planetary Logistics Pipelines",
    description: "Exploring the engineering milestones behind recent orbital rocket recoveries, methane fuel-transfer systems, and multi-planetary hardware architectures.",
    url: "https://github.com/Abhay2204",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: ""
  },
  {
    source: { id: "frontend-weekly", name: "Frontend Weekly" },
    author: "Design Systems Team",
    title: "Next.js 16 and Hardware-Accelerated CSS Rendering Pipelines",
    description: "How modern web application bundles leverage Server Actions, dynamic static-page caches, and GPU-composited canvas animations to deliver premium visual layouts.",
    url: "https://github.com/Abhay2204",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: ""
  }
];

async function getNewsData() {
  const apiKey = 'c1de158ea87a47178d9a14ecf7ce7248';
  // Query tech, SpaceX, AI, programming news
  const url = `https://newsapi.org/v2/everything?q=technology+OR+SpaceX+OR+AI+OR+programming&sortBy=publishedAt&language=en&pageSize=30&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 } // Revalidate cache every 24 hours (86400 seconds)
    });

    if (!res.ok) {
      console.error('NewsAPI responded with an error:', res.statusText);
      return FALLBACK_ARTICLES;
    }

    const data = await res.json();
    if (data.status === 'ok' && data.articles && data.articles.length > 0) {
      // Filter out duplicate or broken articles
      return data.articles.filter((art: Article) => art.title && art.title !== '[Removed]');
    }

    return FALLBACK_ARTICLES;
  } catch (error) {
    console.error('Failed to fetch news from NewsAPI:', error);
    return FALLBACK_ARTICLES;
  }
}

export default async function BlogPage() {
  const articles = await getNewsData();
  
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.abhaymallick.space/blog",
    "name": "Daily Tech Radar & AI News Feed | Abhay Mallick",
    "description": "Stay updated with the latest trends in technology, artificial intelligence, SpaceX, and programming. Curated daily by Abhay Mallick.",
    "url": "https://www.abhaymallick.space/blog",
    "publisher": {
      "@type": "Person",
      "name": "Abhay Mallick",
      "url": "https://www.abhaymallick.space"
    },
    "blogPost": articles.map((art: Article, index: number) => ({
      "@type": "BlogPosting",
      "@id": `https://www.abhaymallick.space/blog#post-${index}`,
      "headline": art.title,
      "description": art.description,
      "datePublished": art.publishedAt,
      "url": art.url,
      "image": art.urlToImage || "https://www.abhaymallick.space/og-image.png",
      "author": {
        "@type": "Person",
        "name": art.author || "Tech Radar Feed",
        "url": "https://www.abhaymallick.space"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient initialArticles={articles} />
    </>
  );
}
