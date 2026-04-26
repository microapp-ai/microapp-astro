/**
 * useTrack — lightweight Umami analytics event tracker
 *
 * Umami is loaded via the <script> tag in index.html and exposes
 * window.umami.track() for custom events. This hook wraps it safely
 * so calls are silently ignored when Umami is not yet loaded (e.g.,
 * during local development without the env vars set).
 *
 * Usage:
 *   const track = useTrack();
 *   track("tool_used", { slug: "/word-counter", tool: "Word Counter" });
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function useTrack() {
  return function track(eventName: string, data?: Record<string, unknown>) {
    try {
      if (typeof window !== "undefined" && window.umami?.track) {
        window.umami.track(eventName, data);
      }
    } catch {
      // Silently ignore — analytics must never break the UI
    }
  };
}
