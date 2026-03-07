import { portfolioData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FlaskConical } from "lucide-react";
import { useTypewriter, useTypewriterLines } from "@/hooks/useTypewriter";

export function QuestLog() {
    const { experience, the_lab } = portfolioData;
    const typedExpHeader = useTypewriter("Quest Log: Experience", 20);
    const typedLabHeader = useTypewriter("The Lab (Projects)", 20);

    return (
        <section className="mb-4 w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Experience Section */}
            <div>
                <h2 className="text-2xl uppercase mb-4 flex items-center gap-3 border-b-2 border-primary pb-2 nes-text-shadow min-h-[36px]">
                    <Briefcase size={24} className="shrink-0" /> {typedExpHeader}
                </h2>

                <div className="flex flex-col gap-6">
                    {experience.map((exp, idx) => (
                        <Card key={idx} className="nes-border bg-black/90 rounded-none shadow-none">
                            <CardHeader className="pb-3 border-b-2 border-primary/20 mb-3 bg-primary/5">
                                <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-2">
                                    <CardTitle className="text-xl uppercase font-bold tracking-wide">{exp.role}</CardTitle>
                                    <p className="text-sm opacity-80 whitespace-nowrap bg-black px-2 py-1 border border-primary/50">
                                        [{exp.startDate} - {exp.endDate}]
                                    </p>
                                </div>
                                <p className="text-primary/80 uppercase tracking-widest text-sm mt-1">@ {exp.company}</p>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ul className="list-none space-y-3">
                                    {exp.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex gap-3 text-base leading-relaxed items-start group">
                                            <span className="text-primary font-bold mt-0.5 group-hover:animate-pulse shrink-0">&gt;</span>
                                            <span className="opacity-95">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* The Lab Section */}
            <div>
                <h2 className="text-2xl uppercase mb-4 flex items-center gap-3 border-b-2 border-primary pb-2 nes-text-shadow min-h-[36px]">
                    <FlaskConical size={24} className="shrink-0" /> {typedLabHeader}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {the_lab.map((lab, idx) => (
                        <Card key={idx} className="nes-border bg-black/90 rounded-none flex flex-col h-full shadow-none hover:bg-primary/5 transition-colors duration-300">
                            <CardHeader className="pb-2 border-b border-primary/20 bg-black">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="text-lg uppercase mt-1">{lab.name}</CardTitle>
                                    <Badge
                                        variant="outline"
                                        className={`rounded-none uppercase font-bold tracking-widest text-xs border-primary px-2 py-0 shrink-0 ${lab.status === "Completed" ? "bg-primary text-black" :
                                                lab.status === "Active" ? "bg-black text-primary animate-pulse" :
                                                    "bg-black text-primary/60 border-primary/50"
                                            }`}
                                    >
                                        {lab.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 justify-between gap-5 pt-4">
                                <p className="text-base opacity-95 leading-relaxed bg-black/50 p-2 border-l-2 border-primary/40">
                                    {lab.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {lab.techStack.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 border border-primary/40 text-xs bg-black text-primary uppercase font-bold tracking-wider hover:bg-primary hover:text-black transition-colors cursor-crosshair">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
