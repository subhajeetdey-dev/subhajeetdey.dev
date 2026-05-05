import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { accentPalette } from "../constants/theme";
import type { SkillGroup } from "../types/portfolio.types";

interface SkillCardProps {
  skill: SkillGroup;
  dark: boolean;
  delay?: number;
}

export function SkillCard({ skill, dark, delay = 0 }: SkillCardProps) {
  const { ref: revealRef, visible } = useReveal();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  const isBackend = skill.category === "backend";
  const accent = isBackend ? accentPalette.green : accentPalette.blue;

  const animName = isBackend ? "lightning-march-green" : "lightning-march-blue";
  const dashOffset = isBackend ? "0" : "-800";
  const [dashCycle, setDashCycle] = useState(2000);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const svg = svgRef.current;
      const rect = rectRef.current;
      if (!wrapper || !svg || !rect) return;

      const w = wrapper.offsetWidth;
      const h = wrapper.offsetHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      rect.setAttribute("width", String(w - 2));
      rect.setAttribute("height", String(h - 2));
      const perimeter = 2 * (w - 2 + (h - 2));
      rect.style.strokeDasharray = `60 ${perimeter}`;
      setDashCycle(perimeter + 60);
    };

    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes lightning-march-green {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -${dashCycle}; }
        }
        @keyframes lightning-march-blue {
          0%   { stroke-dashoffset: -800; }
          100% { stroke-dashoffset: -${800 + dashCycle}; }
        }
      `}</style>

      <div ref={wrapperRef} style={{ position: "relative", borderRadius: 16 }}>

        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 16,
            pointerEvents: "none",
            zIndex: 10,
            overflow: "visible",
          }}
        >
          <rect
            ref={rectRef}
            x="1"
            y="1"
            rx="15"
            ry="15"
            fill="none"
            stroke={accent.hex}
            strokeWidth="2"
            strokeDashoffset={dashOffset}
            style={{
              filter: `drop-shadow(0 0 8px ${accent.hex}) drop-shadow(0 0 20px ${accent.hex}99)`,
              animation: `${animName} 5s linear infinite`,
            }}
          />
        </svg>

        <div
          ref={revealRef as React.RefObject<HTMLDivElement>}
          className="relative p-8 transition-all duration-500 border rounded-2xl group"
          style={{
            borderColor: dark ? "#1f1f1f" : "#e5e7eb",
            background: dark ? "#0d0d0d" : "#fff",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            zIndex: 1,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex items-center justify-center w-10 h-10 text-lg border rounded-xl"
              style={{
                background: accent.bg,
                borderColor: accent.hex + "33",
                color: accent.hex,
              }}
            >
              {skill.icon}
            </div>
            <div>
              <div
                className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
                style={{ color: accent.hex }}
              >
                {skill.category === "backend" ? "// server-side" : "// client-side"}
              </div>
              <h3
                className="text-xl font-bold"
                style={{
                  color: dark ? "#f4f4f5" : "#0a0a0a",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {skill.title}
              </h3>
            </div>
          </div>

          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: dark ? "#71717a" : "#525252" }}
          >
            {skill.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all group-hover:border-opacity-50"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  borderColor: dark ? "#2a2a2a" : "#d4d4d4",
                  color: dark ? "#a1a1aa" : "#525252",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}