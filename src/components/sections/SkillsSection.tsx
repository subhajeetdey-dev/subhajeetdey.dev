import { SectionHeader } from "../ui/SectionHeader"
import { SkillCard } from "../SkillCard"
import type { SkillGroup } from "../../types/portfolio.types"

const MARQUEE_TAGS = [
    "Nojs.js", "React", "TypeScript", "PostgreSQL", "Docker", "GraphQL", "Next.js", "Prisma", "AWS", "Tailwind", "Express",
]

interface SkillsSectionProps{
    skills: SkillGroup[];
    dark: boolean;
    bg: string;
    borderCol: string;
    mutedCol: string;
}

export function SkillsSection({skills, dark, bg, borderCol, mutedCol}: SkillsSectionProps) {
    return(
        <section id="skills" className="px-6 py-28" style={{background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)"}}>
            <div className="max-w-6xl mx-auto">
                <SectionHeader label="expertise" dark={dark}>
                    What I <span style={{color: "#ef233c"}}>Specialise In</span>
                    </SectionHeader>  

                    <p className="mb-12 text-lg text-center" style={{color: mutedCol}}>
                        End-to-end ownership — from schema design to styled component.
                        </p>              

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {skills.map((s,i) => (
                                <SkillCard key={s.id} skill={s} dark={dark} delay={i * 100}/>
                            ))}                            
                        </div>

                        <div className="relative mt-16 overflow-hidden">
                            <div
                            className="absolute top-0 bottom-0 left-0 z-10 w-16 pointer-events-none"
                            style={{background: `linear-gradient(to right, ${bg}, transparent)`}}
                            />                       
                            <div
                            className="absolute top-0 bottom-0 right-0 z-10 w-16 pointer-events-none"
                            style={{background: `linear-gradient(to left, ${bg}, transparent)`}}
                            />
                            <div
                            className="flex gap-6 animate-marquee whitespace-nowrap"
                            >
                                {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((t, i) => (
                                    <span key={i} className="px-4 py-2 font-mono text-sm border rounded-full shrink-0" style={{borderColor: borderCol, color: mutedCol, background: dark ? "rgba(255,255,255,0.03)": "rgba(0,0,0,0.03)"}}>
                                        {t}
                                    </span>
                                ))}
                                </div>              
                        </div>
            </div>
        </section>
    )
}