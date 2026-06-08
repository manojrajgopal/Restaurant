import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { loadBrandData } from "@/lib/loadBrandData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await loadBrandData();
  return {
    title: {
      default: `${brand.brandName} — ${brand.tagline}`,
      template: `%s · ${brand.brandName}`,
    },
    description: brand.description,
    openGraph: {
      title: brand.brandName,
      description: brand.description,
      type: "website",
    },
    icons: {
      icon: [
        {
          url:
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23080806'/><text x='32' y='42' text-anchor='middle' font-family='serif' font-size='28' fill='%23d9ad4a'>" +
            brand.logoMark +
            "</text></svg>",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await loadBrandData();
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-ink-950 text-cream-50 antialiased selection:bg-gold-400/30">
        <ScrollProgress />
        <Navbar brand={data.brand} navigation={data.navigation} />
        <main className="relative">{children}</main>
        <Footer brand={data.brand} footer={data.footer} />
      </body>
    </html>
  );
}
