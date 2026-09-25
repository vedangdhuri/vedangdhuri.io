"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Camera,
  Gamepad2,
  Plane,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Zap,
  Cpu,
  ShieldCheck,
  Code2,
  BrainCircuit,
  Layers,
  FileText,
  Download,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const journeyTimeline = [
  {
    type: "experience",
    title: "Software Development Intern",
    organization: "Softmusk Solutions Pvt. Ltd.",
    location: "Sawantwadi, India",
    period: "Jun 2025 – Aug 2025",
    icon: Briefcase,
    description:
      "Completed a 3-month internship applying Django, REST APIs, and full-stack integration to real-world software systems. Collaborated across teams to integrate backend services with responsive frontend components.",
    skills: ["Django", "REST APIs", "Python", "Full Stack Integration"],
  },
  {
    type: "education",
    title: "Diploma in Computer Engineering",
    organization: "Yashwantrao Bhonsale Institute of Technology (YBIT)",
    location: "Sawantwadi (MSBTE)",
    period: "2023 – 2026",
    icon: GraduationCap,
    description:
      "Specializing in core software engineering, data structures, algorithm design, IoT systems, and applied cryptography. Active open-source developer with 20+ public repositories.",
    skills: [
      "Software Engineering",
      "Algorithms",
      "IoT",
      "Applied Cryptography",
      "Computer Networking",
      "Embedded Systems",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Computer Science and Engineering (AIML)",
    organization: "Parul University",
    location: "Vadodara, Gujarat, India",
    period: "2026 – 2029",
    icon: GraduationCap,
    description:
      "Pursuing a Bachelor of Technology in Computer Science and Engineering with Artificial Intelligence & Machine Learning, with a focus on software development, data structures, algorithms, web technologies, and emerging technologies.",
    skills: [
      "Software Development",
      "Data Structures & Algorithms",
      "Web Development",
      "Database Management",
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
    ],
  },
];

const coreCompetencies = [
  {
    name: "Real-Time WebSockets",
    icon: Zap,
    desc: "Socket.io & Live Systems",
  },
  {
    name: "AI & GPT Integration",
    icon: BrainCircuit,
    desc: "LLM Scoring & API Workflows",
  },
  {
    name: "Full Stack (MERN & Next.js)",
    icon: Layers,
    desc: "Scalable React Applications",
  },
  {
    name: "Django & Python Backend",
    icon: Code2,
    desc: "RESTful APIs & RBAC Architecture",
  },
  {
    name: "Applied Cryptography",
    icon: ShieldCheck,
    desc: "AES Encryption & Data Security",
  },
  {
    name: "IoT & Embedded Hardware",
    icon: Cpu,
    desc: "Arduino & Sensor Integration",
  },
];

const hobbies = [
  {
    title: "Photography",
    icon: Camera,
    desc: "Capturing visual stories & moments",
  },
  {
    title: "Gaming",
    icon: Gamepad2,
    desc: "Exploring virtual worlds & mechanics",
  },
  {
    title: "Travelling",
    icon: Plane,
    desc: "Discovering new places & cultures",
  },
  {
    title: "Tech Exploration",
    icon: Sparkles,
    desc: "Testing cutting-edge tech & tools",
  },
];

interface HobbyCardProps {
  hobby: {
    title: string;
    icon: React.ElementType;
    desc: string;
  };
}

const HobbyCard = ({ hobby }: HobbyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = hobby.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    const rotateX = (yPct * -16).toFixed(2);
    const rotateY = (xPct * 16).toFixed(2);

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
    cardRef.current.style.setProperty("--rx", `${rotateX}deg`);
    cardRef.current.style.setProperty("--ry", `${rotateY}deg`);
    cardRef.current.style.setProperty("--opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
    cardRef.current.style.setProperty("--opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hobby-card group relative cursor-pointer overflow-hidden border border-white/10 bg-black/30 p-6 transition-all duration-500 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/[0.04] hover:shadow-[0_10px_30px_-10px_rgba(0,229,255,0.15)]"
      style={{
        transform:
          "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        transition:
          "transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Mouse Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-30"
        style={{
          opacity: "var(--opacity, 0)",
          background:
            "radial-gradient(350px circle at var(--x, 0px) var(--y, 0px), rgba(0, 229, 255, 0.15), transparent 40%)",
        }}
      />

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-black/50 text-neutral-400 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[#00E5FF]/40 group-hover:text-[#00E5FF]">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00E5FF] transition-colors duration-300">
            {hobby.title}
          </h4>
          <p className="text-sm text-neutral-400">{hobby.desc}</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const competenciesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hobbiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Intro Animation
      if (introRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          ".philosophy-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        );
      }

      // 2. Competencies Grid Entrance
      if (competenciesRef.current) {
        gsap.fromTo(
          ".competency-card",
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: competenciesRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // 3. Timeline Animation
      if (timelineRef.current) {
        // Draw the center line with scrub
        gsap.fromTo(
          ".timeline-center-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        );

        // Timeline items snap in and ignite
        const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-node");
        timelineItems.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          const iconEl = item.querySelector(".timeline-node-icon");
          const cardEl = item.querySelector(".timeline-node-card");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          });

          tl.fromTo(
            item,
            { opacity: 0, x: isLeft ? -45 : 45 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
          );

          if (iconEl) {
            tl.fromTo(
              iconEl,
              { scale: 0.7, boxShadow: "0 0 0px rgba(0, 229, 255, 0)" },
              {
                scale: 1,
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.8)",
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.5",
            );
          }

          if (cardEl) {
            tl.fromTo(
              cardEl,
              { borderColor: "rgba(255, 255, 255, 0.1)" },
              {
                borderColor: "rgba(0, 229, 255, 0.5)",
                duration: 0.6,
                yoyo: true,
                repeat: 1,
              },
              "-=0.6",
            );
          }
        });
      }

      // 4. Hobbies Animation
      if (hobbiesRef.current) {
        gsap.fromTo(
          ".hobby-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hobbiesRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden border-y border-white/5 bg-[#07090d] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(0,229,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-[#00E5FF]/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <header className="about-header mb-16 border-b border-white/10 pb-8 md:mb-20 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00E5FF]">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
              01 // Developer Profile
            </div>
            <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              About <span className="text-[#00E5FF]">Me</span>
            </h2>
          </div>
          <p className="mt-5 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-white/45 md:mt-0 md:text-right">
            Building useful systems where engineering discipline meets thoughtful interface design.
          </p>
        </header>

        {/* Part 1: Intro & Bio */}
        <div
          ref={introRef}
          className="relative mx-auto mb-28 max-w-5xl border border-white/10 bg-black/30 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-8 md:p-10"
        >
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent" />
          <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
            STATUS: ACTIVE
          </div>
          {/* Philosophy & Summary */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex w-fit items-center space-x-2 border border-[#00E5FF]/25 bg-[#00E5FF]/10 px-3 py-1.5 font-mono text-xs text-[#00E5FF]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sawantwadi, Maharashtra, India</span>
            </div>

            <h3 className="philosophy-text text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Engineering Scalable Systems &{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-t from-[#00E5FF] via-cyan-400 to-blue-500">
                Immersive Digital Experiences.
              </span>
            </h3>

            <p className="philosophy-text text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              I am a passionate{" "}
              <strong className="text-white font-medium">
                Full Stack Developer
              </strong>{" "}
              with a keen eye for design and a commitment to creating immersive
              digital experiences. With a strong foundation in Computer Science,
              I specialize in building scalable web applications using{" "}
              <strong className="text-white font-medium">
                Next.js, the MERN stack, and Django
              </strong>
              .
            </p>

            <div className="philosophy-text relative overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#00E5FF]/40 sm:p-6">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00E5FF] to-blue-600"></div>
              <p className="text-base md:text-lg text-neutral-200 font-light leading-relaxed italic">
                &ldquo;My approach combines technical expertise with creative
                problem-solving. Great software is not just about writing code;
                it&rsquo;s about understanding user needs and delivering
                solutions that truly make a difference.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Philosophy</span>
              </div>
            </div>

            <p className="philosophy-text text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
              Having completed a 3-month Software Development Internship at{" "}
              <strong className="text-white font-medium">
                Softmusk Solutions
              </strong>{" "}
              and authored{" "}
              <strong className="text-white font-medium">
                20+ public open-source repositories
              </strong>{" "}
              (including platforms like{" "}
              <span className="text-[#00E5FF] font-medium">RoastRoom</span> and{" "}
              <span className="text-[#00E5FF] font-medium">SafeCity Hub</span>),
              I bridge deep engineering execution with refined UI/UX. When
              I&apos;m not coding, you can find me exploring new technologies,
              contributing to open-source projects, or designing 3D assets.
            </p>

            <div className="philosophy-text flex flex-wrap gap-2.5 pt-1">
              <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 transition-colors hover:border-[#00E5FF]/40">
                <Code2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Full Stack
                Architect
              </span>
              <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 transition-colors hover:border-[#00E5FF]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" /> Creative
                Problem Solving
              </span>
              <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 transition-colors hover:border-[#00E5FF]/40">
                <BrainCircuit className="w-3.5 h-3.5 text-[#00E5FF]" /> 3D
                Assets & Open Source
              </span>
            </div>

            {/* Resume CTAs */}
            <div className="philosophy-text flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-[#00E5FF] text-white font-semibold text-xs font-mono uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </Link>
              <a
                href="/Resume/Vedang_Dhuri_Resume.pdf"
                download="Vedang_Dhuri_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-neutral-300 hover:text-white font-medium text-xs font-mono uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4 text-[#00E5FF]" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Part 2: Core Competencies Grid */}
        <div ref={competenciesRef} className="mb-32">
          <div className="mb-12 border-l border-[#00E5FF]/50 pl-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00E5FF]">02 // Core Systems</p>
            <h3 className="mb-3 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Core Expertise
            </h3>
            <p className="max-w-xl text-sm text-neutral-400 md:text-base">
              Key domains and technologies highlighted from my software
              engineering background.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {coreCompetencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                   className="competency-card group flex items-start space-x-4 border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/[0.04]"
                >
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-all duration-300 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {comp.name}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-400 font-light">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 3: Professional Journey & Education Timeline */}
        <div ref={timelineRef} className="mb-32 relative">
          <div className="mb-16 border-l border-[#00E5FF]/50 pl-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00E5FF]">03 // Timeline</p>
            <h3 className="mb-3 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Experience & Education
            </h3>
            <p className="max-w-xl text-sm text-neutral-400 md:text-base">
              My academic path and hands-on industry background.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5">
              <div className="timeline-center-line absolute top-0 left-0 w-full bg-gradient-to-b from-[#00E5FF] via-blue-500 to-transparent origin-top h-full shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#00E5FF] blur-sm rounded-full" />
              </div>
            </div>

            {/* Center Line Mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-white/5">
              <div className="timeline-center-line absolute top-0 left-0 w-full bg-gradient-to-b from-[#00E5FF] via-blue-500 to-transparent origin-top h-full shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#00E5FF] blur-sm rounded-full" />
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              {journeyTimeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`timeline-node relative flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"} items-center w-full`}
                  >
                    {/* Timeline Node Icon */}
                    <div className="timeline-node-icon absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-[#00E5FF] z-10 flex items-center justify-center text-[#00E5FF] transition-shadow duration-500">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-full pl-16 md:pl-0 md:w-[45%] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
                    >
                      <div className="timeline-node-card space-y-3 border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/[0.04] hover:shadow-[0_0_25px_rgba(0,229,255,0.15)]">
                        <div
                          className={`flex items-center space-x-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}
                        >
                          <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-bold tracking-wider">
                            {item.period}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-white">
                            {item.title}
                          </h4>
                          <h5 className="text-sm font-medium text-neutral-300">
                            {item.organization}
                          </h5>
                          <p className="text-xs text-neutral-500 font-mono mt-0.5">
                            {item.location}
                          </p>
                        </div>

                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                          {item.description}
                        </p>

                        {/* Skill Tags */}
                        <div
                          className={`flex flex-wrap gap-1.5 pt-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}
                        >
                          {item.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 4: Personal Interests / Hobbies */}
        <div ref={hobbiesRef} className="max-w-5xl mx-auto">
          <div className="mb-14 border-l border-[#00E5FF]/50 pl-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00E5FF]">04 // Beyond Work</p>
            <h3 className="mb-3 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Beyond the Code
            </h3>
            <p className="max-w-xl text-sm text-neutral-400 md:text-base">
              What keeps me inspired and creative outside software development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <HobbyCard key={index} hobby={hobby} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
