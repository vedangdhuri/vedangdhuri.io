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
      <Card className="group relative overflow-hidden bg-indigo-950/20 backdrop-blur-sm border-white/10 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-[#00E5FF]/15 z-10 hover:border-[#00E5FF]/40 h-full">
        {/* Dynamic Interactive Cursor Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 z-30"
          style={{
            opacity: "var(--opacity, 0)",
            background:
              "radial-gradient(350px circle at var(--x, 0px) var(--y, 0px), rgba(0, 229, 255, 0.15), transparent 40%)",
          }}
        />

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.05)] to-transparent group-hover:via-[rgba(0,229,255,0.15)] animate-shimmer pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider font-bold uppercase">
              {">"}_ {title.toLowerCase().replace(/\s+/g, "_")}
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500/70 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/70 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-green-500/40 group-hover:bg-green-500/70 transition-colors duration-300" />
          </div>
        </div>

        <CardContent className="p-6 relative z-10 cursor-target h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-3 rounded-xl bg-white/5 ${color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-[#00E5FF] transition-all duration-300">
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
                  className="group/badge relative bg-white/5 hover:bg-white/10 text-gray-100 border-white/10 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00E5FF]/20 hover:-translate-y-0.5 hover:border-[#00E5FF]/40 h-fit"
                >
                  <span className="transform group-hover/badge:scale-110 group-hover/badge:rotate-12 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="font-medium">{skill.name}</span>
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
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[#00E5FF]/10 blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <header className="mb-16 border-b border-white/10 pb-8 md:mb-20 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00E5FF]">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
              02 // Capabilities Matrix
            </div>
            <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Skills <span className="text-[#00E5FF]">&amp; Expertise</span>
            </h2>
          </div>
          <p className="mt-5 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-white/45 md:mt-0 md:text-right">
            The technologies and creative tools I use to turn complex ideas into reliable digital products.
          </p>
        </header>

        {/* 3D Icon Globe Demo — component preserved */}
        <div className="relative mb-16 flex items-center justify-center border-y border-white/10 py-8 md:py-10">
          <span className="absolute left-0 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Interactive Skill Orbit
          </span>
          <span className="absolute bottom-4 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00E5FF]/70">
            Live Stack Overview
          </span>
          <GlobeDemo />
        </div>

        {/* Skill cards — component designs preserved */}
        <div>
          <div className="mb-8 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00E5FF]">
            <span className="h-px w-8 bg-[#00E5FF]" />
            Skill Modules
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                index={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
                color={category.color}
                className="col-span-1"
              />
            ))}
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
