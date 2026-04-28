import { useReveal } from "../hooks/useReveal";
import { accentPalette } from "../constants/theme";
import type { SkillGroup } from "../types/portfolio.types";

interface SkillCardProps {
  skill: SkillGroup;
  dark: boolean;
  delay?: number;
}

export function SkillCard({ skill, dark, delay = 0 }: SkillCardProps) {
  const { ref, visible } = useReveal();
  const isBackend = skill.category === "backend";
  const accent = isBackend ? accentPalette.green : accentPalette.blue;

  return (
    <div
      ref={ref}
      className="p-8 transition-all duration-500 border rounded-2xl group"
      style={{
        borderColor: dark ? "#1f1f1f" : "#e5e7eb",
        background: dark ? "#0d0d0d" : "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
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
              borderColor: dark ? "#2a2a2a" : "#525252",
              color: dark ? "#a1a1aa" : "#525252",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
