/**
 * NavAuthIsland.tsx — Auth state buttons for HomeNav
 *
 * Renders in the nav bar:
 * - When logged out: "Log in" + "Sign up" buttons that trigger AuthModal
 * - When logged in: User avatar (initials) + dropdown with email + "Log out"
 *
 * Usage in HomeNav.astro:
 *   <NavAuthIsland client:load />
 */
import { useState, useEffect, useRef } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";
import type { User } from "../lib/supabase-browser";

interface Props {
  loginLabel?: string;
  signupLabel?: string;
  logoutLabel?: string;
  myAccountLabel?: string;
}

export default function NavAuthIsland({
  loginLabel = "Log in",
  signupLabel = "Sign up",
  logoutLabel = "Log out",
  myAccountLabel = "My account",
}: Props = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get initial session
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const openAuth = (mode: "login" | "signup") => {
    window.dispatchEvent(
      new CustomEvent("microapp:open-auth", { detail: { mode } })
    );
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await supabaseBrowser.auth.signOut();
    window.dispatchEvent(new CustomEvent("microapp:auth-changed"));
  };

  const getUserInitials = (user: User): string => {
    const email = user.email || "";
    const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
    if (name) {
      const parts = name.trim().split(" ");
      return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getUserEmail = (user: User): string => {
    return user.email || "User";
  };

  // Loading state — render nothing to avoid layout shift
  if (loading) {
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <div style={{ width: "72px", height: "36px", background: "#F3F4F6", borderRadius: "2rem" }} />
        <div style={{ width: "88px", height: "36px", background: "#E8F5EE", borderRadius: "2rem" }} />
      </div>
    );
  }

  // Logged in — show avatar + dropdown
  if (user) {
    return (
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "1.5px solid #E5E7EB",
            borderRadius: "2rem",
            padding: "0.375rem 0.75rem 0.375rem 0.375rem",
            cursor: "pointer",
            transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1B6B45";
            (e.currentTarget as HTMLButtonElement).style.background = "#F7FBF9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB";
            (e.currentTarget as HTMLButtonElement).style.background = "none";
          }}
          aria-label="Account menu"
          aria-expanded={dropdownOpen}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "50%",
              background: "#1B6B45",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.6875rem",
              flexShrink: 0,
            }}
          >
            {getUserInitials(user)}
          </div>
          {/* Chevron */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              right: 0,
              background: "white",
              border: "1.5px solid #E5E7EB",
              borderRadius: "0.875rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              minWidth: "200px",
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            {/* User info */}
            <div
              style={{
                padding: "0.875rem 1rem",
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "#1A1A1A",
                  marginBottom: "0.125rem",
                }}
              >
                {myAccountLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#6B7280",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {getUserEmail(user)}
              </div>
            </div>

            {/* Menu items */}
            <div style={{ padding: "0.375rem" }}>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  background: "none",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#374151",
                  textAlign: "left",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2";
                  (e.currentTarget as HTMLButtonElement).style.color = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                  (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                {logoutLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged out — show Login + Sign up buttons
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <button
        onClick={() => openAuth("login")}
        style={{
          padding: "0.5rem 1rem",
          background: "none",
          border: "1.5px solid #E5E7EB",
          borderRadius: "2rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.875rem",
          color: "#374151",
          cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#1B6B45";
          (e.currentTarget as HTMLButtonElement).style.color = "#1B6B45";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB";
          (e.currentTarget as HTMLButtonElement).style.color = "#374151";
        }}
      >
        {loginLabel}
      </button>
      <button
        onClick={() => openAuth("signup")}
        style={{
          padding: "0.5rem 1.125rem",
          background: "#1B6B45",
          border: "none",
          borderRadius: "2rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: "0.875rem",
          color: "white",
          cursor: "pointer",
          transition: "background 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#155538";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#1B6B45";
        }}
      >
        {signupLabel}
      </button>
    </div>
  );
}
