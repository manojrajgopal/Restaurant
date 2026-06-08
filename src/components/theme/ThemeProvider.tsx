"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  /** The currently applied theme. */
  theme: Theme;
  /** True when the user has an explicit stored preference (not system). */
  hasStoredPreference: boolean;
  /** Set a specific theme, animating from an optional origin point. */
  setTheme: (next: Theme, origin?: { x: number; y: number }) => void;
  /** Flip between light & dark, animating from an optional origin point. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    // The inline FOUC script has already resolved & applied a theme.
    const applied = document.documentElement.dataset.theme as Theme | undefined;
    if (applied === "light" || applied === "dark") return applied;
  }
  // Dark is the default when no explicit choice exists.
  return "dark";
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [hasStoredPreference, setHasStoredPreference] = useState(false);
  const animTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync React state with whatever the FOUC script applied.
  useEffect(() => {
    setThemeState(readInitialTheme());
    try {
      setHasStoredPreference(Boolean(localStorage.getItem(STORAGE_KEY)));
    } catch {
      /* ignore */
    }
  }, []);

  const commitTheme = useCallback((next: Theme) => {
    applyThemeToDOM(next);
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setHasStoredPreference(true);
  }, []);

  const setTheme = useCallback(
    (next: Theme, origin?: { x: number; y: number }) => {
      if (typeof document === "undefined") return;
      if (next === document.documentElement.dataset.theme) {
        commitTheme(next);
        return;
      }

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const startViewTransition = (
        document as Document & {
          startViewTransition?: (cb: () => void) => {
            ready: Promise<void>;
          };
        }
      ).startViewTransition;

      const root = document.documentElement;

      // No View Transitions API (or reduced motion): fall back to a light
      // global color-morph. This is the ONLY place the costly all-element
      // transition runs — never alongside a view transition, which is what
      // previously caused the lag.
      if (!startViewTransition || prefersReduced) {
        if (!prefersReduced) {
          root.classList.add("theme-anim");
          if (animTimeout.current) clearTimeout(animTimeout.current);
          animTimeout.current = setTimeout(() => {
            root.classList.remove("theme-anim");
          }, 600);
        }
        commitTheme(next);
        return;
      }

      // View Transitions path: the GPU-composited snapshot repaints the whole
      // page on its own, so we deliberately skip the global CSS transition to
      // keep the circular reveal buttery smooth.
      const transition = startViewTransition.call(document, () => {
        commitTheme(next);
      });

      transition.ready
        .then(() => {
          const x = origin?.x ?? window.innerWidth / 2;
          const y = origin?.y ?? 0;
          const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 680,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          /* transition unsupported / interrupted — theme already applied */
        });
    },
    [commitTheme]
  );

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const current =
        (document.documentElement.dataset.theme as Theme | undefined) ?? theme;
      setTheme(current === "dark" ? "light" : "dark", origin);
    },
    [setTheme, theme]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, hasStoredPreference, setTheme, toggleTheme }),
    [theme, hasStoredPreference, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

/**
 * Inline script string that resolves & applies the theme before first paint,
 * preventing any flash of the wrong theme (FOUC). Injected in <head>.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k='${STORAGE_KEY}';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t='dark';}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;
