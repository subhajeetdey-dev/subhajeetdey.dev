import React from "react";
import type { PortfolioData } from "../types/portfolio.types";
import { Sun } from "lucide-react";
import { BsMoonStarsFill } from "react-icons/bs";
import { Sparkle, X, Menu  } from 'lucide-react';

interface NavbarProps {
  dark: boolean;
  toggle: () => void;
  scrolled: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCmsOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
  data: PortfolioData;
  borderCol: string;
  mutedCol: string;
  textCol: string;
}

const navLinks = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar({
  dark,
  toggle,
  scrolled,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  setCmsOpen,
  scrollTo,
  data,
  borderCol,
  mutedCol,
  textCol,
}: NavbarProps) {
  const navBg = dark
    ? scrolled
      ? "rgba(8,8,8,0.95)"
      : "rgba(8,8,8,0.6)"
    : scrolled
      ? "rgba(247,247,247,0.95)"
      : "rgba(247,247,247,0.6)";
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? `1px solid ${borderCol}`
          : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between h-16 max-w-6xl px-6 mx-auto">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2.5 cursor-pointer"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <div
            className="flex items-center justify-center w-6 h-6 text-xs font-black text-white rounded-sm"
            style={{ background: "#ef233c", transform: "rotate(45deg)" }}
          >
            <span style={{ transform: "rotate(-45deg)", display: "block" }}>
              S
            </span>
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ color: textCol, letterSpacing: "-0.04em" }}
          >
            {data.meta.name}
            {/* or we can use -> {data.meta.name.split(" ")[0]}                          */}
          </span>
        </button>

        <nav className="items-start hidden gap-3 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-sm font-medium transition-all rounded-full cursor-pointer"
              style={{
                color: activeSection === l.id ? "#ef233c" : mutedCol,
                background:
                  activeSection === l.id
                    ? "rgba(239, 35,60,0.08)"
                    : "transparent",
                fontFamily: "'Space Geotesk', sans-serif",
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center justify-center text-base transition-all border rounded-full w-9 h-9"
            style={{
              borderColor: borderCol,
              color: mutedCol,
              background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            }}
            title="Toggle Theme"
          >
            {dark ? <Sun /> : <BsMoonStarsFill />}
          </button>
          <button
            onClick={() => setCmsOpen(true)}
            className="items-center hidden md:flex gap-1.5 px-4 py-2 rounded-full text-xs font-mono transition-all border"
            style={{ borderColor: borderCol, color: mutedCol }}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkle size={16} color="#000000" strokeWidth={1} absoluteStrokeWidth /> {/* change color to adjust black sparkle*/}
              Edit
            </span>
          </button>
          <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center border rounded-full md:hidden w-9 h-9"
          style={{borderColor: borderCol, color: mutedCol}}
          >
            {mobileMenuOpen ? <X /> : <Menu /> }            
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <div
        className="flex flex-col gap-2 px-6 pb-4 border-t md:hidden"
        style={{borderColor: borderCol, background: navBg}}
        >
            {navLinks.map((l) => (
                <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="py-2.5 text-sm font-medium text-left"
                style={{color: activeSection === l.id ? "#ef233c" : mutedCol}}
                >
                    {l.label}                    
                </button>
            ))}
            <button
            onClick={() => {setCmsOpen(true); setMobileMenuOpen(false);}}
            className="py-2.5 text-sm font-mono text-left"
            style={{color: mutedCol}}
            >
                <span className="flex items-center gap-2">
                    <Sparkle size={16} color="#000000" strokeWidth={1} absoluteStrokeWidth /> edit portfolio
                </span>
            </button>
        </div>
      )}
    </header>
  );
}
