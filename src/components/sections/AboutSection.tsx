import { SectionHeader } from "../ui/SectionHeader";
import type { PortfolioData } from "../../types/portfolio.types";
import { MapPin } from "lucide-react";

interface AboutSectionProps {
  data: PortfolioData;
  dark: boolean;
  borderCol: string;
  mutedCol: string;
  textCol: string;
}

export function AboutSection({
  data,
  dark,
  borderCol,
  mutedCol,
  textCol,
}: AboutSectionProps) {
  return (
    <section id="about" className="px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="about me" dark={dark}>
          The Engineer <span style={{ color: "#ef233c" }}>Behind the code</span>
        </SectionHeader>

        <div className="grid items-center grid-cols-1 gap-12 mt-12 lg:grid-cols-2">
          <div>
            <p
              className="mb-5 text-lg leading-relaxed"
              style={{ color: mutedCol, lineHeight: 1.75 }}
            >
              {data.about.bio1}
            </p>
            <p
              className="mb-8 text-lg leading-relaxed"
              style={{ color: mutedCol, lineHeight: 1.75 }}
            >
              {data.about.bio2}
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-sm border rounded-full"
              style={{ borderColor: borderCol, color: mutedCol }}
            >
              <span className="flex items-center justify-center gap-3">
                <MapPin color="#f20f07" /> {data.about.location}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-4">
              {data.about.stats.map((s) => (
                <div
                  key={s.label}
                  className="p-5 text-center border rounded-2xl"
                  style={{
                    borderColor: borderCol,
                    background: dark ? "#0d0d0d" : "#fff",
                  }}
                >
                  <div
                    className="mb-1 text-3xl font-black tracking-tight"
                    style={{
                      color: "#ef233c",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.number}
                  </div>
                  <div
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: mutedCol }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="relative overflow-hidden border rounded-2xl p-7"
              style={{
                borderColor: borderCol,
                background: dark ? "#0d0d0d" : "#fff",
              }}
            >
              <div
                className="absolute text-6xl font-black select-none top-5 right-6"
                style={{
                  color: "#ef233c",
                  opacity: 0.08,
                  fontFamily: "'Georgia', serif",
                }}
              >
                "
              </div>
              <p
                className="relative z-10 mb-5 text-sm italic leading-relaxed"
                style={{ color: mutedCol }}
              >
                "{data.testimonial?.quote}"{/* Add testimonials latter  */}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center text-sm font-bold text-white rounded-full w-9 h-9 shrink-0"
                  style={{ background: "#ef233c" }}
                >
                  {data.testimonial?.author[0]}
                </div>

                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: textCol }}
                  >
                    {data.testimonial?.author}
                  </div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: mutedCol }}
                  >
                    {data.testimonial?.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
