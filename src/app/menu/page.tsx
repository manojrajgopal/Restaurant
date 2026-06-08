import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { MenuSection } from "@/components/sections/MenuSection";
import { CTASection } from "@/components/sections/CTASection";
import { LazyOnView } from "@/components/lazy/LazyOnView";
import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { SignatureSpotlight } from "./_sections/SignatureSpotlight";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "A glimpse of dishes currently on the chef's tasting menu. Composed nightly, sourced within ninety miles.",
};

export default async function MenuPage() {
  const data = await loadBrandData();
  const page = data.pages.menu;

  return (
    <>
      <PageBanner data={page.banner} pageLabel={ROUTES.menu.label} />
      <SignatureSpotlight data={page.signatureSpotlight} menu={data.menu} />
      <LazyOnView minHeight={700} fallback={<SkeletonSection count={6} cols={3} />}>
        <MenuSection data={data.menu} />
      </LazyOnView>
      <LazyOnView minHeight={420}>
        <CTASection
          eyebrow="Reserve"
          title="Taste the full menu tonight."
          subtitle="The seven-course tasting is presented at the table — every evening, in season."
          primary={{ label: "Reserve a Table", href: "/reserve" }}
          secondary={{ label: "Chef's Counter", href: "/reserve" }}
        />
      </LazyOnView>
    </>
  );
}