import React, { useRef, useCallback } from "react";
import { useReveal } from "../hooks/useReveal";
import { accentPalette, typeBadge } from "../constants/theme";
import type { Project } from "../types/portfolio.types";
import { ArrowRight, ArrowUpRight, Hexagon } from "lucide-react";
import { PiDiamondsFourDuotone } from "react-icons/pi";
import { FaSquare } from "react-icons/fa";
import { TiPin } from "react-icons/ti";

interface ProjectCardProps {
  project: Project;
  dark: boolean;
}

export function ProjectCard({ project, dark }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { ref } = useReveal(0);
  const accent = accentPalette[project.accent];
  const badge = typeBadge[project.type] ?? {
    label: project.type,
    color: "#71717a",
  };
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        ref.current = el;
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() =>
        project.link &&
        project.link !== "#" &&
        window.open(project.link, "_blank", "noreferrer")
      }
      className={`relative overflow-hidden rounded-2xl border group cursor-pointer transition-all duration-700
                  ${project.featured ? "md:col-span-2 md:row-span-2" : ""}
                   opacity-100 translate-y-0`}
      style={{
        padding: project.featured ? "36px" : "28px",
        borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.8)",
        background: dark
          ? project.featured
            ? "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(8,8,8,0.98))"
            : "rgba(14,14,14,0.8)"
          : project.featured
            ? "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.45))"
            : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: dark
          ? "none"
          : "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        transitionDelay: `${project.id * 60}ms`,
      }}
    >
      <div
        className="absolute inset-0 transition-opacity opacity-0 pointer-events-none duration-400 group-hover:opacity"
        style={{
          background: `radial-gradient(ellipse at top right, ${accent.glow})`,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300 border opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100"
        style={{ borderColor: accent.hex + "55" }}
      />
      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex items-center justify-center text-xl border rounded-xl w-11 h-11 shrink-0"
            style={{
              background: accent.bg,
              borderColor: accent.hex + "33",
              color: accent.hex,
            }}
          >
            {project.type === "backend" ? (
              <Hexagon />
            ) : project.type === "frontend" ? (
              <PiDiamondsFourDuotone />
            ) : (
              <FaSquare />
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.pinned && (
              <span
              className="text-[10px] font-mono px-2 py-1 rounded-full flex items-center gap-1 tracking-wide"
              style={{
                background: "rgba(245,158,11,0.1)",
                color: "#f59e0b",
                border: "1px solid rgba(245,158,11,0.2)"
              }}
              >
                <span className="flex items-center justify-center gap-1"><TiPin className="text-red-600 " size={16} />pinned</span>
              </span>
            )}
            <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: badge.color + "15", color: badge.color }}
          >
            {badge.label}
          </span>       
            </div>
        </div>

        <div className="flex-1">
          <h3
            className={`font-bold tracking-tight mb-2 ${project.featured ? "text-2xl" : "text-lg"}`}
            style={{
              color: dark ? "#f4f4f5" : "#0a0a0a",
              letterSpacing: "-0.025em",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.title}
          </h3>
          <p
            className={`leading-relaxed ${project.featured ? "text-[15px]" : "text-sm"}`}
            style={{ color: dark ? "#71717a" : "#525252" }}
          >
            {project.desc}
          </p>
        </div>
        {project.metrics && (
          <div
            className="inline-flex items-center gap-2 px-3 font-mono text-xs py-1.5 rounded-lg w-fit"
            style={{ background: accent.bg, color: accent.hex }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: accent.hex }}
            />
            {project.metrics}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border"
              style={{
                background: dark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.06)",
                borderColor: dark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.1)",
                color: dark ? "#a1a1aa" : "#525252",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between transition-all duration-300 -translate-y-1 opacity-60 group-hover:translate-y-0" >
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: accent.hex }}
          >
            {project.cta}
          </span>
          <span style={{ color: accent.hex }}>
            {project.link && project.link !== "#" ? <ArrowUpRight /> : <ArrowRight />}
          </span>
        </div>
      </div>
    </div>
  );
}
