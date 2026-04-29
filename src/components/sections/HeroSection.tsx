import React from "react";
import { TerminalCursor } from "../ui/TerminalCursor";
import { CodeLine } from "../ui/CodeLine";
import { accentPalette } from "../../constants/theme";
import type { PortfolioData } from "../../types/portfolio.types";
import { FaArrowRight } from "react-icons/fa";
import { div } from "framer-motion/client";

interface HeroSectionProps {
  data: PortfolioData;
  dark: boolean;
  scrollTo: (id: string) => void;
  textCol: string;
  mutedCol: string;
  borderCol: string;
}

export function HeroSection({
  data,
  dark,
  scrollTo,
  textCol,
  mutedCol,
  borderCol,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="flex flex-col justify-center min-h-screen px-6 pt-24 pb-20"
    >
      <div className="w-full max-w-6xl mx-auto">
        {data.meta.available && (
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-mono mb-10"
            style={{
              background: "rgba(34,197,94,0.07)",
              borderColor: "rgba(34,197,94,0.25)",
              color: "#22c55e",
              animationName: "fadeUp",
              animationDuration: "0.6s",
              animationFillMode: "both",
            }}
          >
            <span className="relative flex w-2 h-2">
              <span
                className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                style={{ background: "#22c55e" }}
              />
              <span
                className="relative inline-flex w-2 h-2 rounded-full"
                style={{ background: "#22c55e" }}
              />
            </span>
            available for projects
          </div>
        )}

        <div
          className="mb-4 font-mono text-sm"
          style={{
            color: mutedCol,
            animationName: "fadeUp",
            animationDuration: "0.6s",
            animationDelay: "0.05s",
            animationFillMode: "both",
          }}
        >
          <span style={{ color: "#ef233c" }}>const</span>{" "}
          <span style={{ color: dark ? "#60a5fa" : "#2563eb" }}>tagline</span>{" "}
          <span style={{ color: mutedCol }}>=</span>{" "}
          <span style={{ color: dark ? "#f59e0b" : "#d97706" }}>
            {data.meta.tagline}
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl lg:text-[105px] font-black tracking-tight leading-none mb-6"
          style={{
            color: textCol,
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
            animationName: "fadeUp",
            animationDuration: "0.7s",
            animationDelay: "0.1s",
            animationFillMode: "both",
          }}
        >
          {data.meta.name.split(" ")[0]}{" "}
          <span style={{ color: "#ef233c" }}>
            {data.meta.name.split(" ").slice(1).join(" ")}
          </span>
          <TerminalCursor />
        </h1>

        <div
          className="flex flex-wrap items-center gap-3 mb-8"
          style={{
            animationName: "fadeUp",
            animationDuration: "0.7s",
            animationDelay: "0.15s",
            animationFillMode: "both",
          }}
        >
          {(["Backend", "Frontend", "Full-Stack"] as const).map((t, i) => (
            <span
              key={t}
              className="px-3 font-mono text-xs py-1.5 rounded-full border"
              style={{
                background: [
                  accentPalette.green.bg,
                  accentPalette.blue.bg,
                  accentPalette.red.bg,
                ][i],
                borderColor:
                  [
                    accentPalette.green.hex,
                    accentPalette.blue.hex,
                    accentPalette.red.hex,
                  ][i] + "44",
                color: [
                  accentPalette.green.hex,
                  accentPalette.blue.hex,
                  accentPalette.red.hex,
                ][i],
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          className="max-w-2xl mb-12 text-xl leading-relaxed md:text-2xl"
          style={{
            color: mutedCol,
            animationName: "fadeUp",
            animationDuration: "0.7s",
            animationDelay: "0.2s",
            animationFillMode: "both",
            lineHeight: 1.6,
          }}
        >
          {data.meta.subtitle}
        </p>

        <div
          className="flex flex-wrap gap-3"
          style={{
            animationName: "fadeUp",
            animationDuration: "0.7s",
            animationDelay: "0.25s",
            animationFillMode: "both",
          }}
        >
          <button
            onClick={() => scrollTo("work")}
            className="px-8 py-4 text-base font-semibold text-white transition-all rounded-full hover:opacity-90 active:scale-95"
            style={{ background: "#ef233c" }}
          >
            <span className="flex items-center justify-center gap-2 ">
              View My Work <FaArrowRight />
            </span>
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-4 text-base font-semibold transition-all border rounded-full hover:border-opacity-60"
            style={{
              color: textCol,
              borderColor: borderCol,
              background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            }}
          >
            Get in Touch
          </button>
        </div>

        <div
          className="max-w-lg mt-16 overflow-hidden border rounded-xl"
          style={{
            borderColor: dark ? "#1c1c1c" : "#e5e7eb",
            background: dark ? "#0d0d0d" : "#1e1e2e",
            animationName: "fadeUp",
            animationDuration: "0.8s",
            animationDelay: "0.4s",
            animationFillMode: "both",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{
              borderColor: dark ? "#1c1c1c" : "#2a2a3e",
            }}
          >
            {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
              <div
                key={c}
                className="w-3 h-3 rounded-full"
                style={{ background: c }}
              />
            ))}
            <span
              className="ml-2 text-[11px] font-mono"
              style={{ color: "#52525b" }}
            >
              developer.ts
            </span>
          </div>
          <div className="p-4">
            <CodeLine text="interface Developer {" color="#c084fc" />
            <CodeLine
              text='name: "Subhajeet Dey";'
              indent={1}
              color="#86efac"
            />
            <CodeLine
              text='stack: ["Node.js", "React", "PostgreSQL"];'
              indent={1}
              color="#fbbf24"
            />
            <CodeLine
              text=' role: "Full-Stack Engineer";'
              indent={1}
              color="#86efac"
            />
            <CodeLine
              text=' location: "Alipurduar, West Bengal, India";'
              indent={1}
              color="#86efac"
            />
            <CodeLine
              text=" availableForWork: true;"
              indent={1}
              color="#f70707"
            />
            <CodeLine text="}" color="#c084fc" />
          </div>
        </div>
      </div>
    </section>
  );
}
