"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";
import { CometCard } from "@/components/ui/comet-card";
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
import { MdAnimation } from "react-icons/md";
import { MdAutoAwesomeMotion } from "react-icons/md";
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
}: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Card entrance with GSAP
    gsap.fromTo(
      card,
      { opacity: 0, y: 60, rotateX: -8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "restart none none reset",
        },
      },
    );

    // Badge pop-in when card enters viewport
    if (badgesRef.current) {
      const badges = badgesRef.current.children;
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.5, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === card) st.kill();
      });
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="h-full"
      style={{ opacity: 0, perspective: "600px" }}
    >
      <Card className="group relative overflow-hidden bg-indigo-950/20 backdrop-blur-sm border-white/10 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 z-100 hover:border-blue-500/30 h-full">
        <CardContent className="p-6 relative z-10 cursor-target h-full">
          <CometCard>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl bg-white/5 ${color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
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
                    className="group/badge relative bg-white/5 hover:bg-white/10 text-gray-100 border-white/10 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 h-fit"
                  >
                    <span className="transform group-hover/badge:scale-110 group-hover/badge:rotate-12 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="font-medium">{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </CometCard>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillsSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current && headingLineRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        headingLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.3",
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

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
          name: "Django",
          icon: <SiDjango className="w-4 h-4 text-[#2f473e]" />,
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
      title: "Cloud ",
      color: "text-orange-400",
      skills: [
        { name: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
        { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
        { name: "Render ", icon: <SiRender className="w-4 h-4 text-white" /> },
        {
          name: "Netlify  ",
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
          icon: <FaGithub className="w-4 h-4 text-[#F05032]" />,
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
    <section id="skills" className="container mx-auto px-4 py-11 relative z-10">
      <div ref={headingRef} className="text-center mb-16 opacity-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Skills & Expertise
        </h2>
        <div
          ref={headingLineRef}
          className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center mb-4"
          style={{ transform: "scaleX(0)" }}
        />
        <p className="text-gray-400 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency
          levels.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCard
            key={index}
            index={index}
            icon={category.icon}
            title={category.title}
            skills={category.skills}
            color={category.color}
          />
        ))}
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
          animation: shimmer 2s infinite;
        }
        @keyframes border-rotate {
          from {
            --border-angle: 0deg;
          }
          to {
            --border-angle: 360deg;
          }
        }
        .animate-border-rotate {
          animation: border-rotate 3s linear infinite;
        }
        @property --border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
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
