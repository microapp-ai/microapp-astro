/**
 * AuthModal.tsx — Supabase Auth modal overlay
 *
 * Supports:
 * - Sign up (email + password + confirm password)
 * - Log in (email + password)
 * - Forgot password (sends reset email via Supabase)
 *
 * Usage:
 *   <AuthModal client:load />
 *
 * Triggering:
 *   window.dispatchEvent(new CustomEvent('microapp:open-auth', { detail: { mode: 'login' } }))
 *   window.dispatchEvent(new CustomEvent('microapp:open-auth', { detail: { mode: 'signup' } }))
 */
import { useState, useEffect, useCallback } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";

type AuthMode = "login" | "signup" | "forgot";

interface AuthModalProps {
  initialMode?: AuthMode;
}

export default function AuthModal({ initialMode = "login" }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Listen for custom events to open the modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMode(detail?.mode || "login");
      setError(null);
      setSuccess(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

    window.addEventListener("microapp:open-auth", handleOpen);
    window.addEventListener("microapp:close-auth", handleClose);

    return () => {
      window.removeEventListener("microapp:open-auth", handleOpen);
      window.removeEventListener("microapp:close-auth", handleClose);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Logged in successfully!");
      setTimeout(() => {
        setIsOpen(false);
        // Notify the rest of the app
        window.dispatchEvent(new CustomEvent("microapp:auth-changed"));
      }, 800);
    }
  }, [email, password]);

  const handleSignup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabaseBrowser.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Account created! Check your email to confirm your address, then log in."
      );
    }
  }, [email, password, confirmPassword]);

  const handleForgotPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/` }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password reset email sent! Check your inbox.");
    }
  }, [email]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
    setPassword("");
    setConfirmPassword("");
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "1.25rem",
          padding: "2rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            color: "#6B7280",
            fontSize: "1.25rem",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <picture>
            <source srcSet="/images/microapp-logo-optimized.webp" type="image/webp" />
            <img
              src="/images/microapp-logo-optimized.png"
              alt="Microapp"
              width="140"
              height="33"
              style={{ height: "28px", width: "auto", margin: "0 auto" }}
            />
          </picture>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#1A1A1A",
            textAlign: "center",
            marginBottom: "0.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          {mode === "login" && "Welcome back"}
          {mode === "signup" && "Create your account"}
          {mode === "forgot" && "Reset your password"}
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "#6B7280",
            textAlign: "center",
            marginBottom: "1.75rem",
          }}
        >
          {mode === "login" && "Sign in to rate and review tools"}
          {mode === "signup" && "Free forever. No credit card required."}
          {mode === "forgot" && "We'll send you a reset link"}
        </p>

        {/* Error / Success messages */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "#DC2626",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "#16A34A",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={
            mode === "login"
              ? handleLogin
              : mode === "signup"
              ? handleSignup
              : handleForgotPassword
          }
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="auth-email"
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.375rem",
              }}
            >
              Email address
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.625rem 0.875rem",
                border: "1.5px solid #E5E7EB",
                borderRadius: "0.625rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9375rem",
                color: "#1A1A1A",
                outline: "none",
                transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1B6B45")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          {/* Password (not shown for forgot) */}
          {mode !== "forgot" && (
            <div>
              <label
                htmlFor="auth-password"
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.375rem",
                }}
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "0.625rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "#1A1A1A",
                  outline: "none",
                  transition: "border-color 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1B6B45")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
          )}

          {/* Confirm Password (signup only) */}
          {mode === "signup" && (
            <div>
              <label
                htmlFor="auth-confirm-password"
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.375rem",
                }}
              >
                Confirm password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat your password"
                autoComplete="new-password"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "0.625rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "#1A1A1A",
                  outline: "none",
                  transition: "border-color 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1B6B45")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
          )}

          {/* Forgot password link (login mode) */}
          {mode === "login" && (
            <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#1B6B45",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: loading ? "#9CA3AF" : "#1B6B45",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s",
              marginTop: "0.25rem",
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "1rem",
                    height: "1rem",
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                {mode === "login" ? "Signing in…" : mode === "signup" ? "Creating account…" : "Sending…"}
              </span>
            ) : (
              <>
                {mode === "login" && "Sign in"}
                {mode === "signup" && "Create account"}
                {mode === "forgot" && "Send reset email"}
              </>
            )}
          </button>
        </form>

        {/* Mode switcher */}
        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "#6B7280",
          }}
        >
          {mode === "login" && (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#1B6B45",
                  fontWeight: 700,
                  padding: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Sign up free
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#1B6B45",
                  fontWeight: 700,
                  padding: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Sign in
              </button>
            </>
          )}
          {mode === "forgot" && (
            <button
              type="button"
              onClick={() => switchMode("login")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1B6B45",
                fontWeight: 700,
                padding: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
              }}
            >
              ← Back to sign in
            </button>
          )}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
