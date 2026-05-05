import type React from "react";
import type { PortfolioData } from "../../types/portfolio.types";
import { FaCheck } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

interface ContactSectionProps {
  data: PortfolioData;
  dark: boolean;
  emailVal: string;
  setEmailVal: (v: string) => void;
  contactSent: boolean;
  handleContact: (e: React.FormEvent) => void;
  borderCol: string;
  mutedCol: string;
  textCol: string;
}

export function ContactSection({
  data,
  dark,
  emailVal,
  setEmailVal,
  contactSent,
  handleContact,
  borderCol,
  mutedCol,
  textCol,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="px-6 py-32 text-center"
      style={{
        background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 font-mono text-sm" style={{ color: mutedCol }}>
          <span style={{ color: "#ef233c" }}>await</span>{" "}
          <span style={{ color: dark ? "#60a5fa" : "#2563eb" }}>
            sendMessage
          </span>
          <span style={{ color: mutedCol }}>(</span>
          <span style={{ color: dark ? "#f59e0b" : "#d97706" }}>
            "subhajeetwork@gmail.com"
          </span>
          <span style={{ color: mutedCol }}>)</span>
        </div>
        <h2
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
          style={{
            color: textCol,
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Let's <span style={{ color: "#ef233c" }}>Build</span> Together
        </h2>

        <p className="mb-12 text-xl" style={{ color: mutedCol }}>
          Open to full-time roles, freelance contracts, and interesting
          collaborations.
          <br />I respond within 24 hours
        </p>

        <form
          onSubmit={handleContact}
          className="flex flex-col max-w-md gap-3 mx-auto mb-10 sm:flex-row"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            required
            className="flex-1 px-6 py-4 font-mono text-base border rounded-full outline-none"
            style={{
              background: dark ? "rgba(255,255,255,0.04)" : "#fff",
              borderColor: borderCol,
              color: textCol,
            }}
          />
          <button
            type="submit"
            className="px-8 py-4 text-base font-bold text-white transition-all rounded-full cursor-pointer"
            style={{
              background: contactSent ? "#22c55e" : "#ef233c",
              whiteSpace: "nowrap",
            }}
          >
            {contactSent ? (
              <span className="flex items-center justify-center gap-1">
                Sent! <FaCheck />
              </span>
            ) : (
              "Get in Touch"
            )}
          </button>
        </form>

        <div className="flex justify-center gap-3">
          {[
            { icon: <FaGithub />, href: data.meta.github, title: "GitHub" },
            {
              icon: <FaLinkedin />,
              href: data.meta.linkedin,
              title: "LinkedIn",
            },
            { icon: <FaXTwitter/>, href: data.meta.x, title: "X" },
            {
              icon: <CiMail/>,
              href: `mailto:${data.meta.email}`,
              title: "Email",
            },
          ].map(({icon, href, title}) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" title={title} className="flex items-center justify-center w-12 h-12 font-mono text-sm font-bold transition-all border rounded-full" style={{borderColor: borderCol, color: mutedCol}} 
            onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ef233c";
                e.currentTarget.style.borderColor = "#ef233c";
                e.currentTarget.style.background = "rgba(239,35,60,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = mutedCol;
              e.currentTarget.style.borderColor = borderCol;
              e.currentTarget.style.background = "transparent";
            }}>{icon}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
