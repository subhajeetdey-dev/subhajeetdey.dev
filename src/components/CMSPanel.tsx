import React, { useState } from "react";
import { accentPalette, typeBadge } from "../constants/theme";
import type { PortfolioData } from "../types/portfolio.types";
import { Sparkle, Check, X } from "lucide-react";

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  mutedCol: string;
  textCol: string;
  borderCol: string;
  inputBg: string;
}

function FieldInput({
  label,
  value,
  onChange,
  multiline = false,
  mutedCol,
  textCol,
  borderCol,
  inputBg,
}: FieldInputProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{ color: mutedCol }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 font-sans text-sm border rounded-lg outline-none resize-none"
          style={{
            background: inputBg,
            color: textCol,
            borderColor: borderCol,
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 font-sans text-sm border rounded-lg outline-none"
          style={{
            background: inputBg,
            color: textCol,
            borderColor: borderCol,
          }}
        />
      )}
    </div>
  );
}

interface CMSPanelProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onClose: () => void;
  dark: boolean;
}

export function CMSPanel({ data, setData, onClose, dark }: CMSPanelProps) {
  const [tab, setTab] = useState<
    "meta" | "about" | "projects" | "skills" | "testimonial"
  >("meta");
  const [saved, setSaved] = useState(false);

  const bg = dark ? "0a0a0a" : "#fff";
  const textCol = dark ? "#e4e4e7" : "#18181b";
  const mutedCol = dark ? "#52525b" : "#a3a3a3";
  const borderCol = dark ? "#1f1f1f" : "#e5e7eb";
  const inputBg = dark ? "#141414" : "#f4f4f5";

  const fieldProps = { mutedCol, textCol, borderCol, inputBg };

  const update = <S extends keyof PortfolioData>(
    section: S,
    key: string,
    val: unknown,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object) },
      [key]: val,
    }));
  };

  const updateNested = <S extends keyof PortfolioData>(
    section: S,
    index: number,
    key: string,
    val: unknown,
  ) => {
    setData((prev) => {
      const arr = [...(prev[section] as unknown[])];
      arr[index] = { ...(arr[index] as object), [key]: val };
      return { ...prev, [section]: arr };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="flex flex-col w-full max-w-md overflow-hidden shadow-2xl"
        style={{ background: bg, borderLeft: `1px solid ${borderCol}` }}
      >
        <div
          className="flex flex-col items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: borderCol }}
        >
          <div>
            <div
              className="font-mono text-sm font-bold"
              style={{ color: textCol }}
            >
              <span className="flex items-center justify-center gap-1">
                <Sparkle />
                CMS Editor
              </span>
            </div>
            <div
              className="text-[11px] font-mono mt-0.5"
              style={{ color: mutedCol }}
            >
              // edit portfolio
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 200);
                }}
                className="px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all"
                style={{
                  background: saved ? "#22c55e" : "#ef233c",
                  color: "#fff",
                }}
              >
                {saved ? (
                  <span className="flex items-center justify-center gap-1">
                    <Check size={16} strokeWidth={3} />
                    saved
                  </span>
                ) : (
                  "save"
                )}
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center font-mono text-xs rounded-full w-7 h-7"
                style={{ background: inputBg, color: mutedCol }}
              >
                <X size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
          <div
            className="flex gap-1 px-4 py-2 overflow-x-auto border-b"
            style={{ borderColor: borderCol }}
          >
            {(
              ["meta", "about", "projects", "skills", "testimonial"] as const
            ).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all"
                style={{
                  background:
                    tab === t ? (dark ? "#1a1a1a" : "#f0f0f0") : "transparent",
                  color: tab === t ? textCol : mutedCol,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            {tab === "meta" && (
              <>
                <FieldInput
                  {...fieldProps}
                  label="Name"
                  value={data.meta.name}
                  onChange={(v) => update("meta", "name", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="Title"
                  value={data.meta.title}
                  onChange={(v) => update("meta", "title", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="Hero Tagline"
                  value={data.meta.tagline}
                  onChange={(v) => update("meta", "tagline", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="Subtitle"
                  value={data.meta.subtitle}
                  onChange={(v) => update("meta", "subtitle", v)}
                  multiline
                />
                <FieldInput
                  {...fieldProps}
                  label="Email"
                  value={data.meta.email}
                  onChange={(v) => update("meta", "email", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="GitHub URL"
                  value={data.meta.github}
                  onChange={(v) => update("meta", "github", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="LinkedIn URL"
                  value={data.meta.linkedin}
                  onChange={(v) => update("meta", "linkedin", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="X URL"
                  value={data.meta.x}
                  onChange={(v) => update("meta", "x", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="Footer Tagline"
                  value={data.meta.footerTagline}
                  onChange={(v) => update("meta", "footerTagline", v)}
                  multiline
                />
                <div className="flex items-center gap-3 mb-4">
                  <label
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: mutedCol }}
                  >
                    Available for Work{" "}
                  </label>
                  <button
                    onClick={() =>
                      update("meta", "available", !data.meta.available)
                    }
                    className="relative w-10 h-5 transition-all rounded-full"
                    style={{
                      background: data.meta.available ? "#22c55e" : borderCol,
                    }}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: data.meta.available ? "22px" : "2px" }}
                    />
                  </button>
                </div>
              </>
            )}

            {tab === "about" && (
              <>
                <FieldInput
                  {...fieldProps}
                  label="Bio 1"
                  value={data.about.bio1}
                  onChange={(v) => update("about", "bio1", v)}
                  multiline
                />
                <FieldInput
                  {...fieldProps}
                  label="Bio 2"
                  value={data.about.bio2}
                  onChange={(v) => update("about", "bio2", v)}
                  multiline
                />
                <FieldInput
                  {...fieldProps}
                  label="Location"
                  value={data.about.location}
                  onChange={(v) => update("about", "location", v)}
                />
                <div
                  className="text-[10px] font-mono uppercase tracking-widest mb-2"
                  style={{ color: mutedCol }}
                >
                  Stats
                </div>
                {data.about.stats.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      className="w-20 px-2 rounded-lg py-1.5 text-sm border outline-none font-mono"
                      style={{
                        background: inputBg,
                        color: textCol,
                        borderColor: borderCol,
                      }}
                      value={s.number}
                      onChange={(e) =>
                        updateNested("about", i, "number", e.target.value)
                      }
                    />
                    <input
                      className="flex-1 px-2 rounded-lg py-1.5 text-sm border outline-none font-mono"
                      style={{
                        background: inputBg,
                        color: textCol,
                        borderColor: borderCol,
                      }}
                      value={s.label}
                      onChange={(e) =>
                        updateNested("about", i, "label", e.target.value)
                      }
                    />
                  </div>
                ))}
              </>
            )}

            {tab === "projects" && (
              <>
                {data.projects.map((p, i) => (
                  <div
                    key={p.id}
                    className="p-4 mb-5 border rounded-xl"
                    style={{
                      borderColor: borderCol,
                      background: dark ? "#111" : "#f9f9f9",
                    }}
                  >
                    <div
                      className="text-[10px] font-mono uppercase tracking-widest mb-3"
                      style={{ color: "#ef233c" }}
                    >
                      project_{i + 1}
                    </div>
                    <FieldInput
                      {...fieldProps}
                      label="Title"
                      value={p.title}
                      onChange={(v) => updateNested("projects", i, "title", v)}
                    />
                    <FieldInput
                      {...fieldProps}
                      label="Description"
                      value={p.desc}
                      onChange={(v) => updateNested("projects", i, "desc", v)}
                      multiline
                    />
                    <FieldInput
                      {...fieldProps}
                      label="Metrics"
                      value={p.metrics ?? ""}
                      onChange={(v) =>
                        updateNested("projects", i, "metrics", v)
                      }
                      multiline
                    />
                    <FieldInput
                      {...fieldProps}
                      label="CTA Label"
                      value={p.cta}
                      onChange={(v) => updateNested("projects", i, "cta", v)}
                      multiline
                    />
                    <FieldInput
                      {...fieldProps}
                      label="Link"
                      value={p.link}
                      onChange={(v) => updateNested("projects", i, "link", v)}
                      multiline
                    />
                    <div className="mb-3">
                      <label
                        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                        style={{ color: mutedCol }}
                      >
                        Type
                      </label>
                      <div className="flex gap-2">
                        {(["backend", "frontend", "fullstack"] as const).map(
                          (ty) => (
                            <button
                              key={ty}
                              onClick={() =>
                                updateNested("projects", i, "type", ty)
                              }
                              className="px-3 py-1 rounded-lg text-[11px] font-mono border transition-all"
                              style={{
                                background:
                                  p.type === ty
                                    ? typeBadge[ty].color + "15"
                                    : "transparent",
                                borderColor:
                                  p.type === ty
                                    ? typeBadge[ty].color
                                    : borderCol,
                                color:
                                  p.type === ty
                                    ? typeBadge[ty].color
                                    : mutedCol,
                              }}
                            >
                              {ty}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                        style={{ color: mutedCol }}
                      >
                        Accent
                      </label>
                      <div className="flex gap-2">
                        {(["red", "blue", "green", "amber"] as const).map(
                          (c) => (
                            <button
                              key={c}
                              onClick={() =>
                                updateNested("projects", i, "accent", c)
                              }
                              className="w-6 h-6 transition-all border-2 rounded-full"
                              style={{
                                background: accentPalette[c].hex,
                                borderColor:
                                  p.accent === c ? "#fff" : "transparent",
                                transform:
                                  p.accent === c ? "scale(1.2)" : "scale(1)",
                              }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {tab === "skills" && (
              <>
                {data.skills.map((s, i) => (
                  <div
                    key={s.id}
                    className="p-4 mb-5 border rounded-xl"
                    style={{
                      borderColor: borderCol,
                      background: dark ? "#111" : "#f9f9f9",
                    }}
                  >
                    <div
                      className="text-[10px] font-mono uppercase tracking-widest mb-3"
                      style={{ color: "#ef233c" }}
                    >
                      skill_{i + 1}
                    </div>
                    <FieldInput {...fieldProps}
                      label="Title"
                      value={s.title}
                      onChange={(v) => updateNested("skills", i, "title", v)}
                    />
                    <FieldInput {...fieldProps}
                      label="Description"
                      value={s.desc}
                      onChange={(v) => updateNested("skills", i, "desc", v)}
                      multiline
                    />
                    <div className="mb-2">
                      <label
                        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                        style={{ color: mutedCol }}
                      >
                        Tags (comma separated)
                      </label>
                      <input
                        className="w-full px-3 py-2 font-mono text-sm border rounded-lg outline-none"
                        style={{
                          background: inputBg,
                          color: textCol,
                          borderColor: borderCol,
                        }}
                        value={s.tags.join(", ")}
                        onChange={(e) =>
                          updateNested(
                            "skills",
                            i,
                            "tags",
                            e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
            {tab === "testimonial" && (
              <>
                <FieldInput {...fieldProps}
                  label="Quote"
                  value={data.testimonial?.quote ?? ""}
                  onChange={(v) => update("testimonial", "quote", v)}
                  multiline
                />
                <FieldInput
                  label="Author" {...fieldProps}
                  value={data.testimonial?.author ?? ""}
                  onChange={(v) => update("testimonial", "author", v)}
                />
                <FieldInput
                  label="Role" {...fieldProps}
                  value={data.testimonial?.role ?? ""}
                  onChange={(v) => update("testimonial", "role", v)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
