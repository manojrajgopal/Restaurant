import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { LazyOnView } from "@/components/lazy/LazyOnView";
import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { Philosophy } from "./_sections/Philosophy";
import { Process } from "./_sections/Process";
import { Team } from "./_sections/Team";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "An intimate atelier built on quiet sourcing, slow technique, and the conviction that restraint is the most generous thing a kitchen can offer.",
};

export default async function AboutPage() {
  const data = await loadBrandData();
  const page = data.pages.about;

  return (
    <>
      <PageBanner data={page.banner} pageLabel={ROUTES.about.label} />
      <About data={data.about} />
      <Philosophy data={page.philosophy} />
      <LazyOnView minHeight={520} fallback={<SkeletonSection count={4} cols={4} />}>
        <Process data={page.process} />
      </LazyOnView>
      <LazyOnView minHeight={520} fallback={<SkeletonSection count={3} cols={3} />}>
        <Team data={page.team} />
      </LazyOnView>
      <LazyOnView minHeight={500}>
        <FAQ data={data.faq} />
      </LazyOnView>
      <LazyOnView minHeight={420}>
        <CTASection
          eyebrow="Reserve"
          title="Spend an evening with us."
          subtitle="Two seatings a night, twelve seats per service. Weekend tables fill within hours."
          primary={{ label: "Reserve a Table", href: "/reserve" }}
          secondary={{ label: "View the Menu", href: "/menu" }}
        />
      </LazyOnView>
    </>
  );
}