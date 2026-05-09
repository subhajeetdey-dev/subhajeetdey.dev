import React, { useState, type JSX } from "react";
import {
  X,
  User,
  FolderGit2,
  Wrench,
  Info,
  MessageSquareQuote,
  Plus,
  Trash2,
  GitBranch,
  Loader2,
  Check,
  LogOut,
} from "lucide-react";
import { accentPalette, typeBadge } from "../constants/theme";
import type { PortfolioData, Project } from "../types/portfolio.types";
import { fetchGithubRepo } from "../utils/fetchGithubRepo";

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  mutedCol: string;
  textCol: string;
  borderCol: string;
  inputBg: string;
  placeholder?: string;
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
  placeholder,
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
          rows={5}
          value={value}
          placeholder={placeholder}
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
          placeholder={placeholder}
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

function Toggle({
  value,
  onChange,
  borderCol,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  borderCol: string;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-5 transition-all rounded-full cursor-pointer shrink-0"
      style={{ background: value ? "#22c55e" : borderCol }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
        style={{ left: value ? "22px" : "2px" }}
      />
    </button>
  );
}

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "about", label: "About", icon: Info },
  { id: "testimonial", label: "Testimonial", icon: MessageSquareQuote },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface AdminDashboardProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onClose: () => void;
  onLogout: () => void;
  dark: boolean;
}

const NEW_PROJECT: Omit<Project, "id"> = {
  title: "New Project",
  desc: "",
  stack: [],
  type: "fullstack",
  accent: "red",
  featured: false,
  cta: "View Project",
  link: "",
  metrics: "",
};

export function AdminDashboard({
  data,
  setData,
  onClose,
  onLogout,
  dark,
}: AdminDashboardProps): JSX.Element {
  const [tab, setTab] = useState<TabId>("profile");
  const [saved, setSaved] = useState(false);
  const [githubUrls, setGithubUrls] = useState<Record<number, string>>({});
  const [fetching, setFetching] = useState<Record<number, boolean>>({});
  const [fetchStatus, setFetchStatus] = useState<
    Record<number, "success" | "error" | "">
  >({});

  const bg = dark ? "#0a0a0a" : "#fff";
  const textCol = dark ? "#e4e4e7" : "#18181b";
  const mutedCol = dark ? "#52525b" : "#a3a3a3";
  const borderCol = dark ? "#1f1f1f" : "#e5e7eb";
  const inputBg = dark ? "#141414" : "#f4f4f5";
  const sidebarBg = dark ? "#060606" : "#f7f7f5";
  const fieldProps = { mutedCol, textCol, borderCol, inputBg };

  const update = <S extends keyof PortfolioData>(
    section: S,
    key: string,
    val: unknown,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object), [key]: val },
    }));
  };


  const getBadge = (type: string) => typeBadge[type] ?? { label: type, color: "#71717a" };

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

  const addProjects = () => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...NEW_PROJECT, id: Date.now() }],
    }));
  };

  const removeProject = (id: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGithubFetch = async (i: number) => {
    const url = githubUrls[i];
    if (!url) return;
    setFetching((prev) => ({ ...prev, [i]: true }));
    setFetchStatus((prev) => ({ ...prev, [i]: "" }));

    const result = await fetchGithubRepo(url);
    if (result) {
      setData((prev) => {
        const projects = [...prev.projects];
        projects[i] = {
          ...projects[i],
          title: result.title,
          desc: result.desc,
          link: result.link,
          type: result.type,
          ...(result.stack.length > 0 ? {stack: result.stack}: {}),
        };
        return {...prev, projects};
      });
      setFetchStatus((prev) => ({ ...prev, [i]: "success"}));
    } else {
      setFetchStatus((prev) => ({ ...prev, [i]: "error" }));
    }
    setFetching((prev) => ({ ...prev, [i]: false }));
  };

    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="flex-1 cursor-pointer bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className="flex w-full h-full max-w-2xl overflow-hidden shadow-2xl shrink-0"
          style={{ background: bg, borderLeft: `1px solid ${borderCol}` }}
        >
          <div
            className="flex flex-col h-full py-6 border-r w-52 shrink-0"
            style={{ background: sidebarBg, borderColor: borderCol }}
          >
            <div className="px-5 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{ background: "#ef233c" }}
                >
                  <span className="text-white text-[10px] font-black">A</span>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{
                    color: textCol,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Admin
                </span>
              </div>
              <p className="text-[10px] font-mono" style={{ color: mutedCol }}>
                // portfolio dashboard
              </p>
            </div>

            <nav className="flex flex-col flex-1 gap-1 px-3">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left"
                  style={{
                    background:
                      tab === id ? "rgba(239,35,60,0.1)" : "transparent",
                    color: tab === id ? "#ef233c" : mutedCol,
                    borderLeft:
                      tab === id
                        ? "2px solid #ef233c"
                        : "2px solid transparent",
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-2 px-3 mt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center w-full gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                style={{
                  background: saved ? "#22c55e" : "#ef233c",
                  color: "#fff",
                }}
              >
                {saved ? (
                  <>
                    <Check size={13} />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={onLogout}
                className="flex items-center justify-center w-full gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border"
                style={{ borderColor: borderCol, color: mutedCol }}
              >
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
            <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ borderColor: borderCol }}
          >
            <div>
              <h2
                className="text-base font-bold"
                style={{
                  color: textCol,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {TABS.find((t) => t.id === tab)?.label}
              </h2>
              <p className="text-[11px] font-bold" style={{ color: mutedCol }}>
                //{" "}
                {tab === "projects"
                  ? `${data.projects.length} projects`
                  : "edit portfolio"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 transition-all border rounded-full cursor-pointer"
              style={{ borderColor: borderCol, color: mutedCol }}
            >
              <X size={15} color="#ef233c"/>
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {tab === "profile" && (
              <div>
                <FieldInput
                  {...fieldProps}
                  label="Name"
                  value={data.meta.name}
                  onChange={(v) => update("meta", "name", v)}
                />
                <FieldInput
                  {...fieldProps}
                  label="Title / Role"
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
                <div
                  className="flex items-center justify-between px-4 py-3 border rounded-xl"
                  style={{ borderColor: borderCol }}
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: textCol }}
                    >
                      Available for Work
                    </p>
                  </div>
                  <Toggle
                    value={data.meta.available}
                    onChange={(v) => update("meta", "available", v)}
                    borderCol={borderCol}
                  />
                </div>
              </div>
            )}

            {tab === "projects" && (
              <div>
                <button
                  onClick={addProjects}
                  className="flex items-center justify-center w-full gap-2 py-3 mb-6 font-mono text-sm transition-all border-2 border-dashed cursor-pointer rounded-xl"
                  style={{
                    borderColor: "rgba(239, 35, 60,0.3)",
                    color: "#ef233c",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(239,35,60,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Plus size={15} /> Add New Project
                </button>
                {data.projects.map((p, i) => (
                  <div
                    key={p.id}
                    className="mb-6 overflow-hidden border rounded-2xl"
                    style={{
                      borderColor: borderCol,
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{
                        background: dark ? "#0d0d0d" : "#f9f9f9",
                        borderColor: borderCol,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: accentPalette[p.accent].hex }}
                        />
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: textCol }}
                        >
                          {p.title || `project_${i + 1}`}
                        </span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            background: getBadge(p.type).color + "15",
                            color: getBadge(p.type).color,
                          }}
                        >
                          {p.type}
                        </span>
                      </div>
                      <button
                        onClick={() => removeProject(p.id)}
                        className="flex items-center justify-center transition-all rounded-lg cursor-pointer w-7 h-7"
                        style={{ color: mutedCol }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(239,35,60,0.1)";
                          e.currentTarget.style.color = "#ef233c";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = mutedCol;
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="p-4">
                      <div
                        className="p-3 mb-4 border rounded-xl"
                        style={{
                          borderColor: "rgba(239,35,60,0.2)",
                          background: "rgba(239,35,60,0.03)",
                        }}
                      >
                        <label
                          className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                          style={{ color: "#ef233c" }}
                        >
                          <span className="flex items-center gap-1.5">
                            <GitBranch size={11} /> Import from GitHub
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://github.com/user/repo"
                            value={githubUrls[i] ?? ""}
                            onChange={(e) =>
                              setGithubUrls((prev) => ({
                                ...prev,
                                [i]: e.target.value,
                              }))
                            }
                            className="flex-1 px-3 py-1.5 text-xs border rounded-lg outline-none font-mono"
                            style={{
                              background: inputBg,
                              color: textCol,
                              borderColor: borderCol,
                            }}
                          />
                          <button
                            onClick={() => handleGithubFetch(i)}
                            disabled={fetching[i] || !githubUrls[i]}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                            style={{
                              background: fetching[i] ? borderCol : "#ef233c",
                              color: fetching[i] ? mutedCol : "#fff",
                              cursor:
                                fetching[i] || !githubUrls[i]
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {fetching[i] ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />{" "}
                                Fetching
                              </>
                            ) : (
                              <>
                                <GitBranch size={12} /> Fetch
                              </>
                            )}
                          </button>
                        </div>
                        {fetchStatus[i] === "success" && (
                          <p
                            className="text-[10px] font-mono mt-1.5 flex items-center gap-1"
                            style={{ color: "#22c55e" }}
                          >
                            <Check size={10} /> Auto-filled from GitHub — review
                            below
                          </p>
                        )}
                        {fetchStatus[i] === "error" && (
                          <p
                            className="text-[10px] font-mono mt-1.5"
                            style={{ color: "#ef233c" }}
                          >
                            <div className="flex items-center gap-1.5">
                              <X size={12}/> Repo not found or is private
                            </div>
                          </p>
                        )}
                      </div>
                      <FieldInput
                        {...fieldProps}
                        label="Title"
                        value={p.title}
                        onChange={(v) =>
                          updateNested("projects", i, "title", v)
                        }
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
                        placeholder="e.g. 100k jobs/day"
                      />
                      <FieldInput
                        {...fieldProps}
                        label="CTA Label"
                        value={p.cta}
                        onChange={(v) => updateNested("projects", i, "cta", v)}
                      />
                      <FieldInput
                        {...fieldProps}
                        label="Link"
                        value={p.link}
                        onChange={(v) => updateNested("projects", i, "link", v)}
                        placeholder="https://..."
                      />
                      <div className="mb-4">
                        <label
                          className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                          style={{ color: mutedCol }}
                        >
                          Stack (comma separated)
                        </label>
                        <input
                          className="w-full px-3 py-2 font-mono text-xs border rounded-lg outline-none"
                          style={{
                            background: inputBg,
                            color: textCol,
                            borderColor: borderCol,
                          }}
                          value={p.stack.join(", ")}
                          placeholder="React, Node.js, PostgreSQL"
                          onChange={(e) =>
                            updateNested(
                              "projects",
                              i,
                              "stack",
                              e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            )
                          }
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-[10px] font-mono uppercase tracking-widest mb-2"
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
                                className="flex-1 py-2 rounded-lg text-[11px] font-mono border transition-all cursor-pointer"
                                style={{
                                  background:
                                    p.type === ty
                                      ? getBadge(ty).color + "15"
                                      : "transparent",
                                  borderColor:
                                    p.type === ty
                                      ? getBadge(ty).color
                                      : borderCol,
                                  color:
                                    p.type === ty
                                      ? getBadge(ty).color
                                      : mutedCol,
                                }}
                              >
                                {ty}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label
                            className="block text-[10px] font-mono uppercase tracking-widest mb-2"
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
                                  className="w-6 h-6 transition-all border-2 rounded-full cursor-pointer"
                                  style={{
                                    background: accentPalette[c].hex,
                                    borderColor:
                                      p.accent === c ? "#fff" : "transparent",
                                    transform:
                                      p.accent === c
                                        ? "scale(1.25)"
                                        : "scale(1)",
                                  }}
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-mono uppercase tracking-widest"
                            style={{ color: mutedCol }}
                          >
                            Featured
                          </span>
                          <Toggle
                            value={p.featured}
                            onChange={(v) =>
                              updateNested("projects", i, "featured", v)
                            }
                            borderCol={borderCol}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "skills" && (
              <div>
                {data.skills.map((s, i) => (
                  <div
                    key={s.id}
                    className="m-5 overflow-hidden border b-5 rounded-2xl"
                    style={{
                      borderColor: borderCol,
                    }}
                  >
                    <div
                      className="px-4 py-3 border-b text-[10px] font-mono uppercase tracking-widest"
                      style={{
                        background: dark ? "#0d0d0d" : "#f9f9f9",
                        borderColor: borderCol,
                        color: "#ef233c",
                      }}
                    >
                      {s.category === "backend"
                        ? "// server-side"
                        : "// client-side"}
                    </div>
                    <div className="p-4">
                      <FieldInput
                        {...fieldProps}
                        label="Title"
                        value={s.title}
                        onChange={(v) => updateNested("skills", i, "title", v)}
                      />
                      <FieldInput
                        {...fieldProps}
                        label="Description"
                        value={s.desc}
                        onChange={(v) => updateNested("skills", i, "desc", v)}
                        multiline
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 mx-5"
                        style={{ color: mutedCol }}
                      >
                        Tags (comma separated)
                      </label>
                      <div className="px-5">
                        <input
                        className="w-full px-3 py-2 font-mono text-sm border rounded-lg outline-none h-14"
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
                  </div>
                ))}
              </div>
            )}

            {tab === "about" && (
              <div className="w-full">
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
                  placeholder="Based in..."
                />
                <div className="mt-2 mb-1">
                  <label
                    className="block text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: mutedCol }}
                  >
                    Stats
                  </label>

                  {data.about.stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input
                        className="w-24 px-3 py-2 font-mono text-sm text-center border rounded-lg outline-none"
                        style={{
                          background: inputBg,
                          color: "#ef233c",
                          borderColor: borderCol,
                          fontWeight: 700,
                        }}
                        value={s.number}
                        onChange={(e) =>
                          updateNested("about", i, "number", e.target.value)
                        }
                      />
                      <input
                        className="flex-1 px-3 py-2 text-sm border rounded-lg outline-none"
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
                </div>
              </div>
            )}

            {tab === "testimonial" && (
              <div>
                <div
                  className="p-4 mb-6 border rounded-xl"
                  style={{
                    borderColor: "rgba(239,35,60,0.2)",
                    background: "rgba(239,35,60,0.03)",
                  }}
                >
                  <p>
                    This quote appears in the About section.
                  </p>
                </div>
                <FieldInput
                  {...fieldProps}
                  label="Quote"
                  value={data.testimonial?.quote ?? ""}
                  onChange={(v) => update("testimonial", "quote", v)}
                  multiline
                />
                <FieldInput
                  label="Author"
                  {...fieldProps}
                  value={data.testimonial?.author ?? ""}
                  onChange={(v) => update("testimonial", "author", v)}
                  placeholder="Mr. Arian Khanna"
                />
                <FieldInput
                  label="Author Role"
                  {...fieldProps}
                  value={data.testimonial?.role ?? ""}
                  onChange={(v) => update("testimonial", "role", v)}
                  placeholder="CTO at Microsoft"
                />
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    );
  };

