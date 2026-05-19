import type { PortfolioData } from "../types/portfolio.types";

export const defaultData: PortfolioData = {
  meta: {
    name: "Subhajeet Dey",
    title: "Full-Stack Web Developer",
    tagline: "Backend Logic. Frontend Polish",
    subtitle:
      "I architect scalable server-side systems and craft pixel-precise interfaces — end-to-end, from database schema to deploy.",
    available: true,
    email: "deysubhajeetwork@gmail.com",
    github: "https://github.com/subhajeetdey-dev",
    x: "https://x.com/SubhajeetDeydev",
    linkedin: "https://www.linkedin.com/in/subhajeetdey-dev",
    footerTagline:
      "Shipping robust APIs and beautiful UIs — one comit at a time.",
  },
  about: {
    bio1: "I'm a full-stack developer with 1+ year of experience building products that scales. My backend root give me a deep appreciation for system design, data integrity, and API architecture — while my frontend craft ensures that experience is seamless.",
    bio2: "From designing PostgreSQL schemas to animating React components, I live at the intersection of engineering rigour and user empathy. I ship fast, maintain well, and never stop optimising. ",
    location: "Based in Alipurduar, West Bengal, India",
    stats: [
      { number: "10+", label: "Projects Shipped" },
      { number: "1+", label: "Years Full-Stack" },
      { number: "100%", label: "Uptime Target" },
    ],
  },
  testimonial: {
    quote: "",
    author: "",
    role: "",
  },
  projects: [],
  skills: [
    {
      id: 1,
      category: "backend",
      title: "Backend & Systems",
      icon: "⬡",
      desc: "Scalable APIs, database design, queues, caching, and cloud-native deployments. I build systems that last.",
      tags: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Docker",
        "Prisma",
        "GraphQL",
        "REST",
        "AWS",
      ],
    },
    {
      id: 2,
      category: "frontend",
      title: "Frontend & UI Engineering",
      icon: "◈",
      desc: "Accessible, performant interfaces built with modern React. Design systems, animations, and state architecture.",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "React Query",
      ],
    },
  ],
};
