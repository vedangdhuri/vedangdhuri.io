"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

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

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasAnimated = false;
    let bgAnimation: anime.AnimeInstance | null = null;

    // Background shapes continuous fluid animation
    if (bgShapesRef.current) {
      const shapes = bgShapesRef.current.querySelectorAll(".anime-shape");
      bgAnimation = anime({
        targets: shapes,
        translateX: () => anime.random(-40, 40),
        translateY: () => anime.random(-40, 40),
        scale: () => anime.random(8, 12) / 10,
        rotate: () => anime.random(-15, 15),
        duration: () => anime.random(4000, 7000),
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            // Kinetic typography entrance for biography
            if (textRef.current) {
              const textElements = textRef.current.querySelectorAll(".reveal-text");
              anime({
                targets: textElements,
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: anime.stagger(150),
                easing: "easeOutExpo",
              });
            }

            // Timeline kinetic entrance
            if (timelineRef.current) {
              const timelineLine = timelineRef.current.querySelector(".timeline-line");
              const timelineItems = timelineRef.current.querySelectorAll(".timeline-item");
              
              const tl = anime.timeline({
                easing: "easeOutQuart",
              });

              tl.add({
                targets: timelineLine,
                scaleY: [0, 1],
                opacity: [0, 1],
                duration: 800,
              }).add({
                targets: timelineItems,
                translateX: [30, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(200),
              }, "-=400");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (bgAnimation) bgAnimation.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 text-white overflow-hidden ">
      {/* Abstract Animated Background */}
      <div ref={bgShapesRef} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="anime-shape absolute top-[20%] left-[10%] w-64 h-64 rounded-full border-[1px] border-indigo-500/20 mix-blend-screen blur-[1px]" />
        <div className="anime-shape absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full border-[1px] border-violet-500/20 mix-blend-screen blur-[1px]" />
        <div className="anime-shape absolute top-[40%] left-[60%] w-[40rem] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -rotate-45" />
        <div className="anime-shape absolute top-[60%] right-[60%] w-[30rem] h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent rotate-45" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Biography - 7 Columns */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="reveal-text text-sm uppercase tracking-[0.2em] text-indigo-400 mb-8 font-mono">
              About
            </h2>
            <div className="space-y-8">
              <p className="reveal-text text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.2] tracking-tight text-white/95">
                I build immersive digital experiences where{" "}
                <span className="text-indigo-400 font-serif italic">engineering</span>{" "}
                meets{" "}
                <span className="text-violet-400 font-serif italic">design</span>.
              </p>
              <p className="reveal-text text-lg text-white/60 leading-relaxed max-w-2xl font-light">
                As a Full Stack Developer, I specialize in crafting scalable web applications
                using modern technologies. My approach is rooted in the belief that great
                software isn't just functional—it's an experience. I merge deep technical
                expertise with an obsessive attention to aesthetic detail.
              </p>
              <div className="reveal-text flex items-center gap-6 pt-4 text-sm font-mono text-white/40">
                <span>MAHARASHTRA, IN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>2+ YEARS EXP</span>
              </div>
            </div>
          </div>

          {/* Education Timeline - 4 Columns */}
          <div ref={timelineRef} className="lg:col-span-4 lg:col-start-9 relative">
             <h2 className="reveal-text text-sm uppercase tracking-[0.2em] text-indigo-400 mb-12 font-mono opacity-0">
              Timeline
            </h2>
            
            <div className="relative">
              {/* Sleek Line */}
              <div className="timeline-line absolute left-0 top-2 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 via-violet-500/20 to-transparent origin-top opacity-0" />

              <div className="space-y-12 pl-8">
                {education.map((edu, index) => (
                  <div key={index} className="timeline-item opacity-0 relative group cursor-default">
                    {/* Glowing Dot */}
                    <div className="absolute -left-[36.5px] top-2 w-[8px] h-[8px] rounded-full bg-black border border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-500">
                      <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="space-y-2 transition-transform duration-500 group-hover:translate-x-2">
                      <p className="text-xs font-mono tracking-widest text-indigo-400/80">
                        {edu.year}
                      </p>
                      <h4 className="text-xl font-semibold text-white tracking-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-white/50 font-light pb-2">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
