import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#080806",
          900: "#0c0c0a",
          800: "#141411",
          700: "#1c1c18",
          600: "#26261f",
        },
        cream: {
          50: "#fbf7f0",
          100: "#f3ecdf",
          200: "#e6dcc6",
        },
        gold: {
          200: "#f3dca0",
          300: "#e9c66d",
          400: "#d9ad4a",
          500: "#c2932e",
          600: "#9a721f",
        },
        forest: {
          400: "#3d6b58",
          500: "#2c5544",
          600: "#1f4233",
          700: "#143126",
        },
      },
      boxShadow: {
        glow: "0 30px 80px -40px rgba(217,173,74,0.55)",
        lift: "0 40px 100px -50px rgba(0,0,0,0.7)",
        soft: "0 18px 50px -25px rgba(0,0,0,0.5)",
        ring: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "radial-gold":
          "radial-gradient(circle at 50% 0%, rgba(217,173,74,0.25), transparent 60%)",
        "radial-forest":
          "radial-gradient(circle at 50% 100%, rgba(31,66,51,0.5), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "100%": { transform: "rotate(360deg) translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        orbit: "orbit 24s linear infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
