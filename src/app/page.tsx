import { loadBrandData } from "@/lib/loadBrandData";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { LazyOnView } from "@/components/lazy/LazyOnView";
import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { AboutTeaser } from "./_sections/home/AboutTeaser";
import { MenuPreview } from "./_sections/home/MenuPreview";
import { GalleryPreview } from "./_sections/home/GalleryPreview";
import { BrandStrip } from "./_sections/home/BrandStrip";

export default async function HomePage() {
  const data = await loadBrandData();
  const { home } = data;

  return (
    <>
      <Hero hero={data.hero} brand={data.brand} />
      <BrandStrip />
      <Highlights data={data.highlights} />
      <AboutTeaser data={home.aboutTeaser} />
      <MenuPreview data={home.menuPreview} menu={data.menu} />

      <LazyOnView
        minHeight={600}
        fallback={<SkeletonSection count={2} cols={2} />}
      >
        <Services data={data.services} />
      </LazyOnView>

      <LazyOnView
        minHeight={520}
        fallback={<SkeletonSection count={6} cols={4} />}
      >
        <GalleryPreview data={home.galleryPreview} gallery={data.gallery} />
      </LazyOnView>

      <LazyOnView
        minHeight={520}
        fallback={<SkeletonSection count={3} cols={3} />}
      >
        <Testimonials data={data.testimonials} />
      </LazyOnView>

      <LazyOnView minHeight={420}>
        <CTASection
          eyebrow={home.closingCta.eyebrow}
          title={home.closingCta.title}
          subtitle={home.closingCta.subtitle}
          primary={home.closingCta.primary}
          secondary={home.closingCta.secondary}
          image={home.closingCta.image}
        />
      </LazyOnView>
    </>
  );
}
