import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { LazyOnView } from "@/components/lazy/LazyOnView";
import { GalleryGrid } from "./_sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "An atmosphere designed in low light and soft brass. Twelve seats, an open hearth, and a kitchen that doubles as the stage.",
};

export default async function GalleryPage() {
  const data = await loadBrandData();
  const page = data.pages.gallery;

  return (
    <>
      <PageBanner data={page.banner} pageLabel={ROUTES.gallery.label} />
      <GalleryGrid gallery={data.gallery} filters={page.filters} />
      <LazyOnView minHeight={520}>
        <Testimonials data={data.testimonials} />
      </LazyOnView>
      <LazyOnView minHeight={420}>
        <CTASection
          eyebrow="See it in person"
          title="The room is even better from a table for two."
          subtitle="A few seats remain for this season — reserve before they're gone."
          primary={{ label: "Reserve a Table", href: "/reserve" }}
          secondary={{ label: "Get in Touch", href: "/contact" }}
        />
      </LazyOnView>
    </>
  );
}