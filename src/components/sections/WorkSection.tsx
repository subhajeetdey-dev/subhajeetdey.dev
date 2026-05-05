import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "../../types/portfolio.types";

interface WorkSectionProps {
  projects: Project[];
  dark: boolean;
  skillFilter: "all" | "full-stack" | "backend" | "frontend";
  setSkillFilter: (f: "all" | "full-stack" | "backend" | "frontend") => void;
  borderCol: string;
  mutedCol: string;
}

export function WorkSection({
  projects,
  dark,
  skillFilter,
  setSkillFilter,
  borderCol,
  mutedCol,
}: WorkSectionProps) {
  const filteredProjects =
    skillFilter === "all"
      ? projects
      : projects.filter(
          (p) => p.type === skillFilter || p.type === "fullstack",
        );
  return (
    <section id="work" className="px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="selected work" dark={dark}>
          Projects I've <span style={{ color: "#ef233c" }}>Built</span>
          <div className="flex justify-center gap-2 mt-6 mb-12">
            {(["all", "full-stack", "backend", "frontend"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSkillFilter(f)}
                className="px-5 py-2 font-mono text-sm transition-all border rounded-full"
                style={{
                  background: skillFilter === f ? "#ef233c" : "transparent",
                  borderColor: skillFilter === f ? "#ef233c" : borderCol,
                  color: skillFilter === f ? "#fff" : mutedCol,
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 auto-rows-fr">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} dark={dark} />
            ))}
          </div>
        </SectionHeader>
      </div>
    </section>
  );
}
