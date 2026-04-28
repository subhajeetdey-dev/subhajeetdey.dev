import React from "react";
import { useReveal } from "../../hooks/useReveal";

interface SectionHeaderProps {
  label: string;
  children: React.ReactNode;
  dark: boolean;
}

export function SectionHeader({ label, children, dark }: SectionHeaderProps) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="mb-4 text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        className="inline-flex items-center px-4 font-mono text-xs tracking-widest uppercase py-1.5 rounded-full mb-5 border"
        style={{
          background: "rgba(239,35,60,0.08",
          color: "#ef233c",
          borderColor: "rgba(239,35,60,0.2)",
        }}
      >
        <span>{"// "}</span>
        {label}
      </div>
      <h2
        className="text-4xl font-extrabold tracking-normal md:text-5xl"
        style={{
          color: dark ? "#fafafa" : "#0a0a0a",
          letterSpacing: "-0.03em",
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        }}
      >
        {children}
      </h2>
    </div>
  );
}
