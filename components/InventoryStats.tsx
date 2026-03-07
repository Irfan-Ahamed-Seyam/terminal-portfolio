import { portfolioData } from "@/lib/data";
import { Cpu, ShieldCheck, BookOpen } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

export function InventoryStats() {
    const { skills, certifications, currently_learning } = portfolioData;
    const typedTechHeader = useTypewriter("Inventory: Tech", 30);
    const typedCertHeader = useTypewriter("Certifications", 30);

    return (
        <section className="mb-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
            <div className="nes-border p-5 h-full flex flex-col bg-black/90 group">
                <h2 className="text-xl uppercase mb-5 flex items-center gap-2 border-b-2 border-primary pb-2 nes-text-shadow group-hover:text-white transition-colors min-h-[28px]">
                    <Cpu size={22} className="shrink-0" /> {typedTechHeader}
                </h2>

                <div className="flex flex-col gap-5 flex-1 mt-2">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="bg-primary/5 p-3 border border-primary/10">
                            <h3 className="text-sm uppercase text-primary/80 mb-2 font-bold tracking-wider shrink-0">
                                [{category.replace(/_and_/g, ' & ').replace(/_/g, ' ')}]
                            </h3>
                            <div className="flex flex-col gap-3">
                                {(items as { group: string, items: string[] }[]).map((subGroup, subIdx) => (
                                    <div key={subIdx}>
                                        <div className="text-primary opacity-80 text-xs mb-1 font-bold tracking-widest uppercase">
                                            &gt; {subGroup.group}:
                                        </div>
                                        <ul className="flex flex-wrap gap-2">
                                            {subGroup.items.map((item, j) => (
                                                <li key={j} className="px-2 py-1 border border-primary/30 text-xs bg-black uppercase tracking-wider hover:bg-primary hover:text-black transition-colors cursor-crosshair">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="nes-border p-5 h-full flex flex-col bg-black/90 group">
                <h2 className="text-xl uppercase mb-5 flex items-center gap-2 border-b-2 border-primary pb-2 nes-text-shadow group-hover:text-white transition-colors min-h-[28px]">
                    <ShieldCheck size={22} className="shrink-0" /> {typedCertHeader}
                </h2>

                <ul className="text-sm md:text-base space-y-4 flex-1 mt-2 bg-primary/5 p-4 border border-primary/10">
                    {certifications.map((cert, idx) => (
                        <li key={idx} className="flex gap-3 items-start hover:translate-x-1 transition-transform">
                            <span className="text-primary font-bold mt-0.5 shrink-0">*</span>
                            <span className="opacity-95 leading-tight">{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="nes-border p-5 h-full flex flex-col bg-primary/5 border-dashed group">
                <h2 className="text-xl uppercase mb-5 flex items-center gap-2 border-b-2 border-primary pb-2 nes-text-shadow">
                    <BookOpen size={22} className="animate-bounce shrink-0" /> Currently Loading...
                </h2>

                <ul className="text-sm md:text-base space-y-6 flex-1 mt-2 p-2">
                    {currently_learning.map((item, idx) => (
                        <li key={idx} className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="animate-pulse font-bold shrink-0">&gt;</span>
                                <span className="font-bold uppercase tracking-widest text-primary/90">{item}</span>
                            </div>
                            <div className="w-full h-2 bg-black border border-primary/50 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-primary/80 strip-pattern"
                                    style={{ width: `${Math.floor(Math.random() * 50) + 20}%` }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
