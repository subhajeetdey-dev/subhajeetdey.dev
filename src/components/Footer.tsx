import type { PortfolioData } from "../types/portfolio.types";

const navLinks = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface FooterProps {
  data: PortfolioData;
  dark: boolean;
  scrollTo: (id: string) => void;
  borderCol: string;
  mutedCol: string;
  textCol: string;
}

export function Footer({
  data,
  dark,
  scrollTo,
  borderCol,
  mutedCol,
  textCol,
}: FooterProps) {
  return (
    <footer
      className="relative px-6 pt-20 pb-10 overflow-hidden"
      style={{
        background: dark ? "#000" : "#efefed",
        borderTop: `1px solid ${borderCol}`,
      }}
    >
      <div className="relative z-10 grid max-w-6xl grid-cols-1 gap-12 mx-auto mb-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="flex items-center justify-center w-5 h-5 text-white rounded-sm text-[10px] font-black"
              style={{ background: "#ef233c", transform: "rotate(45deg)" }}
            >
              <span style={{ transform: "rotate(-45deg)", display: "block" }}>
                SD
              </span>
            </div>

            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{
                color: textCol,
                letterSpacing: "-0.04em",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {data.meta.name}
            </span>
          </div>
          <p
            className="max-w-xs font-mono text-sm leading-relaxed "
            style={{ color: mutedCol }}
          >
            {data.meta.footerTagline}
          </p>
        </div>

        <div>
          <div
            className="text-[10px] font-mono uppercase tracking-widest mb-6"
            style={{ color: "#ef233c" }}
          >
            // navigation
          </div>
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="w-16 font-mono text-sm text-left transition-colors cursor-pointer"
                style={{ color: mutedCol }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef233c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = mutedCol)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div
            className="text-[10px] font-mono uppercase tracking-widest mb-6"
            style={{ color: "#ef233c" }}
          >
            // connect
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "GitHub", href: data.meta.github },
              { label: "LinkedIn", href: data.meta.linkedin },
              { label: "X", href: data.meta.x },
              { label: "Email", href: `mailto:${data.meta.email}` },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-16 font-mono text-sm text-left transition-colors cursor-pointer"
                style={{ color: mutedCol }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef233c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = mutedCol)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none select-none"
        style={{ opacity: 0.05 }}
      >
        <span
          className="font-extrabold"
          style={{
            fontSize: "15vw",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: textCol,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {data.meta.name.split(" ")[0].toUpperCase()}
        </span>
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-between max-w-6xl gap-2 pt-8 mx-auto md:flex-row"
        style={{
          borderTop: `1px solid ${borderCol}`,
          fontSize: 11,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: mutedCol,
        }}
      >
        <span>© 2026 {data.meta.name}. All rights reserved.</span>
        <span>
          Built with <span style={{ color: "#ef233c" }}>♥</span> in India
          <svg width="18" height="12" viewBox="0 0 18 12" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4, marginBottom: 1 }} xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="4" fill="#FF9933" />
            <rect y="4" width="18" height="4" fill="#FFFFFF" />
            <rect y="8" width="18" height="4" fill="#138808" />
            <circle
              cx="9"
              cy="6"
              r="1.5"
              fill="none"
              stroke="#000080"
              strokeWidth="0.4"
            />
            <circle cx="9" cy="6" r="0.3" fill="#000080" />
          </svg>
        </span>
      </div>
    </footer>
  );
}
