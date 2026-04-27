/**
 * Shared TypeScript types for the Microapp Astro project
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTool {
  title: string;
  slug: string;
  emoji?: string;
}

export interface ToolMetadata {
  id?: number;
  slug: string;
  label: string;
  desc: string;
  category: string;
  categoryLabel: string;
  categoryHref: string;
  schemaCategory: string;
  emoji?: string | null;
  badge?: string | null;
  title: string;
  description: string;
  intro: string;
  howTo: string[];
  keywords: string[];
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
  tier: number;
  isActive: boolean;
  seoArticle?: string;
}
