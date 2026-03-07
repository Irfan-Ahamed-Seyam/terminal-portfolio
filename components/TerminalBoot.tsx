import { portfolioData } from "@/lib/data";
import { Terminal, MapPin, User, GraduationCap } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

export function TerminalBoot() {
    const { profile, education } = portfolioData;
    const typedName = useTypewriter(`SYS. boot // ${profile.name}`, 30);
    const typedTitle = useTypewriter(profile.title, 20);
    const typedBio = useTypewriter(`> ${profile.bio}`, 10);
    const typedDegree = useTypewriter(`> ${education.degree}`, 15);

    return (
        <section className="mb-8 w-full animate-in fade-in zoom-in duration-500">
            <div className="nes-border p-6 flex flex-col gap-4 bg-black/95">
                <div className="flex items-center gap-3 border-b-2 border-primary pb-2 mb-2">
                    <Terminal size={24} className="animate-pulse text-primary shrink-0" />
                    <h1 className="text-2xl sm:text-3xl uppercase tracking-widest nes-text-shadow m-0 font-bold min-h-[36px]">
                        {typedName}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl uppercase text-primary/90 flex items-center gap-2 min-h-[28px]">
                            <User size={18} className="shrink-0" /> {typedTitle}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-primary/80">
                            <MapPin size={16} className="shrink-0" /> {profile.location}
                        </div>
                        <div className="mt-2 leading-relaxed text-sm md:text-base opacity-95 min-h-[120px]">
                            <p>{typedBio}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 border-t-2 md:border-t-0 md:border-l-2 border-primary/30 pt-4 md:pt-0 md:pl-6 pl-0">
                        <h3 className="text-lg uppercase flex items-center gap-2 text-primary/90 mb-2">
                            <GraduationCap size={18} className="shrink-0" /> Education Data
                        </h3>
                        <div className="bg-primary/5 p-3 border border-primary/20">
                            <p className="font-bold text-base min-h-[48px]">{typedDegree}</p>
                            <p className="opacity-80 text-sm mt-1">{education.institution}</p>
                            <p className="opacity-60 text-xs mt-3 italic before:content-['//_']">
                                {education.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
