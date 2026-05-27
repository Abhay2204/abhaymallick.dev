/**
 * JsonLd.tsx — Structured Data for Abhay Mallick's Portfolio
 *
 * Injects multiple JSON-LD schemas that feed Google's Knowledge Graph:
 *  - Person: personal identity, social profiles
 *  - ProfessionalService / LocalBusiness: local SEO for Chandrapur, Maharashtra
 *  - WebSite: site metadata with SearchAction
 *  - BreadcrumbList: page hierarchy signal
 */

const BASE_URL = "https://abhaymallick.space";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Abhay Mallick",
  givenName: "Abhay",
  familyName: "Mallick",
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/profile.jpg`,
    width: 800,
    height: 800,
  },
  jobTitle: "Full Stack Developer",
  description:
    "Abhay Mallick is a Full Stack Developer and Computer Science Engineer from Chandrapur, Maharashtra, India. He specializes in React, Next.js, Node.js, Android development with Kotlin, and AI integrations. With 2+ years of experience and 50+ projects delivered, he builds CRMs, SaaS platforms, ecommerce sites, mobile apps, and enterprise software.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Android Development",
    "Kotlin",
    "Jetpack Compose",
    "AWS",
    "Docker",
    "UI/UX Design",
    "Figma",
    "AI Integration",
    "Full Stack Development",
    "CRM Development",
    "Mobile App Development",
    "Ecommerce Development",
    "SaaS Development",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "The Kiran Academy",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
    url: BASE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandrapur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  email: "abhaymallick.dev@gmail.com",
  telephone: "+918421822204",
  sameAs: [
    "https://github.com/Abhay2204",
    "https://www.linkedin.com/in/abhaymallick2002",
    "https://www.instagram.com/abhay_as_u_like_it/",
    BASE_URL,
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#service`,
  name: "Abhay Mallick — Full Stack Development Services",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  image: `${BASE_URL}/og-image.png`,
  description:
    "Full Stack Development services by Abhay Mallick from Chandrapur, Maharashtra. Expert in React, Next.js, Node.js, Android (Kotlin), and AI-powered web applications. Available for CRMs, ecommerce, SaaS, mobile apps, and enterprise software.",
  provider: {
    "@id": `${BASE_URL}/#person`,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "AdministrativeArea",
      name: "Maharashtra",
    },
    {
      "@type": "City",
      name: "Chandrapur",
    },
    {
      "@type": "Country",
      name: "Australia",
    },
    {
      "@type": "Country",
      name: "United States",
    },
  ],
  serviceType: [
    "Full Stack Development",
    "React Development",
    "Next.js Development",
    "Node.js Development",
    "Android App Development",
    "Mobile App Development",
    "CRM Development",
    "Ecommerce Development",
    "SaaS Development",
    "UI/UX Design",
    "AI Integration",
    "Enterprise Software Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandrapur",
    addressRegion: "Maharashtra",
    postalCode: "442401",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.9504,
    longitude: 79.2298,
  },
  telephone: "+918421822204",
  email: "abhaymallick.dev@gmail.com",
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  currenciesAccepted: "INR, USD, AUD",
  paymentAccepted: "Bank Transfer, PayPal, UPI",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Abhay Mallick — Full Stack Developer Portfolio",
  description:
    "Portfolio of Abhay Mallick, a Full Stack Developer from Chandrapur, Maharashtra specializing in React, Next.js, Node.js, and Android development.",
  author: {
    "@id": `${BASE_URL}/#person`,
  },
  publisher: {
    "@id": `${BASE_URL}/#person`,
  },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${BASE_URL}/#about`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: `${BASE_URL}/#projects`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${BASE_URL}/#contact`,
    },
  ],
};

// FAQ schema — answers common hiring queries which trigger FAQ rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Abhay Mallick offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhay Mallick offers full stack web development (React, Next.js, Node.js), Android mobile app development (Kotlin, Jetpack Compose), CRM development, ecommerce solutions, SaaS platforms, UI/UX design, and AI-powered application development.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Abhay Mallick located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhay Mallick is based in Chandrapur, Maharashtra, India, and works remotely with clients across India, Australia, and internationally.",
      },
    },
    {
      "@type": "Question",
      name: "How much experience does Abhay Mallick have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhay Mallick has 2+ years of professional experience as a Full Stack Developer, having completed 50+ projects ranging from enterprise CRMs to AI-powered mobile applications.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does Abhay Mallick specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhay Mallick specializes in React, Next.js, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, Android (Kotlin, Jetpack Compose), AWS, Docker, Figma, and AI/ML integrations using the Gemini API.",
      },
    },
    {
      "@type": "Question",
      name: "Is Abhay Mallick available for freelance projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Abhay Mallick is currently available for freelance projects. You can reach him at abhaymallick.dev@gmail.com or call +91 84218 22204.",
      },
    },
  ],
};

export default function JsonLd() {
  const schemas = [
    personSchema,
    professionalServiceSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}
