"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlobeDemo from "@/components/ui/globe-demo";
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaLinux,
  FaFigma,
  FaAws,
  FaBootstrap,
  FaJava,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiTypescript,
  SiTailwindcss,
  SiSqlite,
  SiMongodb,
  SiArduino,
  SiVercel,
  SiVite,
  SiRender,
  SiNetlify,
  SiAdobephotoshop,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation, MdAutoAwesomeMotion } from "react-icons/md";
import { RiAlibabaCloudLine } from "react-icons/ri";
import { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: Skill[];
  color: string;
  index: number;
  className?: string;
}

interface SkillCategory {
  icon: LucideIcon;
  title: string;
  color: string;
  skills: Skill[];
}

const SkillCard = ({
  icon: Icon,
  title,
  skills,
  color,
  index,
  className,
}: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
    cardRef.current.style.setProperty("--opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--opacity", "0");
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 3D Perspective Fold Entrance
    gsap.fromTo(
      card,
      { opacity: 0, y: 50, rotateX: -15, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );

    // Staggered Spring Badges pop-in
    if (badgesRef.current) {
      const badges = badgesRef.current.children;
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.7, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === card)
        .forEach((st) => st.kill());
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-full ${className || ""}`}
      style={{ opacity: 0, perspective: "800px" }}
    >
      <Card className="group relative z-10 h-full overflow-hidden rounded-none border border-white/10 bg-black/30 backdrop-blur-md transition-all duration-500 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/[0.02] hover:shadow-[0_10px_30px_-15px_rgba(0,229,255,0.2)] sm:rounded-sm">
        {/* Dynamic Interactive Cursor Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 z-30"
          style={{
            opacity: "var(--opacity, 0)",
            background:
              "radial-gradient(350px circle at var(--x, 0px) var(--y, 0px), rgba(0, 229, 255, 0.15), transparent 40%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 transition-colors group-hover:border-[#00E5FF]/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 transition-colors group-hover:border-[#00E5FF]/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 transition-colors group-hover:border-[#00E5FF]/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 transition-colors group-hover:border-[#00E5FF]/50 pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#00E5FF]/70 tracking-widest font-bold uppercase">
              CMD_ [{title.toLowerCase().replace(/\s+/g, "_")}]
            </span>
          </div>
          <div className="flex gap-1.5 opacity-50 transition-opacity group-hover:opacity-100">
            <span className="w-1 h-3 bg-white/20 transition-colors duration-300 group-hover:bg-[#00E5FF]/40" />
            <span className="w-1 h-3 bg-white/20 transition-colors duration-300 group-hover:bg-[#00E5FF]/60" />
            <span className="w-1 h-3 bg-white/20 transition-colors duration-300 group-hover:bg-[#00E5FF]/80" />
          </div>
        </div>
        
        <CardContent className="p-6 relative z-10 cursor-target h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-2.5 bg-black/50 border border-white/10 ${color} group-hover:text-[#00E5FF] group-hover:border-[#00E5FF]/30 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                {title}
              </h3>
            </div>
            <div
              ref={badgesRef}
              className="flex flex-wrap gap-2 flex-1 content-start"
            >
              {skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="group/badge relative bg-white/[0.03] hover:bg-[#00E5FF]/10 text-gray-300 hover:text-white border-white/10 flex items-center gap-2 py-1.5 px-3 transition-all duration-300 hover:scale-105 hover:border-[#00E5FF]/40 h-fit rounded-none"
                >
                  <span className="opacity-80 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:opacity-100">
                    {skill.icon}
                  </span>
                  <span className="font-mono text-xs font-medium tracking-wide">{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      icon: Code2,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        { name: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="w-4 h-4 text-white" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "HTML5",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-[#E34F26]" />,
        },
        {
          name: "CSS3",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-[#1572B6]" />,
        },
        {
          name: "BootStrap5",
          icon: <FaBootstrap className="w-4 h-4 text-[#563d7c]" />,
        },
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-green-400",
      skills: [
        {
          name: "Django",
          icon: <SiDjango className="w-4 h-4 text-[#2f473e]" />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4 text-[#96cd49]" />,
        },
        {
          name: "Express.js",
          icon: <SiExpress className="w-4 h-4 text-[#68a063]" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
        },
        {
          name: "Python",
          icon: <FaPython className="w-4 h-4 text-[#3776AB]" />,
        },
        { name: "Java", icon: <FaJava className="w-4 h-4 text-[#f89820]" /> },
        {
          name: "SQLite",
          icon: <SiSqlite className="w-4 h-4 text-[#90D4F4]" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="w-4 h-4 text-[#47A248]" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      color: "text-purple-400",
      skills: [
        { name: "Figma", icon: <FaFigma className="w-4 h-4 text-[#F24E1E]" /> },
        {
          name: "Responsive Design",
          icon: <Layout className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "Wireframing",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#9CA3AF]" />,
        },
        {
          name: "Prototyping",
          icon: <MdAnimation className="w-4 h-4 text-[#F59E0B]" />,
        },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud",
      color: "text-orange-400",
      skills: [
        { name: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
        { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
        { name: "Render", icon: <SiRender className="w-4 h-4 text-white" /> },
        {
          name: "Netlify",
          icon: <SiNetlify className="w-4 h-4 text-[#05bdba]" />,
        },
      ],
    },
    {
      icon: Cpu,
      title: "Tools & Technologies",
      color: "text-pink-400",
      skills: [
        {
          name: "VS Code",
          icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
        },
        { name: "Vite", icon: <SiVite className="w-4 h-4 text-[#646CFF]" /> },
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        {
          name: "GitHub",
          icon: <FaGithub className="w-4 h-4 text-[#FFFFFF]" />,
        },
        { name: "Linux", icon: <FaLinux className="w-4 h-4 text-[#FCC624]" /> },
        {
          name: "Arduino",
          icon: <SiArduino className="w-4 h-4 text-[#646CFF]" />,
        },
      ],
    },
    {
      icon: Paintbrush,
      title: "Creative Skills",
      color: "text-yellow-400",
      skills: [
        {
          name: "UI Animation",
          icon: <MdAnimation className="w-4 h-4 text-[#FF4081]" />,
        },
        {
          name: "Photoshop",
          icon: <SiAdobephotoshop className="w-4 h-4 text-[#31a8ff]" />,
        },
        {
          name: "Motion Graphics",
          icon: <MdAutoAwesomeMotion className="w-4 h-4 text-[#FF6D00]" />,
        },
        {
          name: "GSAP Animation",
          icon: <RiAlibabaCloudLine className="w-4 h-4 text-[#50755a]" />,
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden border-y border-white/5 bg-[#07090d] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(0,229,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#0E0E0E] shadow-[0_0_150px_100px_#00E5FF15]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <header className="mb-16 border-b border-white/10 pb-8 md:mb-20 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00E5FF]">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
              02 // Systems Architecture
            </div>
            <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Skills & <span className="text-[#00E5FF]">Expertise</span>
            </h2>
          </div>
          <p className="mt-5 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-white/45 md:mt-0 md:text-right">
            A comprehensive overview of my technical skills and proficiency
            levels across multiple domains.
          </p>
        </header>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-8">
          <div className="relative flex w-full flex-col items-center justify-center lg:sticky lg:top-32 lg:w-5/12">
            <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-full border border-[#00E5FF]/20 bg-black/40 shadow-[0_0_60px_-15px_rgba(0,229,255,0.3)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-gradient-to-br from-[#00E5FF]/5 to-transparent" />
              <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex scale-90 items-center justify-center sm:scale-100">
                <GlobeDemo />
              </div>
            </div>

            <div className="mt-8 w-full px-4 text-center">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
                &lt; Active Technologies /&gt;
              </p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
          </div>

          <div className="grid w-full auto-rows-max grid-cols-1 gap-5 sm:grid-cols-2 lg:w-7/12 lg:pl-10">
            {skillCategories.map((category, index) => {
              const translateYClass =
                index % 2 === 0 ? "sm:-translate-y-8" : "sm:translate-y-8";

              return (
                <div
                  key={category.title}
                  className={`w-full ${index > 1 ? translateYClass : ""}`}
                >
                  <SkillCard
                    index={index}
                    icon={category.icon}
                    title={category.title}
                    skills={category.skills}
                    color={category.color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
