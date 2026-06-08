import type { Metadata } from "next";
import { loadBrandData } from "@/lib/loadBrandData";
import { ROUTES } from "@/lib/routes";
import { PageBanner } from "@/components/ui/PageBanner";
import { Contact } from "@/components/sections/Contact";
import { LazyOnView } from "@/components/lazy/LazyOnView";
import { MapPanel } from "./_sections/MapPanel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "For reservations, private events or simply a question — we reply personally to every message.",
};

export default async function ContactPage() {
  const data = await loadBrandData();
  const page = data.pages.contact;

  return (
    <>
      <PageBanner data={page.banner} pageLabel={ROUTES.contact.label} />
      <Contact data={data.contact} brand={data.brand} />
      <LazyOnView minHeight={520}>
        <MapPanel data={page.map} brand={data.brand} />
      </LazyOnView>
    </>
  );
}