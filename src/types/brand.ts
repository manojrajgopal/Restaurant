export interface BrandTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface WorkingHour {
  day: string;
  hours: string;
}

export interface BrandData {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  logoMark: string;
  established: string;
  theme: BrandTheme;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapEmbed: string;
  };
  workingHours: WorkingHour[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationData {
  items: NavItem[];
  cta: { label: string; href: string };
}

export interface HeroBadge {
  icon: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  eyebrow: string;
  headline: string[];
  highlight: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string;
  foregroundImage: string;
  badges: HeroBadge[];
  stats: HeroStat[];
  floatingCard: {
    title: string;
    subtitle: string;
    image: string;
    rating: number;
  };
}

export interface HighlightItem {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

export interface HighlightsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: HighlightItem[];
}

export interface AboutData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signature: { name: string; role: string };
  image: string;
  secondaryImage: string;
  pillars: { title: string; description: string }[];
  stats: { value: string; label: string }[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  category: string;
  popular?: boolean;
  signature?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  description: string;
}

export interface MenuData {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: MenuCategory[];
  items: MenuItem[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface ServicesData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
  span?: "tall" | "wide" | "square";
}

export interface GalleryData {
  eyebrow: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Testimonial[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface ContactData {
  eyebrow: string;
  title: string;
  subtitle: string;
  formLabels: {
    name: string;
    email: string;
    phone: string;
    date: string;
    guests: string;
    message: string;
    submit: string;
  };
  promise: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  message: string;
  columns: FooterColumn[];
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    cta: string;
  };
  copyright: string;
  legal: { label: string; href: string }[];
}

export interface Brand {
  brand: BrandData;
  navigation: NavigationData;
  hero: HeroData;
  highlights: HighlightsData;
  about: AboutData;
  menu: MenuData;
  services: ServicesData;
  gallery: GalleryData;
  testimonials: TestimonialsData;
  faq: FaqData;
  contact: ContactData;
  footer: FooterData;
  home: HomeData;
  pages: PageData;
}

/* ----------------------------- Page payloads ----------------------------- */

export interface CtaLink {
  label: string;
  href: string;
}

export interface HomeData {
  aboutTeaser: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: CtaLink;
    image: string;
    marks: { value: string; label: string }[];
  };
  menuPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: CtaLink;
    highlightIds: string[];
  };
  galleryPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: CtaLink;
    limit: number;
  };
  closingCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: CtaLink;
    secondary: CtaLink;
    image: string;
  };
}

export interface PageBannerData {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface AboutPageData {
  banner: PageBannerData;
  philosophy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      time: string;
      title: string;
      description: string;
    }[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      bio: string;
      image: string;
    }[];
  };
}

export interface MenuPageData {
  banner: PageBannerData;
  signatureSpotlight: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ids: string[];
  };
}

export interface GalleryPageData {
  banner: PageBannerData;
  filters: { id: string; label: string }[];
}

export interface ContactPageData {
  banner: PageBannerData;
  map: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directions: { label: string; value: string }[];
  };
}

export interface ReservePageData {
  banner: PageBannerData;
  experiences: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      name: string;
      summary: string;
      duration: string;
      guests: string;
      price: string;
      features: string[];
      image: string;
    }[];
  };
  form: {
    eyebrow: string;
    title: string;
    subtitle: string;
    submit: string;
    promise: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    items: {
      step: string;
      title: string;
      description: string;
    }[];
  };
}

export interface PageData {
  about: AboutPageData;
  menu: MenuPageData;
  gallery: GalleryPageData;
  contact: ContactPageData;
  reserve: ReservePageData;
}
