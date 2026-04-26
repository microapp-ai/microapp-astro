/*
 * MICROAPP AdUnit — Google AdSense display ad component
 * Publisher: ca-pub-4016939081639634
 *
 * Ad-blocker detection strategy (reliable DOM bait-element approach):
 *   1. Inject a hidden 1×1 px <div> with class names that ad blockers
 *      typically target ("adsbox", "ad-placement", etc.).
 *   2. If the element's offsetHeight is 0 after a short delay, an ad blocker
 *      has hidden it — we show the fallback immediately without ever pushing.
 *   3. If no blocker is detected, push the slot and wait 1.8 s for AdSense
 *      to inject content. If the <ins> height is still 0, show the fallback.
 *   4. All timeouts are cleared on unmount to prevent setState-after-unmount.
 *   5. A React ErrorBoundary wraps the whole component so any unexpected
 *      runtime error from the AdSense script is caught gracefully.
 */
import {
  useEffect,
  useRef,
  useState,
  Component,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

// ─── Bait-element ad-block detection ─────────────────────────────────────────

/**
 * Injects a hidden bait element into <body>, waits one animation frame, then
 * checks if an ad blocker has zeroed its height.  Cleans up after itself.
 * Returns true if an ad blocker is active.
 */
function detectAdBlock(): Promise<boolean> {
  return new Promise((resolve) => {
    const bait = document.createElement("div");
    // Class names that uBlock Origin, AdBlock Plus, etc. target
    bait.className = "adsbox ad-placement pub_300x250 pub_300x250m pub_728x90";
    bait.style.cssText =
      "position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(bait);

    // Give the browser one frame to apply ad-blocker CSS rules
    requestAnimationFrame(() => {
      const blocked = bait.offsetHeight === 0;
      bait.remove();
      resolve(blocked);
    });
  });
}

// ─── Fallback banner ──────────────────────────────────────────────────────────

function AdFallback({ minHeight }: { minHeight: number }) {
  return (
    <div
      role="complementary"
      aria-label="Support Microapp"
      style={{
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 16px",
        background: "linear-gradient(135deg, #F0FAF5 0%, #F5F3EE 100%)",
        border: "1px dashed #C8E6D4",
        borderRadius: 12,
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: 20 }}>🌿</span>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 600,
          color: "#1B6B45",
          lineHeight: 1.4,
        }}
      >
        Ads help keep Microapp free
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "#6B7280",
          lineHeight: 1.4,
          maxWidth: 260,
        }}
      >
        It looks like an ad blocker is active. Consider allowing ads on this
        site to support free tools for everyone.
      </p>
    </div>
  );
}

// ─── Error boundary ───────────────────────────────────────────────────────────

interface EBState {
  hasError: boolean;
}

class AdErrorBoundary extends Component<
  { children: ReactNode; minHeight: number },
  EBState
> {
  constructor(props: { children: ReactNode; minHeight: number }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <AdFallback minHeight={this.props.minHeight} />;
    }
    return this.props.children;
  }
}

// ─── AdUnit core ──────────────────────────────────────────────────────────────

function AdUnitCore({
  slot,
  format = "auto",
  className = "",
  style,
}: AdUnitProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const insRef      = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const mountedRef  = useRef(true);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [blocked, setBlocked] = useState<boolean | null>(null);

  const minHeight =
    typeof style?.minHeight === "number"
      ? style.minHeight
      : typeof style?.minHeight === "string"
      ? parseInt(style.minHeight, 10) || 90
      : 90;

  useEffect(() => {
    mountedRef.current = true;

    const safeSetBlocked = (val: boolean) => {
      if (mountedRef.current) setBlocked(val);
    };

    const run = async () => {
      if (initialized.current) return;

      const wrapper = wrapperRef.current;
      if (!wrapper || wrapper.offsetWidth === 0) return;

      initialized.current = true;

      // Step 1: bait-element detection (fast, synchronous after one rAF)
      const isBlocked = await detectAdBlock();
      if (!mountedRef.current) return;

      if (isBlocked) {
        safeSetBlocked(true);
        return;
      }

      // Step 2: push the slot
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        safeSetBlocked(true);
        return;
      }

      // Step 3: check height after AdSense has had time to inject content
      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        const ins = insRef.current;
        const height = ins?.offsetHeight ?? 0;
        safeSetBlocked(height === 0);
      }, 1800);
    };

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (wrapper.offsetWidth > 0) {
      void run();
    } else if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        if (wrapper.offsetWidth > 0) {
          ro.disconnect();
          void run();
        }
      });
      ro.observe(wrapper);
      return () => {
        ro.disconnect();
        mountedRef.current = false;
        if (timerRef.current !== null) clearTimeout(timerRef.current);
      };
    }

    return () => {
      mountedRef.current = false;
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`adsense-wrapper ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {blocked === true ? (
        <AdFallback minHeight={minHeight} />
      ) : (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-4016939081639634"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

// ─── Public export (wrapped in error boundary) ────────────────────────────────

export default function AdUnit(props: AdUnitProps) {
  const minHeight =
    typeof props.style?.minHeight === "number"
      ? props.style.minHeight
      : typeof props.style?.minHeight === "string"
      ? parseInt(props.style.minHeight, 10) || 90
      : 90;

  return (
    <AdErrorBoundary minHeight={minHeight}>
      <AdUnitCore {...props} />
    </AdErrorBoundary>
  );
}

// ─── Named slot presets ───────────────────────────────────────────────────────

/**
 * Horizontal leaderboard ad — best for between sections on homepage.
 * Typical size: 728×90 (desktop), responsive on mobile.
 */
export function AdLeaderboard({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      slot="1234567890"
      format="horizontal"
      className={className}
      style={{ minHeight: 90, background: "transparent" }}
    />
  );
}

/**
 * In-article / in-content ad — best placed inside tool pages
 * between the tool header and the tool UI.
 */
export function AdInArticle({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      slot="0987654321"
      format="auto"
      className={className}
      style={{ minHeight: 280, margin: "1.5rem 0" }}
    />
  );
}

/**
 * Rectangle / sidebar ad — best for right-column or below-tool placement.
 * Typical size: 300×250 or 336×280.
 */
export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      slot="1122334455"
      format="rectangle"
      className={className}
      style={{ minHeight: 250, maxWidth: "336px", margin: "0 auto" }}
    />
  );
}
