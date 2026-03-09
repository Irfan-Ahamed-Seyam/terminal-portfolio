"use client";

import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import { Terminal } from "lucide-react";
import { TerminalBoot } from "@/components/TerminalBoot";
import { portfolioData } from "@/lib/data";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useTypewriterLines } from "@/hooks/useTypewriter";
import { TypewriterText } from "@/components/TypewriterText";

let audioCtx: AudioContext | null = null;

const playSound = (type: 'tick' | 'enter') => {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'tick') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'enter') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.15);
    }
  } catch (e) {
    console.error("Audio blocked or unsupported", e);
  }
};

const InteractiveCommand = ({ cmd, label, onExecute, className = "", delay = 0 }: { cmd: string, label: string, onExecute: (cmd: string) => void, className?: string, delay?: number }) => (
  <span
    onClick={() => {
      playSound('enter');
      onExecute(cmd);
    }}
    className={`cursor-pointer transition-colors duration-100 hover:bg-[#39ff14] hover:text-black font-bold border border-transparent hover:border-[#39ff14] px-1 ${className}`}
  >
    <TypewriterText text={label} delay={delay} speed={5} />
  </span>
);

const HelpOutput = ({ onExecute }: { onExecute: (cmd: string) => void }) => {
  return (
    <div className="text-[#39ff14] font-sans mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-1">
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="help" label="help" onExecute={onExecute} className="w-16 inline-block" delay={0} />
          <span className="opacity-80"><TypewriterText text="- show this message" delay={50} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="whoami" label="whoami" onExecute={onExecute} className="w-16 inline-block" delay={150} />
          <span className="opacity-80"><TypewriterText text="- display profile information" delay={200} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="ls" label="ls" onExecute={onExecute} className="w-16 inline-block" delay={300} />
          <span className="opacity-80"><TypewriterText text="- list available documents" delay={350} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="cat" label="cat" onExecute={onExecute} className="w-16 inline-block" delay={450} />
          <span className="opacity-80"><TypewriterText text="- read a document" delay={500} speed={5} /></span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="neofetch" label="neofetch" onExecute={onExecute} className="w-16 inline-block" delay={600} />
          <span className="opacity-80"><TypewriterText text="- display system information" delay={650} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="ping 1.1.1.1" label="ping" onExecute={onExecute} className="w-16 inline-block" delay={750} />
          <span className="opacity-80"><TypewriterText text="- verify network connection" delay={800} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="cmatrix" label="cmatrix" onExecute={onExecute} className="w-16 inline-block" delay={900} />
          <span className="opacity-80"><TypewriterText text="- initialize digital rain" delay={950} speed={5} /></span>
        </div>
        <div className="flex gap-4 items-baseline">
          <InteractiveCommand cmd="clear" label="clear" onExecute={onExecute} className="w-16 inline-block" delay={1050} />
          <span className="opacity-80"><TypewriterText text="- clear terminal output" delay={1100} speed={5} /></span>
        </div>
      </div>
    </div>
  );
};

const LsOutput = ({ onExecute }: { onExecute: (cmd: string) => void }) => {
  return (
    <div className="text-[#39ff14] mt-2 font-bold tracking-widest flex flex-wrap gap-4">
      <InteractiveCommand cmd="cat experience.txt" label="experience.txt" onExecute={onExecute} delay={0} />
      <InteractiveCommand cmd="cat projects.txt" label="projects.txt" onExecute={onExecute} delay={100} />
      <InteractiveCommand cmd="cat skills.txt" label="skills.txt" onExecute={onExecute} delay={200} />
      <InteractiveCommand cmd="cat certifications.txt" label="certifications.txt" onExecute={onExecute} delay={300} />
      <InteractiveCommand cmd="cat contacts.txt" label="contacts.txt" onExecute={onExecute} delay={400} />
    </div>
  );
};

const ExperienceOutput = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-[#39ff14]/70 mb-2 font-bold"><TypewriterText text="cat experience.txt [LOADING... OK]" delay={0} speed={5} /></div>
      {portfolioData.experience.map((exp, i) => (
        <div key={i} className="nes-border p-4 bg-black/50 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
          <div className="flex flex-col sm:flex-row justify-between border-b-2 border-[#39ff14]/30 pb-2 mb-2 gap-2">
            <span className="uppercase font-bold text-lg text-[#39ff14]">
              <TypewriterText text={`${exp.role} @ ${exp.company}`} delay={200 + (i * 300)} speed={5} />
            </span>
            <span className="bg-[#39ff14]/20 px-2 border border-[#39ff14]/50 text-sm w-fit">
              <TypewriterText text={`[${exp.startDate} - ${exp.endDate}]${exp.endDate === 'Present' ? ' // ACTIVE' : ''}`} delay={300 + (i * 300)} speed={5} />
            </span>
          </div>
          <ul className="space-y-2 mt-2 text-sm sm:text-base">
            {exp.responsibilities.map((r, j) => (
              <li key={j} className="flex gap-2">
                <span className="text-[#39ff14] shrink-0">&gt;</span>
                <span className="opacity-90"><TypewriterText text={r} delay={450 + (i * 300) + (j * 150)} speed={5} /></span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const LabOutput = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-[#39ff14]/70 mb-2 font-bold"><TypewriterText text="cat projects.txt [LOADING... OK]" delay={0} speed={5} /></div>
      <div className="grid grid-cols-1 gap-4">
        {portfolioData.the_lab.map((lab, i) => (
          <div key={i} className="nes-border p-4 bg-black/50 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
            <div className="flex justify-between items-start border-b-2 border-[#39ff14]/30 pb-2 mb-2 gap-2">
              <span className="uppercase font-bold text-lg text-[#39ff14]">
                <TypewriterText text={lab.name} delay={200 + (i * 300)} speed={5} />
              </span>
              <span className={`px-2 py-0.5 text-xs font-bold uppercase border shrink-0 ${lab.status === 'Completed' ? 'bg-[#39ff14] text-black border-[#39ff14]' : lab.status === 'Active' ? 'bg-black text-[#39ff14] border-[#39ff14] animate-pulse' : 'bg-black text-[#39ff14]/60 border-[#39ff14]/50'}`}>
                {lab.status}
              </span>
            </div>
            <p className="opacity-90 leading-relaxed mb-4 text-sm sm:text-base border-l-2 border-[#39ff14]/40 pl-2 bg-black/30 py-1">
              <TypewriterText text={lab.description} delay={300 + (i * 300)} speed={5} />
            </p>
            <div className="flex flex-wrap gap-2">
              {lab.techStack.map((tech, j) => (
                <span key={j} className="text-xs border border-[#39ff14]/40 bg-[#39ff14]/10 px-1.5 py-0.5 uppercase tracking-wider text-[#39ff14]">
                  <TypewriterText text={tech} delay={450 + (i * 300) + (j * 100)} speed={5} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsOutput = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-[#39ff14]/70 mb-2 font-bold"><TypewriterText text="cat skills.txt [LOADING... OK]" delay={0} speed={5} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(portfolioData.skills).map(([category, items], i) => (
          <div key={category} className="nes-border p-3 bg-[#39ff14]/5 animate-in zoom-in duration-300" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
            <h3 className="text-sm uppercase text-[#39ff14]/80 mb-2 font-bold tracking-wider shrink-0 border-b border-[#39ff14]/20 pb-1">
              <TypewriterText text={`[${category.replace(/_and_/g, ' & ').replace(/_/g, ' ')}]`} delay={100 + (i * 200)} speed={5} />
            </h3>
            <div className="flex flex-col gap-3 mt-2">
              {(items as { group: string, items: string[] }[]).map((subGroup, subIdx) => (
                <div key={subIdx}>
                  <div className="text-[#39ff14] opacity-80 text-xs mb-1 font-bold tracking-widest uppercase">
                    &gt; {subGroup.group}:
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {subGroup.items.map((item, j) => (
                      <li key={j} className="px-2 py-1 border border-[#39ff14]/30 text-xs bg-black uppercase tracking-wider">
                        <TypewriterText text={item} delay={200 + (i * 200) + (subIdx * 100) + (j * 50)} speed={5} />
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
  );
};

const CertificationsOutput = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-[#39ff14]/70 mb-2 font-bold"><TypewriterText text="cat certifications.txt [LOADING... OK]" delay={0} speed={5} /></div>
      <div className="nes-border p-4 bg-[#39ff14]/5 animate-in fade-in duration-500">
        <ul className="space-y-3">
          {portfolioData.certifications.map((cert, idx) => (
            <li key={idx} className="flex gap-3 items-start hover:translate-x-1 transition-transform">
              <span className="text-[#39ff14] font-bold mt-0.5 shrink-0">*</span>
              <span className="opacity-95 leading-tight"><TypewriterText text={cert} delay={100 + (idx * 150)} speed={5} /></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ContactsOutput = () => {
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "irfanahmed29818@gmail.com";
    navigator.clipboard.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    // Still trigger the mailto action after copying
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="flex flex-col gap-4 mt-2 relative">
      <div className="text-[#39ff14]/70 mb-2 font-bold"><TypewriterText text="cat contacts.txt [LOADING... OK]" delay={0} speed={5} /></div>
      <div className="nes-border p-5 bg-[#39ff14]/5 animate-in fade-in duration-500 relative">
        <ul className="space-y-4">
          <li className="flex gap-3 flex-col sm:flex-row items-start sm:items-center">
            <span className="text-[#39ff14] font-bold shrink-0 uppercase tracking-widest">&gt; Email:</span>
            <a
              href="mailto:irfanahmed29818@gmail.com"
              onClick={handleEmailClick}
              className="text-[#39ff14] opacity-90 hover:opacity-100 hover:text-black hover:bg-[#39ff14] transition-colors border-b border-[#39ff14]/30 pb-0.5"
            >
              irfanahmed29818@gmail.com
            </a>
          </li>
          <li className="flex gap-3 flex-col sm:flex-row items-start sm:items-center">
            <span className="text-[#39ff14] font-bold shrink-0 uppercase tracking-widest">&gt; LinkedIn:</span>
            <a href="https://linkedin.com/in/irfanahamedseyam/" target="_blank" rel="noopener noreferrer" className="text-[#39ff14] opacity-90 hover:opacity-100 hover:text-black hover:bg-[#39ff14] transition-colors border-b border-[#39ff14]/30 pb-0.5">
              linkedin.com/in/irfanahamedseyam/
            </a>
          </li>
        </ul>

        {/* Toast Notification */}
        <div className={`absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/90 border border-[#39ff14] text-[#39ff14] px-3 py-2 text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-opacity duration-300 z-50 ${showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          [✓] Email copied to clipboard
        </div>
      </div>
    </div>
  );
};

const NeofetchOutput = () => {
  const [stats, setStats] = useState<string[]>([]);

  useEffect(() => {
    const uptime = Math.floor(performance.now() / 60000);
    const resolution = `${window.screen.width}x${window.screen.height}`;

    let os = "Unknown OS";
    const ua = navigator.userAgent;
    if (ua.indexOf("Win") !== -1) os = "Windows NT 10.0";
    else if (ua.indexOf("Mac") !== -1) os = "macOS";
    else if (ua.indexOf("X11") !== -1) os = "UNIX";
    else if (ua.indexOf("Linux") !== -1) os = "Linux";

    let browser = "Unknown Browser";
    if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";

    setStats([
      "visitor@mainframe",
      "-----------------",
      `OS: ${os}`,
      `Host: Irfan Ahamed Seyam`,
      `Kernel: WebEngine`,
      `Uptime: ${uptime} mins`,
      `Packages: 420 (dpkg)`,
      `Shell: bash 5.2.15`,
      `Resolution: ${resolution}`,
      `Browser: ${ua}`,
      `Theme: Terminal (#39ff14)`
    ]);
  }, []);

  if (stats.length === 0) return null;

  const logoStr = [
    "       .       ",
    "      / \\      ",
    "     /   \\     ",
    "    /^.   \\    ",
    "   /  .-.  \\   ",
    "  /  (   ) _\\  ",
    " / _.~   ~._^\\ ",
    "/.^         ^.\\"
  ].join('\n');

  const statsStr = stats.join('\n');

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 font-bold font-mono text-[#39ff14] w-full max-w-full">
      <div className="shrink-0 whitespace-pre">
        <TypewriterText text={logoStr} speed={1} />
      </div>
      <div className="min-w-0 flex-1 whitespace-pre-wrap break-words break-all sm:break-words">
        <TypewriterText text={statsStr} speed={1} />
      </div>
    </div>
  );
};

const ErrorOutput = ({ cmd }: { cmd: string }) => {
  return `bash: ${cmd}: command not found. Hint: type 'help' for available directives.`;
}

type CommandRecord = {
  id: string;
  command: string;
  output: ReactNode;
};

const GuiOutput = () => {
  return "Initiating GUI...\nError: X11 server not found. Real admins use the terminal.";
};

const PingOutput = ({ target }: { target?: string }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const host = target || "127.0.0.1";
    const ip = target && target !== "localhost" && target !== "127.0.0.1"
      ? `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      : "127.0.0.1";

    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setLines([`PING ${host} (${ip}): 56 data bytes`]);
      } else if (step <= 4) {
        const time = (Math.random() * 20 + 10).toFixed(1);
        setLines(prev => [...prev, `64 bytes from ${ip}: icmp_seq=${step - 1} ttl=56 time=${time} ms`]);
        window.dispatchEvent(new Event('typewriter-tick')); // trigger auto-scroll
      } else if (step === 5) {
        setLines(prev => [
          ...prev,
          `--- ${host} ping statistics ---`,
          `4 packets transmitted, 4 packets received, 0.0% packet loss`
        ]);
        window.dispatchEvent(new Event('typewriter-tick'));
        clearInterval(interval);
      }
      step++;
    }, 800);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="font-mono mt-2 mb-4 flex flex-col text-[#39ff14]">
      {lines.map((line, i) => (
        <div key={i}>
          <TypewriterText text={line} speed={5} delay={0} />
        </div>
      ))}
    </div>
  );
};

const MatrixRain = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+=";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#39ff14";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[101] text-[#39ff14] opacity-70 font-mono tracking-widest text-sm sm:text-base px-4 py-2 bg-black/50 border border-[#39ff14]/30 pointer-events-none whitespace-nowrap">
        [ Press ESC to return to terminal ]
      </div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

const SudoOutput = () => {
  return "visitor is not in the sudoers file. This incident will be reported.";
};

const TopStatusBar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-8 z-50 bg-[#39ff14] text-black font-bold flex justify-between items-center px-2 sm:px-4 text-xs sm:text-sm">
      <div className="shrink-0">[ visitor@mainframe:~ ]</div>
      <div className="hidden sm:block shrink-0">UPTIME: 99.9% // ACTIVE_CONNECTIONS: 1</div>
      <div className="shrink-0 ml-4">SYS.TIME: {time}</div>
    </div>
  );
};

const SystemMarquee = () => {
  const broadcastStrings = [
    "SYS: LOCAL KEYBOARD EVENT LISTENERS... [ACTIVE]",
    "SYS: DYNAMIC SCROLL ENGINE... [CALIBRATED]",
    "SEC: CLIENT-SIDE DOM ENVIRONMENT IS SANDBOXED.",
    "SYS: TERMINAL STATE MACHINE INITIALIZED.",
    "SYS: TYPEWRITER RENDERING ENGINE RUNNING AT 60FPS.",
    "WARN: EXCESSIVE USE OF 'cmatrix' MAY LEAD TO DIGITAL HALLUCINATIONS.",
    "WARN: SYSTEM CAFFEINE LEVELS DROPPING CRITICALLY LOW.",
    "WARN: UNAUTHORIZED RECRUITERS WILL BE IMPRESSED.",
    "WARN: DO NOT FEED THE BUGS. THEY ARE ALREADY FED.",
    "WARN: LEAVING TAB OPEN MAY RESULT IN SUDDEN URGE TO INSTALL LINUX.",
    "HINT: NEW VISITOR? EXECUTE 'whoami' TO INITIALIZE PROFILE PROTOCOL.",
    "HINT: SYSTEM DOCUMENTS DETECTED. RUN 'ls' TO VIEW DIRECTORY.",
    "HINT: EXECUTE 'cat skills.txt' TO VIEW TECHNICAL PROFICIENCIES.",
    "HINT: TYPE 'help' AT ANY TIME FOR A LIST OF CORE DIRECTIVES.",
    "HINT: NETWORK DIAGNOSTICS ARE AVAILABLE VIA THE 'ping' COMMAND.",
    "HINT: TIRED OF TYPING? YOU CAN CLICK ON FILES IN 'ls' TO AUTO-READ THEM.",
    "HINT: USE THE [UP] AND [DOWN] ARROW KEYS TO CYCLE COMMAND HISTORY.",
    "HINT: THE [TAB] KEY WILL AUTO-COMPLETE COMMANDS AND FILE NAMES.",
    "HINT: TYPE 'cat projects.txt' TO VIEW MY INTRUSION DETECTION SYSTEM BUILD.",
    "HINT: TYPE 'neofetch' TO SEE HOW THIS TERMINAL PARSES YOUR BROWSER SPECS.",
    "HINT: RUN 'clear' AT ANY TIME TO PURGE THE TERMINAL BUFFER AND START FRESH.",
    "FACT: 127.0.0.1 IS THERE FOR YOU WHEN NO ONE ELSE IS.",
    "FACT: THE ORIGINAL 'ping' UTILITY WRITTEN IN 1983 WAS JUST A THOUSAND LINES OF CODE.",
    "FACT: DNS IS THE REASON YOU DON'T HAVE TO MEMORIZE IP ADDRESSES TO BROWSE THE WEB.",
    "FACT: THE FIRST DOMAIN NAME EVER REGISTERED WAS SYMBOLICS.COM IN 1985."
  ];

  const [broadcastIndex, setBroadcastIndex] = useState(0);

  useEffect(() => {
    // The CSS glitch animation is 6 seconds. This interval aligns the text rotation with the glitch iteration.
    const interval = setInterval(() => {
      setBroadcastIndex(prev => (prev + 1) % broadcastStrings.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [broadcastStrings.length]);

  return (
    <div className="fixed top-8 left-0 w-full z-40 bg-black border-b border-[#39ff14] flex flex-col items-center justify-center py-2 px-4 shadow-[0_4px_15px_-3px_rgba(57,255,20,0.1)] overflow-hidden">
      <div className="text-xs sm:text-sm font-bold uppercase transition-none text-center flex flex-col gap-1 w-full text-[#39ff14] animate-glitch">
        <span>*** SYSTEM BROADCAST ***</span>
        <span className="opacity-90 tracking-wide">{broadcastStrings[broadcastIndex]}</span>
      </div>
    </div>
  );
};


const WhoamiOutput = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start my-4 border border-[#39ff14] p-4 animate-in fade-in duration-500">
      <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 border-2 border-[#39ff14] overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/IMG-20220324-WA0003(1).jpg"
          alt="Authorized Personnel"
          className="object-cover w-full h-full grayscale sepia hue-rotate-[70deg] brightness-75 contrast-125 opacity-90 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[#39ff14] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="flex-grow font-mono">
        <h2 className="text-xl font-bold mb-2">
          &gt;_ <TypewriterText text="AUTHORIZED USER // IRFAN AHAMED SEYAM" speed={5} delay={0} />
        </h2>
        <p className="mb-2">
          <TypewriterText text="TITLE: Server Administrator & Security Operations" speed={5} delay={300} />
        </p>
        <p className="mb-4">
          <TypewriterText text="LOCATION: Dhaka, Bangladesh" speed={5} delay={600} />
        </p>
        <div className="leading-relaxed">
          <TypewriterText text={`I manage and secure Linux-based hosting environments, hybrid infrastructure, and enterprise CMS deployments.\nMy day-to-day operations focus on high-availability server administration, malware remediation, and DNS/email pipeline optimization.\nI bridge the gap between robust system architecture and proactive threat detection.`} speed={5} delay={900} />
        </div>
      </div>
    </div>
  );
};

// Extracted Execution Logic to a pure function for reuse
const executeCommandLogic = (cmdInput: string, onExecute: (cmd: string) => void): ReactNode | string => {
  if (!cmdInput.trim()) return null;

  const cmdArgs = cmdInput.replace(/\s+/g, ' ').split(' ');
  const baseCmd = cmdArgs[0].toLowerCase();
  const target = cmdArgs[1]?.toLowerCase();

  if (baseCmd === "sudo") {
    return <div className="text-red-500 mt-2 font-bold"><TypewriterText text={SudoOutput() as string} speed={5} /></div>;
  } else if (baseCmd === "help") {
    return <HelpOutput onExecute={onExecute} />;
  } else if (baseCmd === "whoami") {
    return <WhoamiOutput />;
  } else if (baseCmd === "neofetch") {
    return <NeofetchOutput />;
  } else if (baseCmd === "ls") {
    return <LsOutput onExecute={onExecute} />;
  } else if (baseCmd === "date") {
    return new Date().toString();
  } else if (baseCmd === "gui") {
    return <pre className="text-red-500 whitespace-pre-wrap font-sans mt-2"><TypewriterText text={GuiOutput() as string} speed={5} /></pre>;
  } else if (baseCmd === "ping") {
    return <PingOutput target={target} />;
  } else if (baseCmd === "echo") {
    const text = cmdArgs.slice(1).join(' ');
    return text;
  } else if (baseCmd === "cat") {
    if (!target) {
      return <div className="text-red-500 mt-2"><TypewriterText text="cat: missing operand" speed={5} /></div>;
    } else if (target === "experience.txt") {
      return <ExperienceOutput />;
    } else if (target === "projects.txt") {
      return <LabOutput />;
    } else if (target === "skills.txt") {
      return <SkillsOutput />;
    } else if (target === "certifications.txt") {
      return <CertificationsOutput />;
    } else if (target === "contacts.txt") {
      return <ContactsOutput />;
    } else {
      return <div className="text-red-500 mt-2"><TypewriterText text={`cat: ${target}: No such file or directory`} speed={5} /></div>;
    }
  } else {
    return <div className="text-red-500 mt-2"><TypewriterText text={ErrorOutput({ cmd: cmdInput }) as unknown as string} speed={5} /></div>;
  }
};

export default function Home() {
  const [history, setHistory] = useState<CommandRecord[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastCommandRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState("whoami");

  useEffect(() => {
    // Primary Sequence Definition
    const sequence = [
      'whoami',
      'ls',
      'cat skills.txt',
      'cat projects.txt',
      'cat experience.txt',
      'cat contacts.txt',
      'help'
    ];

    if (executedCommands.length === 0) {
      setActiveSuggestion('whoami');
      return;
    }

    // Identify consecutive identical commands
    const lastCmd = executedCommands[executedCommands.length - 1];
    const secondLastCmd = executedCommands.length > 1 ? executedCommands[executedCommands.length - 2] : null;
    const isConsecutive = lastCmd === secondLastCmd;

    // Rule: Repetition Handling (The 'Help' Rule)
    if (lastCmd === 'help' && isConsecutive) {
      // Clear execution history of the sequence commands to reset the loop
      setExecutedCommands(prev => prev.filter(c => !sequence.includes(c)));
      setActiveSuggestion('whoami');
      return;
    }

    // Rule: State-Aware Discovery (Require 'ls' before suggesting any 'cat')
    const hasRunLs = executedCommands.includes('ls');
    if (!hasRunLs) {
      // Loop: whoami -> help -> ls (with help at the end, so suggest 'ls' or 'help' if whoami is done)
      if (!executedCommands.includes('whoami')) {
        setActiveSuggestion('whoami');
        return;
      }

      const preLsSequence = ['whoami', 'ls', 'help'];
      // Command Lock-out applies here as well
      const availablePreLs = preLsSequence.filter(cmd => !executedCommands.includes(cmd) && cmd !== lastCmd);
      if (availablePreLs.length > 0) {
        // Keep help at the end
        if (availablePreLs.includes('ls')) setActiveSuggestion('ls');
        else setActiveSuggestion('help');
      } else {
        setActiveSuggestion('help');
      }
      return;
    }

    // Standard Sequence Evaluation with Rule: Command Lock-out
    // Filter out commands that have been executed, OR the command they just ran (to prevent double suggesting)
    let availableSuggestions = sequence.filter(cmd => !executedCommands.includes(cmd) && cmd !== lastCmd);

    // Rule: Priority & Positioning
    // Ensure 'help' is only suggested when it's the absolute last option, or if no other options exist
    if (availableSuggestions.length > 1 && availableSuggestions.includes('help')) {
      availableSuggestions = availableSuggestions.filter(cmd => cmd !== 'help');
    }

    if (availableSuggestions.length > 0) {
      setActiveSuggestion(availableSuggestions[0]);
    } else {
      // Fallback if everything is exhausted
      setActiveSuggestion('help');
    }

  }, [executedCommands]);

  // Dynamic Scroll Alignment
  useEffect(() => {
    setTimeout(() => {
      if (!scrollContainerRef.current) return;

      const viewportHeight = scrollContainerRef.current.clientHeight;
      const lastCommandHeight = lastCommandRef.current?.offsetHeight || 0;

      if (lastCommandHeight > viewportHeight) {
        // Output is Taller than Viewport: Anchor to top of command
        lastCommandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Output Fits Viewport: Anchor to active input line
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, [history]);

  // Global Typwriter Auto-Scroll Hook
  useEffect(() => {
    const handleTypewriterTick = () => {
      if (!scrollContainerRef.current) return;
      const viewportHeight = scrollContainerRef.current.clientHeight;
      const lastCommandHeight = lastCommandRef.current?.offsetHeight || 0;

      if (lastCommandHeight <= viewportHeight) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener('typewriter-tick', handleTypewriterTick);
    return () => window.removeEventListener('typewriter-tick', handleTypewriterTick);
  }, []);

  // Initial Auto-Focus (On Mount / After Boot)
  useEffect(() => {
    if (!isBooting) {
      // Small timeout to ensure DOM layout has painted the newly enabled input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isBooting]);

  // Command Execution Handler (used by both input and interactive clicks)
  const executeDirectCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim();
    if (!trimmedCmd) return;

    // Track command execution universally before any early returns bypass it
    setExecutedCommands(prev => prev.includes(trimmedCmd.toLowerCase()) ? prev : [...prev, trimmedCmd.toLowerCase()]);

    if (trimmedCmd.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd.toLowerCase() === "cmatrix") {
      setIsMatrixActive(true);
      setHistory(prev => [...prev, {
        id: `cmd-${Date.now()}-${prev.length}`,
        command: "cmatrix",
        output: <div className="text-[#39ff14] mt-2">Terminated by user.</div>
      }]);
      setInputHistory(prev => [...prev, "cmatrix"]);
      setCommandHistoryIndex(-1);
      return;
    }

    const outputData = executeCommandLogic(trimmedCmd, executeDirectCommand);
    const outputNode = typeof outputData === "string"
      ? <div className="text-[#39ff14] mt-2"><TypewriterText text={outputData} speed={5} /></div>
      : outputData;

    setHistory(prev => [...prev, {
      id: `cmd-${Date.now()}-${prev.length}`,
      command: trimmedCmd,
      output: outputNode
    }]);

    // Add to input history for up/down arrows
    setInputHistory(prev => [...prev, trimmedCmd]);
    setCommandHistoryIndex(-1); // reset index
  };

  // Form submit handler wraps the direct execution
  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeDirectCommand(currentInput);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      playSound('enter');
    } else if (!["Shift", "Control", "Meta", "Alt", "ArrowUp", "ArrowDown", "Tab", "CapsLock"].includes(e.key)) {
      playSound('tick');
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const commands = ["help", "whoami", "ls", "cat", "clear", "neofetch", "ping", "cmatrix"];
      const files = ["experience.txt", "projects.txt", "skills.txt", "certifications.txt", "contacts.txt"];

      const parts = currentInput.split(" ");
      let completedText = "";

      if (parts.length === 1) {
        // Command completion
        const matches = commands.filter(c => c.startsWith(parts[0].toLowerCase()));
        if (matches.length === 1) {
          completedText = matches[0];
        }
      } else if (parts.length === 2 && parts[0].toLowerCase() === "cat") {
        // File completion
        const matches = files.filter(f => f.startsWith(parts[1].toLowerCase()));
        if (matches.length === 1) {
          completedText = `cat ${matches[0]}`;
        }
      }

      if (completedText) {
        setCurrentInput(completedText);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(completedText.length, completedText.length);
            setCursorPosition(completedText.length);
          }
        }, 0);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (inputHistory.length > 0) {
        const newIndex = commandHistoryIndex === -1 ? inputHistory.length - 1 : Math.max(0, commandHistoryIndex - 1);
        setCommandHistoryIndex(newIndex);
        setCurrentInput(inputHistory[newIndex]);
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistoryIndex !== -1) {
        const newIndex = commandHistoryIndex + 1;
        if (newIndex >= inputHistory.length) {
          setCommandHistoryIndex(-1);
          setCurrentInput("");
          setTimeout(() => {
            setCursorPosition(0);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 0);
        } else {
          setCommandHistoryIndex(newIndex);
          const newText = inputHistory[newIndex];
          setCurrentInput(newText);
          setTimeout(() => {
            setCursorPosition(newText.length);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      }
    }
  };

  const hasBooted = useRef(false);

  // Auto-Boot Sequence
  useEffect(() => {
    if (!isBooting || hasBooted.current) return;
    hasBooted.current = true;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const bootSequence = async () => {
      // Clear any existing history before starting to ensure sequential render
      setHistory([]);

      // Step 1 - System Init

      // Step 3
      setHistory(prev => [...prev, {
        id: "boot-1",
        command: "",
        output: <div className="text-[#39ff14]/70 font-bold">&gt; <TypewriterText text="SYSTEM INIT... [OK]" speed={5} delay={0} /></div>
      }]);

      // Step 4
      await sleep(800);

      // Step 5
      setHistory(prev => [...prev, {
        id: "boot-2",
        command: "",
        output: <div className="text-[#39ff14]/70 font-bold">&gt; <TypewriterText text="LOADING SECURE SHELL... [OK]" speed={5} delay={0} /></div>
      }]);

      // Step 6
      await sleep(600);

      // Step 7
      setHistory(prev => [...prev, {
        id: "boot-3",
        command: "",
        output: <div className="text-[#39ff14]/70 font-bold">&gt; <TypewriterText text="auto-executing 'help'..." speed={5} delay={0} /></div>
      }]);

      // Step 8
      await sleep(400);

      // Step 9  (Execute Help)
      executeDirectCommand("help");
      setIsBooting(false);
    };

    bootSequence();
  }, [isBooting]);

  // Global Click-to-Focus (Failsafe)
  const handleContainerClick = (e: React.MouseEvent) => {
    if (window.getSelection()?.toString() === "") {
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {isMatrixActive && <MatrixRain onClose={() => setIsMatrixActive(false)} />}
      <main
        className="flex flex-1 w-full flex-col bg-black z-10 relative overflow-hidden pt-28 sm:pt-32"
        onClick={handleContainerClick}
      >
        <TopStatusBar />
        <SystemMarquee />
        <div
          className="w-full h-full flex flex-col flex-1 relative"
        >
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-8 pt-0 sm:pt-0 custom-scrollbar relative flex flex-col text-sm sm:text-base">
            {history.map((record, index) => (
              <div
                key={record.id}
                ref={index === history.length - 1 ? lastCommandRef : null}
                className="mb-6 w-full"
              >
                {record.command && (
                  <div className="flex gap-2 text-[#39ff14] font-bold">
                    <span className="opacity-70 whitespace-nowrap lg:inline hidden">visitor@mainframe:~$</span>
                    <span className="opacity-70 whitespace-nowrap lg:hidden inline">~$</span>
                    <span className="break-all">{record.command}</span>
                  </div>
                )}
                <div className="ml-0 sm:ml-4 w-full">
                  {record.output}
                </div>
              </div>
            ))}

            <div className={`mt-2 shrink-0 w-full pb-4 ${isBooting ? 'hidden' : 'block'}`}>
              <form onSubmit={handleCommandSubmit} className="flex gap-2 items-center w-full relative">
                <span className="text-[#39ff14] font-bold opacity-70 whitespace-nowrap shrink-0 lg:inline hidden">visitor@mainframe:~$</span>
                <span className="text-[#39ff14] font-bold opacity-70 whitespace-nowrap shrink-0 lg:hidden inline">~$</span>

                <div className="relative flex-1 flex text-[#39ff14] font-bold items-center">
                  {!currentInput && activeSuggestion && (
                    <span className="absolute inset-0 pointer-events-none opacity-40 font-sans tracking-widest flex items-center whitespace-nowrap overflow-hidden">
                      [ suggestion: type '{activeSuggestion}' ]_
                    </span>
                  )}
                  <span className="whitespace-pre font-sans tracking-widest z-0" aria-hidden="true">
                    {currentInput.slice(0, cursorPosition)}
                  </span>
                  <span className="blink-cursor z-0 shrink-0">
                    {currentInput.slice(cursorPosition, cursorPosition + 1) || " "}
                  </span>
                  <span className="whitespace-pre font-sans tracking-widest z-0" aria-hidden="true">
                    {currentInput.slice(cursorPosition + 1)}
                  </span>

                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => {
                      setCurrentInput(e.target.value);
                      setCursorPosition(e.target.selectionStart || 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                    onKeyUp={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                    onClick={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="absolute inset-0 w-full bg-transparent border-none outline-none text-transparent caret-transparent focus:ring-0 z-10 font-sans tracking-widest p-0 m-0"
                    style={{ textShadow: "none" }}
                    disabled={isBooting}
                  />
                </div>
              </form>
            </div>
            <div ref={bottomRef} className="h-4 w-full shrink-0"></div>
          </div>
        </div>
      </main>
    </>
  );
}
