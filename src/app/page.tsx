"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Database, 
  MessageSquare, 
  Send, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  Mail,
  ChevronRight,
  Rocket,
  Plus,
  ArrowUpRight,
  Monitor
} from 'lucide-react';

// --- DATA CONSTANTS (Based on User JSONs) ---

const SKILLS_DATA = {
  "skills": [
    {
      "name": "Frontend Architecture",
      "languages": ["Next.js", "React.js", "Flutter"],
      "tools": ["Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      "name": "Backend & Cloud",
      "languages": ["Express Server", "FastAPI", "Express"],
      "tools": ["Jenkins", "Docker", "GCP", "OCI"]
    },
    {
      "name": "Advanced Tech",
      "languages": ["Blockchain", "Virtual Reality", "Augmented Reality"],
      "tools": ["Unreal Engine"]
    }
  ]
};

const PORTFOLIO_DATA = {
  "portfolio": [
    {
      "title": "Supernatural Community Church",
      "source_code_links": ["https://github.com/philip/scc-web"],
      "deployment_links": ["https://supernaturalchurch.org"],
      "languages": ["Reactjs", "Express"],
      "tools": ["MongoDB"]
    },
    {
      "title": "Coherentity LLC Platform",
      "source_code_links": [],
      "deployment_links": ["https://coherentity.com"],
      "languages": ["Nextjs", "FastAPI"],
      "tools": ["MongoDB"]
    },
    {
      "title": "MIV Word House",
      "source_code_links": ["https://github.com/philip/miv"],
      "deployment_links": ["https://mivwordhouse.com"],
      "languages": ["Reactjs", "Express"],
      "tools": ["MongoDB"]
    }
  ]
};

const WORK_DATA = {
  "work_experience": [
    {
      "company_name": "MIV Word House, Nigeria",
      "time_period": "2024 - Present",
      "roles": ["Lead Developer"],
      "description": ["Architecting core web infrastructures", "Leading cross-functional engineering teams"]
    },
    {
      "company_name": "The Supernatural Community Church, USA",
      "time_period": "2024 - Present",
      "roles": ["Lead Developer"],
      "description": ["Scalable React/Express architecture", "Managing high-traffic global platforms"]
    },
    {
      "company_name": "Coherentity LLC, USA",
      "time_period": "2025 - Present",
      "roles": ["CTO & Founder"],
      "description": ["Strategic technology leadership", "Full-stack system design"]
    }
  ]
};

const FOUNDED_DATA = {
  "founded_companies": [
    {
      "company_name": "Coherentity LLC",
      "roles": ["Founder", "CTO"],
      "year_founded": 2025
    },
    {
      "company_name": "Urbandrop, UK",
      "roles": ["Co-founder"],
      "year_founded": 2026
    }
  ]
};

const BLOGS = [
  {
    "img_src": "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=1000&auto=format&fit=crop",
    "title": "Virology Meets Virtual Reality",
    "summary": "Exploring how molecular structures are simulated in Unreal Engine.",
    "timestamp": "2026-02-25T14:30:00Z"
  },
  {
    "img_src": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    "title": "Scalable Cloud for Startups",
    "summary": "Deploying Jenkins and Docker pipelines on OCI and GCP.",
    "timestamp": "2026-02-24T10:00:00Z"
  }
];

// --- HELPER COMPONENTS ---

const GlowingText = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ${className}`}>
    {children}
  </span>
);

const SectionTitle = ({ 
  children, 
  subtitle 
}: { 
  children: React.ReactNode; 
  subtitle: string; 
}) => (
  <div className="mb-12 relative">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4"
    >
      <div className="h-px w-12 bg-cyan-500/50" />
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
        {children}
      </h2>
    </motion.div>
    <p className="text-cyan-400/60 ml-16 mt-2 font-mono text-sm uppercase tracking-[0.2em]">{subtitle}</p>
  </div>
);

const AnimatedCounter = ({ 
  value, 
  duration = 2 
}: { 
  value: string; 
  duration?: number; 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        <div 
          className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
          style={{ 
            left: mousePos.x - 300, 
            top: mousePos.y - 300,
            transition: 'left 0.15s ease-out, top 0.15s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-50 origin-left" style={{ scaleX }} />

      {/* Header */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-fuchsia-600 rounded flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            PA
          </div>
          <span className="font-bold text-white tracking-widest hidden sm:block">PHILIP AJAYI</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
          <a href="#about" className="hover:text-cyan-400 transition-colors">// About</a>
          <a href="#stack" className="hover:text-cyan-400 transition-colors">// Stack</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">// Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">// Connect</a>
        </div>
        <button className="px-5 py-2 bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all rounded-full text-xs font-mono">
          LET'S PARTNER
        </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 space-y-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AVAILABLE FOR VENTURE PARTNERSHIP
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              CRAFTING THE <br />
              <GlowingText>FUTURE TECH.</GlowingText>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                MSc Virologist turned Multi-Stack Architect. From core cloud infrastructures to immersive VR experiences, I build startups that redefine industry standards. I don't just write code; I engineer equity-driven growth.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Database className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Full-Stack Scale</h4>
                    <p className="text-sm text-slate-500">React, Next.js, Node, MongoDB, FastAPI</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Monitor className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Virtual Horizons</h4>
                    <p className="text-sm text-slate-500">Unreal Engine, AR/VR, Web3, OCI</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2">
                START A PROJECT <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:border-fuchsia-500/50 text-white font-bold rounded-lg transition-all">
                VIEW ECOSYSTEM
              </button>
            </div>
          </motion.div>
        </section>

        {/* METRICS SECTION */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 border-y border-white/5 bg-white/[0.02]">
          {[
            { label: "Systems Built", value: "12" },
            { label: "Equity Partners", value: "5" },
            { label: "Tech Stacks", value: "9" },
            { label: "Years Lead", value: "2" }
          ].map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-black text-white mb-2">
                <AnimatedCounter value={m.value} />+
              </div>
              <div className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase tracking-widest">{m.label}</div>
            </div>
          ))}
        </section>

        {/* PARTNERSHIP PITCH */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#020617] p-8 rounded-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000&auto=format&fit=crop" 
                alt="Digital Lab" 
                className="rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-12 right-12 p-4 backdrop-blur-xl bg-white/5 border border-white/20 rounded-lg max-w-[200px]">
                <p className="text-xs font-mono text-cyan-400 mb-1">CURRENT STATUS</p>
                <p className="text-sm text-white font-bold">Scaling Coherentity LLC as Founder/CTO</p>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle subtitle="Vision & Background">THE HYBRID ENGINE</SectionTitle>
            <div className="space-y-6 text-slate-400">
              <p className="leading-relaxed">
                With a background in <span className="text-white font-semibold underline decoration-cyan-500">MSc Virology</span> from the University of Ibadan, my approach to software is biological—systems must be resilient, self-healing, and adaptive. 
              </p>
              <p className="leading-relaxed">
                As a multi-stack lead developer, I bridge the gap between high-level business strategy and low-level code execution. I am looking to partner with visionary founders where I can leverage my expertise for equity and transform ideas into market-dominant entities.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-tighter">Academics</h5>
                  <p className="text-xs text-slate-500">MSc Virology, UI & JABU</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-tighter">Core Cloud</h5>
                  <p className="text-xs text-slate-500">GCP, OCI, Docker, Jenkins</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS - TECH STACK */}
        <section id="stack">
          <SectionTitle subtitle="Neural Network">TECHNICAL ARCHITECTURE</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS_DATA.skills.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Cpu className="w-16 h-16 text-cyan-500" />
                </div>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">{skill.name}</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-mono text-cyan-500 uppercase mb-3 tracking-[0.2em]">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.languages.map(lang => (
                        <span key={lang} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  {skill.tools.length > 0 && (
                    <div>
                      <p className="text-[10px] font-mono text-fuchsia-500 uppercase mb-3 tracking-[0.2em]">Tools & Ops</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map(tool => (
                          <span key={tool} className="px-3 py-1 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-md text-xs text-white">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO GRID */}
        <section id="projects">
          <SectionTitle subtitle="Deployment History">FEATURED PORTFOLIO</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.portfolio.map((item, i) => (
              <motion.div 
                key={i}
                layout
                className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all duration-500"
              >
                <div className="h-48 overflow-hidden bg-slate-900 flex items-center justify-center p-8 relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                   <Monitor className="w-20 h-20 text-white/10 absolute rotate-12" />
                   <h3 className="text-2xl font-black text-white z-20 text-center leading-tight group-hover:scale-110 transition-transform duration-500">{item.title}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {item.languages.map(l => (
                      <span key={l} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/10 text-slate-400">{l}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    {item.deployment_links.length > 0 && (
                      <a href={item.deployment_links[0]} className="text-white hover:text-cyan-400 flex items-center gap-1 text-xs font-bold transition-colors">
                        LIVE <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {item.source_code_links.length > 0 && (
                      <a href={item.source_code_links[0]} className="text-slate-500 hover:text-white flex items-center gap-1 text-xs font-bold transition-colors">
                        SOURCE <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="space-y-12">
           <SectionTitle subtitle="Career Timeline">EXPERIENCE LOG</SectionTitle>
           <div className="space-y-4">
              {WORK_DATA.work_experience.map((work, i) => (
                <div key={i} className="group relative grid md:grid-cols-[200px_1fr] gap-8 p-8 border-l border-white/10 hover:border-cyan-500 transition-colors bg-white/[0.01]">
                   <div className="text-xs font-mono text-cyan-500">{work.time_period}</div>
                   <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{work.company_name}</h4>
                        <div className="flex gap-2">
                           {work.roles.map(r => <span key={r} className="text-[10px] px-2 py-0.5 rounded-full border border-fuchsia-500/50 text-fuchsia-400">{r}</span>)}
                        </div>
                      </div>
                      <ul className="space-y-2">
                         {work.description.map((desc, idx) => (
                           <li key={idx} className="text-sm text-slate-400 flex gap-2">
                              <span className="text-cyan-500">_</span> {desc}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* FOUNDED COMPANIES */}
        <section className="bg-cyan-500/5 p-12 rounded-3xl border border-cyan-500/10">
           <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
              <Rocket className="w-6 h-6 text-cyan-400" /> VENTURE PORTFOLIO
           </h3>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FOUNDED_DATA.founded_companies.map((co, i) => (
                <div key={i} className="p-6 bg-[#020617] rounded-xl border border-white/5">
                   <div className="text-4xl font-black text-white/5 mb-4">{co.year_founded}</div>
                   <h4 className="text-lg font-bold text-white mb-2">{co.company_name}</h4>
                   <div className="flex flex-wrap gap-2">
                      {co.roles.map(r => <span key={r} className="text-[10px] text-cyan-400 font-mono uppercase">{r}</span>)}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* BLOGS */}
        <section>
          <SectionTitle subtitle="Transmission">RECENT INTEL</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOGS.map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                   <img src={blog.img_src} alt={blog.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{blog.title}</h4>
                <p className="text-slate-400 mb-4">{blog.summary}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-500">
                  READ LOG <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <button className="px-6 py-3 border border-white/10 hover:border-cyan-500/50 text-white rounded-lg transition-all text-sm font-bold">
                ENTER ARCHIVE
             </button>
          </div>
        </section>

        {/* CONTACT & NEWSLETTER */}
        <section id="contact" className="grid md:grid-cols-2 gap-16 py-32 border-t border-white/5">
           <div>
              <SectionTitle subtitle="Establish Link">CONNECT</SectionTitle>
              <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
                Ready to architect the next unicorn? Whether it's a deep-tech VR startup or a global cloud platform, let's sync up.
              </p>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-500 transition-colors">
                       <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <p className="text-xs font-mono text-cyan-500">EMAIL</p>
                       <p className="text-lg text-white font-bold">hello@philipajayi.com</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <a href="#" className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all">
                       <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-fuchsia-500/10 hover:border-fuchsia-500 transition-all">
                       <Linkedin className="w-5 h-5 text-white" />
                    </a>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <form className="space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <h4 className="text-white font-black uppercase tracking-tight mb-4">Transmission Channel</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="NAME" className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500 text-sm" />
                    <input type="email" placeholder="EMAIL" className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500 text-sm" />
                 </div>
                 <textarea placeholder="MISSION DETAILS..." rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500 text-sm" />
                 <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                    SEND SIGNAL <Send className="w-4 h-4" />
                 </button>
              </form>

              <div className="p-8 bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/20 border border-white/10 rounded-2xl">
                 <h4 className="text-white font-black uppercase tracking-tight mb-2">The Intelligence Brief</h4>
                 <p className="text-xs text-slate-400 mb-6">Join 500+ builders getting tech insights every week.</p>
                 <div className="flex gap-2">
                    <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-white/5 border border-white/10 p-3 rounded-lg focus:outline-none focus:border-cyan-500 text-sm" />
                    <button className="px-6 bg-white text-slate-900 font-bold rounded-lg text-sm hover:bg-cyan-400 transition-all">JOIN</button>
                 </div>
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono tracking-widest text-slate-500">
           <div>© 2026 PHILIP AJAYI ARCHIVES. ALL SYSTEMS OPERATIONAL.</div>
           <div className="flex gap-8">
              <a href="#" className="hover:text-cyan-500 transition-colors">SECURITY ENCRYPTION</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">PRIVACY_PROTOCOL</a>
           </div>
        </footer>
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
         <motion.button 
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white"
         >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.508 0-9.987 4.479-9.987 9.987 0 1.763.462 3.42 1.267 4.864L2 22l5.312-1.393c1.4.764 3.004 1.206 4.7 1.206 5.508 0 9.988-4.479 9.988-9.987 0-5.508-4.48-9.987-9.988-9.987zM6.86 18.037l-.269-.16c-1.285-.765-1.92-1.215-2.614-1.127l.325-1.936-.184-.294c-.66-1.054-1.01-2.274-1.01-3.533 0-3.834 3.118-6.953 6.953-6.953 3.834 0 6.953 3.119 6.953 6.953 0 3.834-3.118 6.953-6.953 6.953-1.332 0-2.585-.382-3.649-1.102l-.307-.208-.277.08z"/></svg>
         </motion.button>
         
         <motion.button 
           onClick={() => setIsChatOpen(!isChatOpen)}
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-cyan-500 rounded-full shadow-lg flex items-center justify-center text-slate-900"
         >
            <MessageSquare className="w-8 h-8" />
         </motion.button>
      </div>

      {/* CHATBOT MODAL */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-[#020617] border border-cyan-500/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-cyan-500/10 border-b border-cyan-500/30 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono text-cyan-400 font-bold">AJAYI_BOT v2.5</span>
               </div>
               <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white"><Plus className="w-5 h-5 rotate-45" /></button>
            </div>
            
            <div className="flex-1 p-6 space-y-4 overflow-y-auto font-mono text-xs">
               <div className="text-cyan-400">{'>>'} CONNECTION ESTABLISHED.</div>
               <div className="p-3 bg-white/5 rounded-lg text-slate-300 border border-white/5">
                  Greetings, User. I am the digital representative for Philip Ajayi. How can I assist your mission today?
               </div>
               <div className="flex flex-col gap-2">
                  {['Book a partnership meeting', 'View tech stack', 'Request a quote'].map(q => (
                    <button key={q} className="text-left p-2 border border-white/10 rounded hover:border-cyan-500 transition-colors">
                      {'>'} {q}
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
               <input type="text" placeholder="Type command..." className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:outline-none font-mono" />
               <button className="p-3 bg-cyan-500 rounded-lg text-slate-900"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] animate-pulse" />
    </div>
  );
}
