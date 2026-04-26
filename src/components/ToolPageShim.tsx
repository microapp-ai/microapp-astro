/**
 * ToolPageShim.tsx — Shim for ToolEngine in the Astro island context
 * 
 * In the Astro architecture, ToolEngine is used as a React island.
 * The layout, SEO, breadcrumbs, FAQs, etc. are all handled by ToolLayout.astro.
 * This shim replaces the original ToolPage wrapper so ToolEngine just renders
 * its interactive widget content without any layout wrapping.
 */
import type { ReactNode } from "react";

interface ToolPageShimProps {
  title?: string;
  description?: string;
  intro?: string;
  howTo?: string[];
  category?: string;
  categoryHref?: string;
  badge?: string;
  slug?: string;
  schemaCategory?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: Array<{ title: string; slug: string; emoji?: string }>;
  keywords?: string[];
  children: ReactNode;
}

export default function ToolPageShim({ children }: ToolPageShimProps) {
  // In Astro island mode, we only render the children (the interactive widget)
  // Everything else (layout, SEO, breadcrumbs, FAQs) is handled by ToolLayout.astro
  return (
    <div className="tool-widget-content">
      {children}
    </div>
  );
}
