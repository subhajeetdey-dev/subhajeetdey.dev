export interface StatItem {
    number: string;
    label: string;
}

export interface Project {
    id: number;
    title: string;
    desc: string;
    stack: string[];
    type: "backend" | "frontend" | "fullstack";
    accent: "red" | "blue" | "green" | "amber";
    featured: boolean;
    cta: string;
    link: string;
    metrics?: string;
}

export interface SkillGroup {
    id: number;
    category: "backend" | "frontend" | "fullstack";
    title: string;
    icon: string;
    desc: string;
    tags: string[];
}

export interface PortfolioData {
    meta: {
        name: string;
        title: string;
        tagline: string;
        subtitle: string;
        available: boolean;
        email: string;
        github: string;
        x: string;
        linkedin: string;
        footerTagline: string;
    };
    about: {
        bio1: string;
        bio2: string;
        location: string;
        stats: StatItem[];
    };
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    projects: Project[];
    skills: SkillGroup[];
}