export const accentPalette = {
  red: {
    hex: "#ef233c",
    glow: "rgba(239,35,60,0.18)",
    bg: "rgba(239,35,60,0.08)",
  },
  blue: {
    hex: "#3b82f6",
    glow: "rgba(59,130,246,0.18)",
    bg: "rgba(59,130,246,0.08)",
  },
  green: {
    hex: "#22c55e",
    glow: "rgba(34,197,94,0.18)",
    bg: "rgba(34,197,94,0.08)",
  },
  amber: {
    hex: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    bg: "rgba(245,158,11,0.08)",
  },
} as const;

export const typeBadge: Record<string, { label: string; color: string }> = {
  backend: { label: "Backend", color: "#22c55e" },
  frontend: { label: "Frontend", color: "#3b82f6" },
  fullstacl: { label: "Full-Stack", color: "#ef233c" },
};
