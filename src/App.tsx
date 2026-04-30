import React, { useState, useEffect } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { defaultData } from "./data/defaultData";
import type { PortfolioData } from "./types/portfolio.types";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { WorkSection } from "./components/sections/WorkSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";

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
    "all" | "backend" | "frontend"
  >("all");

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
    <>
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

        {/* <WorkSection
          projects={data.projects}
          dark={dark}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
          borderCol={borderCol}
          mutedCol={mutedCol}
        /> */}

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
    </>
  );
}
