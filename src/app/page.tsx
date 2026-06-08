import { loadBrandData } from "@/lib/loadBrandData";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { AboutTeaser } from "./_sections/home/AboutTeaser";
import { MenuPreview } from "./_sections/home/MenuPreview";
import { GalleryPreview } from "./_sections/home/GalleryPreview";

export default async function HomePage() {
  const data = await loadBrandData();
  const { home } = data;

  return (
    <>
      <Hero hero={data.hero} brand={data.brand} />
      <Highlights data={data.highlights} />
      <AboutTeaser data={home.aboutTeaser} />
      <MenuPreview data={home.menuPreview} menu={data.menu} />
      <Services data={data.services} />
      <GalleryPreview data={home.galleryPreview} gallery={data.gallery} />
      <Testimonials data={data.testimonials} />
      <CTASection
        eyebrow={home.closingCta.eyebrow}
        title={home.closingCta.title}
        subtitle={home.closingCta.subtitle}
        primary={home.closingCta.primary}
        secondary={home.closingCta.secondary}
        image={home.closingCta.image}
      />
    </>
  );
}
