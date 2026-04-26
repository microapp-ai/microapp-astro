/**
 * ToolRatings.tsx — Star ratings & reviews widget for tool pages
 *
 * Features:
 * - Shows aggregate star rating + count
 * - Shows recent reviews (up to 5)
 * - Logged-in users can submit/update their own rating + review
 * - Unauthenticated users see a "Sign in to rate" prompt that opens AuthModal
 *
 * Usage in [slug].astro:
 *   <ToolRatings slug={tool.slug} client:visible />
 */
import { useState, useEffect, useCallback } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";
import type { User } from "../lib/supabase-browser";

interface Rating {
  id: string;
  tool_slug: string;
  user_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

interface AggregateStats {
  average: number;
  count: number;
  distribution: Record<number, number>; // { 5: 10, 4: 3, ... }
}

interface ToolRatingsProps {
  slug: string;
}

// Star icon component
function Star({
  filled,
  half,
  size = 20,
  onClick,
  onMouseEnter,
  onMouseLeave,
  interactive,
}: {
  filled: boolean;
  half?: boolean;
  size?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  interactive?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : half ? "url(#half-fill)" : "none"}
      stroke={filled || half ? "#F59E0B" : "#D1D5DB"}
      strokeWidth="1.5"
      style={{
        cursor: interactive ? "pointer" : "default",
        transition: "transform 0.1s",
        flexShrink: 0,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {half && (
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarRating({
  value,
  max = 5,
  size = 20,
  interactive = false,
  onRate,
}: {
  value: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <Star
          key={star}
          size={size}
          filled={display >= star}
          half={!interactive && display >= star - 0.5 && display < star}
          interactive={interactive}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function getUserInitial(userId: string): string {
  // Use last 2 chars of UUID for a pseudo-initial
  return userId.slice(-2).toUpperCase();
}

export default function ToolRatings({ slug }: ToolRatingsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<AggregateStats>({ average: 0, count: 0, distribution: {} });
  const [myRating, setMyRating] = useState<Rating | null>(null);
  const [pendingRating, setPendingRating] = useState(0);
  const [pendingReview, setPendingReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingRatings, setLoadingRatings] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Auth state
  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Listen for auth changes from AuthModal
    const handleAuthChanged = () => {
      supabaseBrowser.auth.getSession().then(({ data }) => {
        setUser(data.session?.user ?? null);
      });
    };
    window.addEventListener("microapp:auth-changed", handleAuthChanged);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("microapp:auth-changed", handleAuthChanged);
    };
  }, []);

  // Load ratings for this tool
  const loadRatings = useCallback(async () => {
    setLoadingRatings(true);
    const { data, error } = await supabaseBrowser
      .from("tool_ratings")
      .select("*")
      .eq("tool_slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[ToolRatings] Error loading ratings:", error.message);
      setLoadingRatings(false);
      return;
    }

    const ratingsList = (data || []) as Rating[];
    setRatings(ratingsList);

    // Calculate aggregate stats
    if (ratingsList.length > 0) {
      const sum = ratingsList.reduce((acc, r) => acc + r.rating, 0);
      const avg = sum / ratingsList.length;
      const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      ratingsList.forEach((r) => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
      setStats({ average: avg, count: ratingsList.length, distribution: dist });
    } else {
      setStats({ average: 0, count: 0, distribution: {} });
    }

    setLoadingRatings(false);
  }, [slug]);

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  // Find current user's existing rating
  useEffect(() => {
    if (!user) {
      setMyRating(null);
      setPendingRating(0);
      setPendingReview("");
      return;
    }
    const existing = ratings.find((r) => r.user_id === user.id) || null;
    setMyRating(existing);
    if (existing) {
      setPendingRating(existing.rating);
      setPendingReview(existing.review_text || "");
    } else {
      setPendingRating(0);
      setPendingReview("");
    }
  }, [user, ratings]);

  const openAuthModal = (mode: "login" | "signup" = "login") => {
    window.dispatchEvent(
      new CustomEvent("microapp:open-auth", { detail: { mode } })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuthModal(); return; }
    if (pendingRating === 0) { setSubmitError("Please select a star rating."); return; }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload = {
      tool_slug: slug,
      user_id: user.id,
      rating: pendingRating,
      review_text: pendingReview.trim() || null,
    };

    let error;
    if (myRating) {
      // Update existing
      const result = await supabaseBrowser
        .from("tool_ratings")
        .update({ rating: payload.rating, review_text: payload.review_text })
        .eq("id", myRating.id);
      error = result.error;
    } else {
      // Insert new
      const result = await supabaseBrowser
        .from("tool_ratings")
        .insert(payload);
      error = result.error;
    }

    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitSuccess(true);
      await loadRatings();
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const handleDelete = async () => {
    if (!myRating || !user) return;
    setSubmitting(true);
    const { error } = await supabaseBrowser
      .from("tool_ratings")
      .delete()
      .eq("id", myRating.id);
    setSubmitting(false);
    if (!error) {
      setMyRating(null);
      setPendingRating(0);
      setPendingReview("");
      await loadRatings();
    }
  };

  const visibleReviews = showAllReviews
    ? ratings.filter((r) => r.review_text)
    : ratings.filter((r) => r.review_text).slice(0, 3);

  return (
    <section
      style={{
        fontFamily: "'Inter', sans-serif",
        marginTop: "2.5rem",
        paddingTop: "2rem",
        borderTop: "1.5px solid #E8E6DE",
      }}
      aria-labelledby="ratings-heading"
    >
      <h2
        id="ratings-heading"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "1.4rem",
          color: "#1A1A1A",
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
        }}
      >
        Ratings &amp; Reviews
      </h2>

      {/* Aggregate stats */}
      {!loadingRatings && stats.count > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.75rem",
            padding: "1.25rem",
            background: "#F9FAFB",
            borderRadius: "1rem",
            border: "1px solid #E5E7EB",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "3rem",
                color: "#1A1A1A",
                lineHeight: 1,
              }}
            >
              {stats.average.toFixed(1)}
            </div>
            <StarRating value={stats.average} size={18} />
            <div style={{ fontSize: "0.8125rem", color: "#6B7280", marginTop: "0.25rem" }}>
              {stats.count} {stats.count === 1 ? "rating" : "ratings"}
            </div>
          </div>

          {/* Distribution bars */}
          <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.distribution[star] || 0;
              const pct = stats.count > 0 ? (count / stats.count) * 100 : 0;
              return (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280", width: "0.75rem", textAlign: "right" }}>
                    {star}
                  </span>
                  <Star filled size={12} />
                  <div
                    style={{
                      flex: 1,
                      height: "6px",
                      background: "#E5E7EB",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "#F59E0B",
                        borderRadius: "3px",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#9CA3AF", width: "1.5rem" }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit / Edit rating form */}
      <div
        style={{
          background: "#F7FBF9",
          border: "1.5px solid #D1FAE5",
          borderRadius: "1rem",
          padding: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#1A1A1A",
            marginBottom: "0.875rem",
          }}
        >
          {myRating ? "Update your rating" : "Rate this tool"}
        </h3>

        {!user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
              Sign in to rate and review this tool.
            </p>
            <button
              onClick={() => openAuthModal("login")}
              style={{
                padding: "0.5rem 1.25rem",
                background: "#1B6B45",
                color: "white",
                border: "none",
                borderRadius: "0.625rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => openAuthModal("signup")}
              style={{
                padding: "0.5rem 1.25rem",
                background: "white",
                color: "#1B6B45",
                border: "1.5px solid #1B6B45",
                borderRadius: "0.625rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Sign up free
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {/* Star selector */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.375rem",
                }}
              >
                Your rating
              </label>
              <StarRating
                value={pendingRating}
                size={28}
                interactive
                onRate={setPendingRating}
              />
            </div>

            {/* Review text */}
            <div>
              <label
                htmlFor="review-text"
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.375rem",
                }}
              >
                Review <span style={{ fontWeight: 400, color: "#9CA3AF" }}>(optional)</span>
              </label>
              <textarea
                id="review-text"
                value={pendingReview}
                onChange={(e) => setPendingReview(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Share your experience with this tool…"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "0.625rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#1A1A1A",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "white",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1B6B45")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
              <div style={{ textAlign: "right", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.25rem" }}>
                {pendingReview.length}/500
              </div>
            </div>

            {submitError && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "0.625rem",
                  padding: "0.625rem 0.875rem",
                  fontSize: "0.875rem",
                  color: "#DC2626",
                }}
              >
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div
                style={{
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "0.625rem",
                  padding: "0.625rem 0.875rem",
                  fontSize: "0.875rem",
                  color: "#16A34A",
                }}
              >
                {myRating ? "Rating updated!" : "Rating submitted! Thank you."}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                type="submit"
                disabled={submitting || pendingRating === 0}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: submitting || pendingRating === 0 ? "#9CA3AF" : "#1B6B45",
                  color: "white",
                  border: "none",
                  borderRadius: "0.625rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: submitting || pendingRating === 0 ? "not-allowed" : "pointer",
                }}
              >
                {submitting ? "Saving…" : myRating ? "Update rating" : "Submit rating"}
              </button>

              {myRating && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={submitting}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "white",
                    color: "#DC2626",
                    border: "1.5px solid #FECACA",
                    borderRadius: "0.625rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  Remove rating
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Reviews list */}
      {loadingRatings ? (
        <div style={{ textAlign: "center", padding: "1.5rem", color: "#9CA3AF", fontSize: "0.875rem" }}>
          Loading reviews…
        </div>
      ) : ratings.filter((r) => r.review_text).length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "#9CA3AF", textAlign: "center", padding: "1rem 0" }}>
          No written reviews yet. Be the first!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {visibleReviews.map((r) => (
            <div
              key={r.id}
              style={{
                padding: "1rem 1.25rem",
                border: "1.5px solid #E8E6DE",
                borderRadius: "0.875rem",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.625rem",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "#E8F5EE",
                    color: "#1B6B45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    flexShrink: 0,
                  }}
                >
                  {getUserInitial(r.user_id)}
                </div>
                <div>
                  <StarRating value={r.rating} size={14} />
                  <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.125rem" }}>
                    {formatDate(r.created_at)}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#374151",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {r.review_text}
              </p>
            </div>
          ))}

          {ratings.filter((r) => r.review_text).length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              style={{
                background: "none",
                border: "1.5px solid #E5E7EB",
                borderRadius: "0.625rem",
                padding: "0.625rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#6B7280",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {showAllReviews
                ? "Show fewer reviews"
                : `Show all ${ratings.filter((r) => r.review_text).length} reviews`}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
