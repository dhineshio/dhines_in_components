// Project showcase data (from dhines.in). Screenshots are in
// /public/projects and logos in /public/projects/logos.

export type ProjectCategory =
  "Websites" | "Portals" | "Products" | "Mobile App";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  url: string;
  image: string;
  logo: string;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "skillup-languages",
    name: "Skill Up Languages",
    category: "Websites",
    tagline: "Educational Institute — Language Courses",
    description:
      "Static website for a language learning institute offering English and Hindi courses, built for performance and SEO.",
    url: "https://www.skilluplanguages.com/",
    image: "/projects/skillup-languages-screen.webp",
    logo: "/projects/logos/skillup_languages_logo.webp",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "topgrade",
    name: "Top Grade",
    category: "Websites",
    tagline: "Online E-Learning Platform Landing Page",
    description:
      "Landing page for an e-learning platform built to drive course enrollments with a clean, conversion-focused design.",
    url: "https://www.topgradeinnovation.com/",
    image: "/projects/topgrade-screen.webp",
    logo: "/projects/logos/topgrade_logo.webp",
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "sri-karpom-karpipom",
    name: "Sri Karpom Karpipom",
    category: "Websites",
    tagline: "Children's Tamil Online Learning Academy",
    description:
      "Static website for a Tamil language teaching institute for children, showcasing courses and enrollment details.",
    url: "https://srikarpomkarpipom.com/",
    image: "/projects/sri-karpom-karpipom-screen.webp",
    logo: "/projects/logos/sri_karpom_karpipom_logo.webp",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "rvr-engineering",
    name: "RVR Engineering ERP",
    category: "Portals",
    tagline: "Internal Management System",
    description:
      "Full-scale ERP built from scratch — staff management, accounts, clients, lead tracking, and real-time WebSocket chat, all in one platform.",
    url: "https://pm.rvrengineering.com/",
    image: "/projects/rvr-engineering-portal.webp",
    logo: "/projects/logos/rvr_logo.webp",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Python", "Django"],
  },
  {
    id: "topgrade-app",
    name: "Top Grade App",
    category: "Mobile App",
    tagline: "E-Learning Mobile Application",
    description:
      "Mobile app for the Top Grade e-learning platform — students can access courses, track progress, and learn on the go.",
    url: "https://play.google.com/store/apps/details?id=com.topgrade.app&pcampaignid=web_share",
    image: "/projects/topgrade-mobile.webp",
    logo: "/projects/logos/topgrade_logo.webp",
    tech: ["Flutter", "Dart"],
  },
  {
    id: "a11y-alt-product",
    name: "A11y Alt Text",
    category: "Products",
    tagline: "AI-Powered Alt Text Generator",
    description:
      "AI product that automatically generates accurate alt text for images, improving web accessibility and SEO for publishers.",
    url: "https://alt.a11ydigitech.com/",
    image: "/projects/a11yalt-product.webp",
    logo: "/projects/logos/a11y_digitech_logo.webp",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Python", "Django"],
  },
  {
    id: "topgrade-admin",
    name: "Top Grade LMS Portal",
    category: "Portals",
    tagline: "Learning Management System",
    description:
      "Full LMS portal — course video uploads, student management, progress stats, and automated certificate distribution.",
    url: "https://www.topgradeinnovation.com/dashboard/signin/",
    image: "/projects/topgrade-admin.webp",
    logo: "/projects/logos/topgrade_logo.webp",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Python", "Django"],
  },
  {
    id: "a11y-digitech",
    name: "A11y DigiTech",
    category: "Websites",
    tagline: "e-Publishing Company Website",
    description:
      "Static website for an accessibility-focused e-publishing company, built for performance and clarity.",
    url: "https://www.a11ydigitech.com/",
    image: "/projects/a11ydigitech-screen.webp",
    logo: "/projects/logos/a11y_digitech_logo.webp",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "agamagizh",
    name: "Agamagizh",
    category: "Websites",
    tagline: "NGO — SEO Friendly Static Website",
    description:
      "SEO-optimized static website for an NGO, built for visibility and outreach with clean, accessible design.",
    url: "https://www.agamagizhtrust.com/",
    image: "/projects/agamagizh-screen.webp",
    logo: "/projects/logos/agamagizh_logo.webp",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
];
