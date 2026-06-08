import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { FAQ } from "@/components/sections/FAQ";
import { ReserveFlow } from "./_sections/ReserveFlow";
import { ProcessSteps } from "./_sections/ProcessSteps";

export const metadata: Metadata = {
  title: "Reserve",
  description:
    "Reserve an evening at Maison Royale. Three ways to spend the night — tasting menu, chef's counter or private dining.",
};

export default async function ReservePage() {
  const data = await loadBrandData();
  const page = data.pages.reserve;

  return (
    <>
      <PageBanner data={page.banner} pageLabel={ROUTES.reserve.label} />
      <ReserveFlow
        experiences={page.experiences}
        form={page.form}
        brand={data.brand}
      />
      <ProcessSteps data={page.steps} />
      <FAQ data={data.faq} />
    </>
  );
}