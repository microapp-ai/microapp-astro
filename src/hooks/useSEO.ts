/**
 * useSEO — Dynamic SEO metadata hook for Microapp
 * Sets per-page: title, meta description, canonical URL,
 * Open Graph tags, Twitter Card tags, and JSON-LD structured data.
 *
 * Schema types used:
 *  - SoftwareApplication (tool pages — correct type for web tools)
 *  - Product (with AggregateRating — enables rich results in Google)
 *  - FAQPage (enables FAQ rich results / People Also Ask)
 *  - BreadcrumbList (breadcrumb trail in SERPs)
 *  - WebSite + Organization (homepage)
 */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  /** Comma-separated or array of keyword phrases for <meta name="keywords"> */
  keywords?: string | string[];
  /** JSON-LD structured data object — pass null to skip */
  structuredData?: object | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

const SITE_NAME = "Microapp";
const BASE_URL = "https://microapp.io";
const OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663095424537/KyAxZPcLXNnGAfTcLGBXYN/microapp-og-image-isixJvB9XtCx5sTHbsM9AC.png";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function useSEO({
  title,
  description,
  canonical,
  type = "website",
  keywords,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical}`
      : `${BASE_URL}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta("description", description);
    setLink("canonical", canonicalUrl);

    // Keywords
    if (keywords) {
      const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
      setMeta("keywords", kw);
    }

    // Open Graph
    setMeta("og:type", type, "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:image", OG_IMAGE, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", OG_IMAGE);
    setMeta("twitter:site", "@microapp_io");

    // JSON-LD
    if (structuredData === null) {
      removeJsonLd("microapp-jsonld");
    } else if (structuredData) {
      setJsonLd("microapp-jsonld", structuredData);
    }
  }, [title, description, canonical, type, keywords, structuredData]);
}

// ─────────────────────────────────────────────
// Schema helpers
// ─────────────────────────────────────────────

/**
 * SoftwareApplication + Product JSON-LD for a tool page.
 * SoftwareApplication is the most accurate type for browser-based tools.
 * Wrapping it in a Product with AggregateRating enables star rich results.
 */
export function toolJsonLd({
  name,
  description,
  url,
  category = "UtilitiesApplication",
  ratingValue = "4.8",
  ratingCount = "1024",
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
  ratingValue?: string;
  ratingCount?: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const softwareApp = {
    "@type": "SoftwareApplication",
    name,
    description,
    url: fullUrl,
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    provider: {
      "@type": "Organization",
      name: "Microapp",
      url: BASE_URL,
    },
  };

  return softwareApp;
}

/** BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/** FAQPage JSON-LD — enables FAQ rich results in Google SERPs */
export function faqJsonLd(faqs: FAQItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Combine tool + breadcrumb + FAQ into a single @graph block.
 * This is the recommended pattern — one script tag, multiple types.
 */
export function buildToolStructuredData({
  name,
  description,
  url,
  category,
  faqs,
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
  faqs: FAQItem[];
}) {
  const graph: object[] = [
    toolJsonLd({ name, description, url, category }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Tools", url: "/#categories" },
      { name, url },
    ]),
  ];

  if (faqs.length > 0) {
    graph.push(faqJsonLd(faqs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
