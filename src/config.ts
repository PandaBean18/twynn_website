// Site Configuration
export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Twynn - Content Creation Collaboration",
  siteDescription: "Manage creators, campaigns, and content in one organised workspace. Twynn helps brands and creators track deals, manage deliverables, sync calendars, streamline communication, and handle payments securely in one place.",
};

// Navigation
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Creators", href: "#for-creators" },
  { label: "For Brands", href: "#for-brands" },
];

// Hero Section
export interface HeroConfig {
  brandName: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export const heroConfig: HeroConfig = {
  brandName: "Twynn",
  title: "Twynn",
  subtitle: "Content Creation Collaboration",
  description: "Manage creators, campaigns, and content in one organised workspace. Twynn helps brands and creators track deals, manage deliverables, sync calendars, streamline communication, and handle payments securely in one place.",
  ctaText: "Join Waitlist",
  ctaHref: "#waitlist",
};

// For Brands Section
export interface ForBrandsConfig {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const forBrandsConfig: ForBrandsConfig = {
  title: "For Brands",
  subtitle: "Meet Twynn",
  description: "The structured workspace designed for modern content collaboration. Twynn brings everything together so you can focus on creating great content.",
  features: [
    "Manage all creators in one place",
    "Track each creator's progress",
    "Monitor campaign stages",
    "Organise deliverables and files",
    "Sync content calendars",
    "Get reminders before deadlines",
    "Use AI assisted first contact drafts",
    "Hold payments securely in escrow",
  ],
  ctaText: "Get Started as a Brand",
  ctaHref: "#waitlist",
};

// For Creators Section
export interface ForCreatorsConfig {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const forCreatorsConfig: ForCreatorsConfig = {
  title: "For Creators",
  subtitle: "Meet Twynn",
  description: "The structured workspace designed for modern content collaboration. Twynn brings everything together so you can focus on creating great content.",
  features: [
    "Manage all your brand deals in one place",
    "Track deliverables and deadlines",
    "Sync your content calendar",
    "Streamline communication with brands",
    "Get reminders before due dates",
    "Use AI assisted messaging",
    "Receive payments securely via escrow",
    "Build your professional portfolio",
  ],
  ctaText: "Get Started as a Creator",
  ctaHref: "#waitlist",
};

// Features Section
export interface Feature {
  title: string;
  description: string;
}

export interface FeaturesConfig {
  subtitle: string;
  title: string;
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  subtitle: "Core Features",
  title: "Everything You Need",
  features: [
    {
      title: "Deal Tracker",
      description: "Track every collaboration with clear status updates, deadlines, and reminders.",
    },
    {
      title: "Content Calendar",
      description: "See planned posts and brand deliverables together in one synced calendar.",
    },
    {
      title: "Marketplace Matching",
      description: "Brands find creators by audience size, niche, and reach. Creators apply or get invited.",
    },
    {
      title: "AI Assisted Messaging",
      description: "Draft outreach messages that capture deliverables, dates, and fees.",
    },
    {
      title: "Analytics and Alerts",
      description: "View performance trends and get notified about major engagement changes.",
    },
    {
      title: "Secure Payments",
      description: "Escrow based system where funds release after delivery approval.",
    },
  ],
};

// How It Works Section
export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface HowItWorksConfig {
  subtitle: string;
  title: string;
  description: string;
  creatorJourney: {
    label: string;
    steps: JourneyStep[];
  };
  brandJourney: {
    label: string;
    steps: JourneyStep[];
  };
}

export const howItWorksConfig: HowItWorksConfig = {
  subtitle: "How It Works",
  title: "Two Journeys, One Platform",
  description: "Experience the seamless end-to-end flow of the Twynn ecosystem, built with privacy and security at its core.",
  creatorJourney: {
    label: "For Creators",
    steps: [
      {
        number: "01",
        title: "Secure Profile & Private Portfolio",
        description: "Create a professional profile and portfolio. Portfolios are private and only visible to verified brands, not other creators, to ensure user privacy.",
        highlight: "Privacy First",
      },
      {
        number: "02",
        title: "Command Center",
        description: "Access a dedicated dashboard to track pending deals, view audience analytics, and monitor content performance.",
        highlight: "Dashboard",
      },
      {
        number: "03",
        title: "Discover Opportunities",
        description: "Browse the global marketplace to find available brand deals and collaborations that match your niche.",
        highlight: "Marketplace",
      },
      {
        number: "04",
        title: "Connect & Collaborate",
        description: "Accept brand deals, use the in-app chat to discuss details, and manage deliverables through the content calendar.",
        highlight: "Collaboration",
      },
      {
        number: "05",
        title: "Deliver & Get Paid",
        description: "Submit work on time through the platform to trigger secure payment release via our escrow system.",
        highlight: "Secure Payment",
      },
    ],
  },
  brandJourney: {
    label: "For Brands",
    steps: [
      {
        number: "01",
        title: "Verified Brand Profile",
        description: "Set up a verified company profile to start scouting talent.",
        highlight: "Verification",
      },
      {
        number: "02",
        title: "Campaign Oversight",
        description: "Use the brand dashboard to track all active collaborations, monitor campaign progress, and view real-time analytics.",
        highlight: "Dashboard",
      },
      {
        number: "03",
        title: "Talent Sourcing",
        description: "Post campaign briefs to attract top-tier creators or personally reach out to specific talent through the platform.",
        highlight: "Marketplace",
      },
      {
        number: "04",
        title: "Milestone Management",
        description: "Receive required deliverables directly through the platform according to the agreed-upon timeline.",
        highlight: "Tracking",
      },
      {
        number: "05",
        title: "Secure Payouts",
        description: "Review the submitted work and approve the release of funds from escrow to the creator.",
        highlight: "Escrow",
      },
    ],
  },
};

// Who It Is For Section
export interface Audience {
  title: string;
  description: string;
}

export interface WhoItIsForConfig {
  subtitle: string;
  title: string;
  audiences: Audience[];
}

export const whoItIsForConfig: WhoItIsForConfig = {
  subtitle: "Who It Is For",
  title: "Built for Creators and Brands",
  audiences: [
    {
      title: "Creators",
      description: "For creators who want to manage collaborations like professionals and reduce admin time.",
    },
    {
      title: "Brands and Agencies",
      description: "For brands that need structure when working with multiple creators at once.",
    },
  ],
};

// Why Twynn Section
export interface WhyTwynnConfig {
  title: string;
  subtitle: string;
  description: string;
}

export const whyTwynnConfig: WhyTwynnConfig = {
  title: "Why Twynn",
  subtitle: "Built for Scale",
  description: "Built for scale. Designed for performance. Focused on saving time and reducing missed deliveries.",
};

// Global Mission Section
export interface GlobalMissionConfig {
  title: string;
  description: string;
}

export const globalMissionConfig: GlobalMissionConfig = {
  title: "Our Global Mission",
  description: "Creators and brands from all across the globe can create and collaborate on content in a fair market through our platform.",
};

// Waitlist Section
export interface WaitlistConfig {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export const waitlistConfig: WaitlistConfig = {
  title: "Join the Twynn Waitlist",
  subtitle: "Be among the first to simplify content collaboration.",
  ctaText: "Join Waitlist",
  ctaHref: "#",
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Common Questions",
  title: "Frequently Asked Questions",
  faqs: [
    {
      id: "1",
      question: "What is Twynn?",
      answer: "Twynn is a structured workspace designed for modern content collaboration. It helps brands and creators track deals, manage deliverables, sync calendars, streamline communication, and handle payments securely in one place.",
    },
    {
      id: "2",
      question: "Who is Twynn for?",
      answer: "Twynn is built for both content creators and brands/agencies. Creators can manage collaborations like professionals and reduce admin time, while brands get structure when working with multiple creators at once.",
    },
    {
      id: "3",
      question: "How does the payment system work?",
      answer: "Twynn uses an escrow-based payment system where funds are held securely and only released after delivery approval. This protects both creators and brands throughout the collaboration process.",
    },
    {
      id: "4",
      question: "What features does Twynn offer?",
      answer: "Twynn offers deal tracking, content calendar, marketplace matching, AI-assisted messaging, analytics and alerts, and secure payments - everything you need to manage creator collaborations efficiently.",
    },
    {
      id: "5",
      question: "When will Twynn be available?",
      answer: "Twynn is currently in development. Join our waitlist to be among the first to access the platform when it launches.",
    },
  ],
};

// Footer Section
export interface FooterConfig {
  brandName: string;
  tagline: string;
  navLinks: NavLink[];
  copyright: string;
}

export const footerConfig: FooterConfig = {
  brandName: "Twynn",
  tagline: "Content Creation Collaboration",
  navLinks: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Creators", href: "#for-creators" },
    { label: "For Brands", href: "#for-brands" },
  ],
  copyright: "Twynn. All rights reserved.",
};
