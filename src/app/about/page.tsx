import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
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
      <Process data={page.process} />
      <Team data={page.team} />
      <FAQ data={data.faq} />
      <CTASection
        eyebrow="Reserve"
        title="Spend an evening with us."
        subtitle="Two seatings a night, twelve seats per service. Weekend tables fill within hours."
        primary={{ label: "Reserve a Table", href: "/reserve" }}
        secondary={{ label: "View the Menu", href: "/menu" }}
      />
    </>
  );
}