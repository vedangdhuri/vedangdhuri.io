"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Camera, Gamepad2, Compass } from "lucide-react";
import main_image from "@/public/img/main_image.png";

gsap.registerPlugin(ScrollTrigger);

export const education = [
  {
    degree: "Diploma in Computer Engineering",
    institution: "Yashwantrao Bhonsale Institute of Technology",
    year: "2023 - 2026",
    description:
      "Focused on software engineering, algorithms, and web technologies. Expected Graduation with Honors.",
  },
  {
    degree: "Full Stack Web Development & IoT",
    institution: "Softmusk Info Pvt Ltd",
    year: "2025",
    description:
      "Intensive 12-week program covering modern web stack including MERN and IoT development.",
  },
];

// const quickFacts = [
//   { label: "Years Experience", value: 3, suffix: "+" },
//   { label: "Projects Completed", value: 20, suffix: "+" },
//   { label: "Lines of Code", value: 50, suffix: "k+" },
// ];

const hobbies = [
  { title: "Photography", icon: Camera, desc: "Capturing visual moments & stories" },
  { title: "Gaming", icon: Gamepad2, desc: "Immersive worlds & strategic gameplay" },
  { title: "Travelling & Exploring", icon: Compass, desc: "Discovering new places & cultures" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
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
          }
        });

        tl.fromTo(
          ".avatar-container",
          { opacity: 0, scale: 0.8, rotate: -5 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.5)" }
        )
        .fromTo(
          ".philosophy-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".quick-fact",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );

        // Counter Animation for Quick Facts
        gsap.utils.toArray<HTMLElement>(".fact-number").forEach((el) => {
          const targetValue = parseInt(el.getAttribute("data-value") || "0", 10);
          gsap.fromTo(el, 
            { innerHTML: 0 },
            { 
              innerHTML: targetValue,
              duration: 2,
              ease: "power3.out",
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: introRef.current,
                start: "top 80%",
                once: true,
              }
            }
          );
        });

        // Floating animation for avatar
        gsap.to(".avatar-container", {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // 2. Timeline Animation
      if (timelineRef.current) {
        // Draw the center line
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
            }
          }
        );

        // Timeline items snap in
        const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-node");
        timelineItems.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            item,
            { opacity: 0, x: isLeft ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              }
            }
          );
        });
      }

      // 3. Hobbies Animation
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
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <SectionHeading title="About Me" alignment="center" className="mb-20" />

        {/* Part 1: Intro & Quick Facts */}
        <div ref={introRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32 items-center">
          {/* Avatar/Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="avatar-container relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing background blob */}
              <div className="absolute inset-0 bg-[#00E5FF] rounded-full blur-[80px] opacity-20"></div>
              
              {/* Avatar placeholder / glassmorphic card */}
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-8 group">
                <div className="w-full h-full rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-black/20">
                   <Image src={main_image} alt="Vedang Dhuri" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy & Stats */}
          <div className="lg:col-span-7 flex flex-col space-y-10">
            <div className="space-y-6">
              <h3 className="philosophy-text text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Building immersive digital experiences where <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
                  Engineering meets Design.
                </span>
              </h3>
              <p className="philosophy-text text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                As a Full Stack Developer, I specialize in crafting scalable web applications using modern technologies. My approach is rooted in the belief that great software isn&apos;t just functional&mdash;it&apos;s an experience. I merge deep technical expertise with an obsessive attention to aesthetic detail.
              </p>
            </div>

            {/* Quick Facts */}
            {/* <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t border-white/10">
              {quickFacts.map((fact, index) => (
                <div key={index} className="quick-fact flex flex-col space-y-2">
                  <div className="flex items-baseline space-x-1">
                    <span 
                      className="fact-number text-4xl md:text-5xl font-bold text-white" 
                      data-value={fact.value}
                    >
                      0
                    </span>
                    <span className="text-2xl font-bold text-[#00E5FF]">{fact.suffix}</span>
                  </div>
                  <span className="text-sm md:text-base text-neutral-500 font-medium uppercase tracking-wider">{fact.label}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Part 2: Narrative Timeline */}
        <div ref={timelineRef} className="mb-32 relative">
           <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">The path I&apos;ve taken to get to where I am today.</p>
           </div>

           <div className="relative max-w-4xl mx-auto">
             {/* Center Line Desktop */}
             <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5">
                <div className="timeline-center-line absolute top-0 left-0 w-full bg-gradient-to-b from-[#00E5FF] via-blue-500 to-transparent origin-top h-full" />
             </div>

             {/* Center Line Mobile */}
             <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-white/5">
                <div className="timeline-center-line absolute top-0 left-0 w-full bg-gradient-to-b from-[#00E5FF] via-blue-500 to-transparent origin-top h-full" />
             </div>

             <div className="space-y-12 md:space-y-24">
                {education.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div key={index} className={`timeline-node relative flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'} items-center w-full`}>
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-[#00E5FF] z-10">
                        <div className="absolute inset-0 bg-[#00E5FF] rounded-full blur-[4px] opacity-60"></div>
                      </div>

                      {/* Content Card */}
                      <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold tracking-wider mb-4">
                            {item.year}
                          </span>
                          <h4 className="text-xl font-bold text-white mb-2">{item.degree}</h4>
                          <h5 className="text-sm font-medium text-neutral-300 mb-4">{item.institution}</h5>
                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })}
             </div>
           </div>
        </div>

        {/* Part 3: Hobbies / Interests */}
        <div ref={hobbiesRef} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Beyond the Code</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">When I&apos;m not building applications, here&apos;s what keeps me inspired.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {hobbies.map((hobby, index) => {
               const Icon = hobby.icon;
               return (
                 <div key={index} className="hobby-card group relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer">
                   {/* Hover Gradient Background */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                     <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-[#00E5FF] group-hover:scale-110 transition-all duration-300">
                       <Icon className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00E5FF] transition-colors duration-300">{hobby.title}</h4>
                       <p className="text-sm text-neutral-400">{hobby.desc}</p>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;
