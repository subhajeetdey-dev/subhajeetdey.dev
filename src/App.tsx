import React, { useState, useEffect } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { defaultData } from "./data/defaultData";
import type { PortfolioData } from "./types/portfolio.types";

import { Navbar } from "./components/Navbar";
import { CMSPanel } from "./components/CMSPanel";
import { HeroSection } from "./components/sections/HeroSection";
import { WorkSection } from "./components/sections/WorkSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/Footer";

export default function Portfolio() {
  const { dark, toggle } = useDarkMode();
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactSent, setContactSent] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [skillFilter, setSkillFilter] = useState<
    "all"| "full-stack" | "backend" | "frontend"
  >("all");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      const sections = ["hero", "work", "skills", "about", "contact"];
      const pos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVal) return;
    setContactSent(true);
    setEmailVal("");
    setTimeout(() => setContactSent(false), 3000);
  };

  const bg = dark ? "#080808" : "#f7f7f5";
  const textCol = dark ? "#fafafa" : "#0a0a0a";
  const mutedCol = dark ? "#71717a" : "#737373";
  const borderCol = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        background: bg,
        color: mutedCol,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Space Drotesk', system-ui, sans-serif",
        overflowX: "hidden",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(239,35,60,0.06), transparent)"
              : "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(239,35,60,0.04), transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>
      <Navbar
        dark={dark}
        toggle={toggle}
        scrolled={scrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCmsOpen={setCmsOpen}
        scrollTo={scrollTo}
        data={data}
        borderCol={borderCol}
        mutedCol={mutedCol}
        textCol={textCol}
      />

      <main>
        <HeroSection
          data={data}
          dark={dark}
          scrollTo={scrollTo}
          textCol={textCol}
          mutedCol={mutedCol}
          borderCol={borderCol}
        />

        <WorkSection
          projects={data.projects}
          dark={dark}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
          borderCol={borderCol}
          mutedCol={mutedCol}
        />

        <SkillsSection
          skills={data.skills}
          dark={dark}
          bg={bg}
          borderCol={borderCol}
          mutedCol={mutedCol}
        />

        <AboutSection
          data={data}
          dark={dark}
          borderCol={borderCol}
          mutedCol={mutedCol}
          textCol={textCol}
        />

        <ContactSection
          data={data}
          dark={dark}
          emailVal={emailVal}
          setEmailVal={setEmailVal}
          contactSent={contactSent}
          handleContact={handleContact}
          borderCol={borderCol}
          mutedCol={mutedCol}
          textCol={textCol}
        />
      </main>

      <Footer
        data={data}
        dark={dark}
        scrollTo={scrollTo}
        borderCol={borderCol}
        mutedCol={mutedCol}
        textCol={textCol}
      />
      {cmsOpen && (
        <CMSPanel
          data={data}
          setData={setData}
          onClose={() => setCmsOpen(false)}
          dark={dark}
        />
      )}

      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
          
         @keyframes fadeUp {
          from {opacity: 0; transfrom: translateY(22px);}
          to {opacity: 1; transform: translateY(0);}
         }
          @keyframes ping{
            75%, 100% {transform: scale(2); opacity: 0;}
          }

          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
            will-change: transform;
          }

          

          .animate-ping {animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;}
          .animate-marquee {animation: marquee 30s linear infinite;}

          *{ box-sizing: border-box; }
          ::-webkit-scrollbar {width: 6px;}
          ::-webkit-scrollbar-track {background: transparent;}
          ::-webkit-scrollbar-thumb {background: rgba(239,35,60,0.3); border-radius: 3px; }
          ::selection {background: #ef233c; color: #fff}         
          html {scroll-behavior: smooth;}
        `}
      </style>
    </div>
  );
}
