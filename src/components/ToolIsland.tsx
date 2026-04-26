/**
 * ToolIsland.tsx — React island that loads the correct interactive tool widget
 *
 * HOW IT WORKS
 * ─────────────
 * 1. Vite's import.meta.glob() discovers every .tsx file under ./tools/ at
 *    build time and generates a separate chunk for each one. No manual registry.
 *
 * 2. File name → slug conversion: PascalCase filename is converted to kebab-case.
 *    e.g.  AgeCalculator.tsx  →  "age-calculator"
 *          BMICalculator.tsx  →  "bmi-calculator"
 *
 * 3. SLUG_ALIASES handles two cases:
 *    a) Legacy slugs that predate the naming convention (b-m-i-calculator → bmi-calculator)
 *    b) Convenience aliases (sort-lines → sort-lines-alphabetically)
 *    Add new aliases here; never change an existing URL.
 *
 * 4. ToolEngine-based tools (Tier 1) are handled by the toolEngineSlugSet —
 *    they use config-driven rendering and have no .tsx component file.
 *
 * TO ADD A NEW TOOL
 * ─────────────────
 *   1. Drop a MyNewTool.tsx file into src/components/tools/
 *   2. That's it. The slug "my-new-tool" is auto-discovered.
 *      No changes to this file required.
 */
import { lazy, Suspense } from "react";
import { getToolConfig } from "../lib/tool-registry";
import ToolEngine from "./ToolEngine";

interface Props {
  slug: string;
}

// ─── 1. Auto-discover all tool components via Vite glob ──────────────────────
// Each entry becomes a separate JS chunk (same code-splitting as the old manual map).
// The key is the relative path: "./tools/AgeCalculator.tsx"
const toolModules = import.meta.glob<{ default: React.ComponentType }>(
  "./tools/*.tsx"
);

// ─── 2. PascalCase filename → kebab-case slug ────────────────────────────────
function filenameToSlug(filename: string): string {
  // "./tools/AgeCalculator.tsx" → "AgeCalculator" → "age-calculator"
  const name = filename.replace("./tools/", "").replace(".tsx", "");
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

// Build slug → module-path map from glob results
const autoSlugMap: Record<string, string> = {};
for (const path of Object.keys(toolModules)) {
  autoSlugMap[filenameToSlug(path)] = path;
}

// ─── 3. Legacy slug aliases ───────────────────────────────────────────────────
// Maps an old/alternate slug to the canonical auto-generated slug.
// NEVER remove entries — existing URLs and Google's index depend on them.
const SLUG_ALIASES: Record<string, string> = {
  // Legacy slugs that predate the naming convention
  "b-m-i-calculator":       "bmi-calculator",
  "c-s-s-unit-converter":   "css-unit-converter",
  "m-d5-hash-generator":    "md5-hash-generator",
  "u-u-i-d-generator":      "uuid-generator",
  // Convenience aliases (both URLs should work)
  "percentage-calculator":  "percentage-calc",
  "remove-duplicate-lines": "duplicate-line-remover",
  "salary-to-hourly":       "salary-to-hourly-calculator",
  "sort-lines":             "sort-lines-alphabetically",
};

// Resolve a slug to its module path, following aliases
function resolveModulePath(slug: string): string | undefined {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return autoSlugMap[canonical];
}

// ─── 4. ToolEngine-based tools (Tier 1 — config-driven, no .tsx component) ──
const toolEngineSlugSet = new Set([
  "angle-converter",
  "area-converter",
  "data-storage-converter",
  "date-time-calculator",
  "energy-converter",
  "pressure-converter",
  "speed-converter",
  "volume-converter",
]);

// ─── Loading skeleton ─────────────────────────────────────────────────────────
const ToolLoadingFallback = () => (
  <div
    style={{
      background: "#F7F6F1",
      borderRadius: "1rem",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      border: "1.5px solid #E8E6DE",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "2rem",
          height: "2rem",
          border: "3px solid #E8E6DE",
          borderTopColor: "#1B6B45",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 0.75rem",
        }}
      />
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "#9CA3AF",
          margin: 0,
        }}
      >
        Loading tool...
      </p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── ToolEngine wrapper ───────────────────────────────────────────────────────
function ToolEngineIsland({ slug }: { slug: string }) {
  const config = getToolConfig(slug);
  if (!config) {
    return (
      <div style={{ padding: "1rem", color: "#92400E", background: "#FFF8F0", borderRadius: "0.75rem" }}>
        Tool configuration not found for: {slug}
      </div>
    );
  }
  return <ToolEngine config={config} />;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ToolIsland({ slug }: Props) {
  // Tier 1: config-driven ToolEngine tools
  if (toolEngineSlugSet.has(slug)) {
    return (
      <Suspense fallback={<ToolLoadingFallback />}>
        <ToolEngineIsland slug={slug} />
      </Suspense>
    );
  }

  // Tier 2 & 3: auto-discovered component files
  const modulePath = resolveModulePath(slug);

  if (!modulePath) {
    return (
      <div
        style={{
          background: "#FFF8F0",
          border: "1.5px solid #FFE4B5",
          borderRadius: "1rem",
          padding: "1.5rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "#92400E",
        }}
      >
        <strong>Tool widget not found for slug: {slug}</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          The tool content is available above. The interactive widget will be added soon.
        </p>
      </div>
    );
  }

  const ToolComponent = lazy(() =>
    toolModules[modulePath]().then((mod) => ({ default: mod.default }))
  );

  return (
    <Suspense fallback={<ToolLoadingFallback />}>
      <ToolComponent />
    </Suspense>
  );
}
