# Maison Royale — Premium Restaurant Frontend

A futuristic, premium, fully responsive restaurant/bakery website built with **Next.js 14 + TypeScript + Tailwind CSS + Framer Motion**. Every piece of business content is driven by brand-specific JSON files, so you can re-skin the entire site for a new brand in seconds.

---

## ✨ Highlights

- Cinematic, 3D-inspired hero with parallax, floating glass cards and reflection highlights
- Glassmorphism, soft shadows, layered depth, refined micro-interactions
- 100% data-driven — **no business copy lives in components**
- One-line brand switching via `NEXT_PUBLIC_BRAND_SLUG`
- Fully responsive (small mobile → ultrawide)
- Accessible (semantic HTML, keyboard focus, reduced-motion aware, ARIA where useful)

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build && npm start    # production
npm run typecheck             # TS only
npm run lint                  # ESLint (Next.js core-web-vitals)
```

---

## 🎨 Switching the Brand

1. Create a new folder under `src/data/<your-brand-slug>/` containing the same JSON files as `src/data/royal-bistro/`.
2. Register the slug in `src/lib/loadBrandData.ts` (one entry in the `REGISTRY` object).
3. Update `.env.local`:

   ```env
   NEXT_PUBLIC_BRAND_SLUG=your-brand-slug
   ```

4. Restart `next dev`. The entire site re-skins — copy, menu, gallery, contact, footer, metadata.

---

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router entry
│   ├── layout.tsx          # Fonts, metadata (brand-aware)
│   └── page.tsx            # Composes all sections
├── components/
│   ├── animations/         # Reveal, Stagger wrappers
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, About, Menu, Services, Gallery, etc.
│   └── ui/                 # Buttons, badges, glass panels, icons
├── data/
│   └── royal-bistro/       # All brand content as JSON
│       ├── brand.json
│       ├── navigation.json
│       ├── hero.json
│       ├── highlights.json
│       ├── about.json
│       ├── menu.json
│       ├── services.json
│       ├── gallery.json
│       ├── testimonials.json
│       ├── faq.json
│       ├── contact.json
│       └── footer.json
├── lib/
│   ├── loadBrandData.ts    # Brand registry + loader
│   ├── resolveAssetPath.ts # Local asset resolver
│   └── utils.ts
├── styles/
│   └── globals.css         # Design system + utilities
└── types/
    └── brand.ts            # All TS interfaces for the JSON schema
```

---

## 🖼 Assets

Image URLs live inside the JSON. Remote Unsplash images are pre-configured in `next.config.js`. For local assets, drop them in `public/brands/<slug>/...` and reference them by their relative path — `resolveAssetPath()` will resolve them.

---

## 🧩 Design Tokens

Defined in `tailwind.config.ts`:

| Token   | Purpose                          |
| ------- | -------------------------------- |
| `ink`   | Background / surfaces            |
| `cream` | Foreground text                  |
| `gold`  | Primary accent                   |
| `forest`| Secondary accent (atmospheric)   |

Typography pairs **Playfair Display** (`font-display`) with **Inter** (`font-sans`).

---

## 📱 Responsive Strategy

- Mobile-first layouts, intentional reflow on `sm`, `md`, `lg`, `xl`, `2xl`
- Container max-width caps at `1320px` and centers everywhere
- Navigation collapses into a polished glass overlay drawer at `<lg`
- Grids reflow (e.g. gallery becomes 2 / 3 / 4 columns)
- All hero typography uses `clamp()` for fluid scaling

---

## ♿ Accessibility & Performance

- Semantic landmarks (`header`, `main`, `section`, `footer`)
- Visible focus rings on every interactive
- `prefers-reduced-motion` honored globally
- Next/Image with intrinsic sizing and lazy-loading by default
- Critical hero image marked `priority`

---

Built with intention.
