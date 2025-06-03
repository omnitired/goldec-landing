export interface NavContent {
  features: string;
  howItWorks: string;
  stats: string;
  contact: string;
}

export interface HeroContent {
  badge: string;
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  cta1: string;
  cta2: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  feature1: FeatureItem;
  feature2: FeatureItem;
  feature3: FeatureItem;
}

export interface StepItem {
  title: string;
  desc: string;
}

export interface HowItWorksContent {
  title: string;
  step1: StepItem;
  step2: StepItem;
  step3: StepItem;
}

export interface StatItem {
  value: string;
  title: string;
  desc: string;
}

export interface StatsContent {
  title: string;
  subtitle: string;
  stat1: StatItem;
  stat2: StatItem;
  stat3: StatItem;
}

export interface Partner {
  id: number;
  name: string;
  url: string;
  logo: string;
  addedDate: string; // Jalali date in YYYY/MM/DD format
}

export interface PartnersData {
  partners: Partner[];
  settings: {
    initialDisplayCount: number;
    expandStep: number;
  };
}

export interface PartnersContent {
  title1: string;
  title2: string;
  subtitle: string;
  logo1: string;
  logo2: string;
  logo3: string;
  logo4: string;
  bottomText: string;
}

export interface CTAContent {
  title1: string;
  title2: string;
  apiAccess: string;
  docs: string;
}

export interface FooterContent {
  linksTitle: string;
  mainPage: string;
  services: string;
  managers: string;
  contact: string;
  aboutTitle: string;
  aboutText: string;
  contactTitle: string;
  email: string;
  phone: string;
  socialTitle: string;
  copyright: string;
}

export interface ContentData {
  brand: string;
  nav: NavContent;
  hero: HeroContent;
  features: FeaturesContent;
  howItWorks: HowItWorksContent;
  stats: StatsContent;
  partners: PartnersContent;
  cta: CTAContent;
  footer: FooterContent;
}