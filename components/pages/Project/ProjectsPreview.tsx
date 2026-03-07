"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPreview() {
  const featuredProjects = projects.slice(0, 3);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading reveal
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

    // Subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Horizontal Scroll for Projects
    if (containerRef.current && scrollWrapperRef.current) {
      const getScrollAmount = () => {
        const wrapperWidth = scrollWrapperRef.current!.scrollWidth;
        const windowWidth = document.documentElement.clientWidth;
        // Scroll enough to bring the right padding into view, letting the last card center nicely
        return -(wrapperWidth - windowWidth);
      };

      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "center center",
        end: () => `+=${scrollWrapperRef.current!.scrollWidth}`,
        scrub: 1,
        animation: gsap.to(scrollWrapperRef.current, {
          x: getScrollAmount,
          ease: "none",
        }),
        // Re-calculate on resize
        invalidateOnRefresh: true,
      });

      return () => {
        pinTrigger.kill();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-neutral-100 tracking-tight opacity-0"
          >
            Projects
          </h2>
          <div
            ref={headingLineRef}
            className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center"
            style={{ transform: "scaleX(0)" }}
          />
          <p
            ref={subtitleRef}
            className="text-lg text-neutral-400 max-w-2xl mx-auto opacity-0"
          >
            Showcasing impactful projects and technical achievements.
          </p>
        </div>

        {/* Horizontal Projects Carousel */}
        <div ref={containerRef} className="overflow-hidden w-full py-10 mt-10">
          <div
            ref={scrollWrapperRef}
            className="flex flex-row items-stretch gap-8 w-max pl-6 pr-[10vw] md:pr-[20vw] lg:pr-[30vw]"
          >
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 h-auto"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-neutral-100 bg-neutral-800 border border-neutral-700 rounded-xl hover:bg-neutral-700 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 group cursor-target focus:outline-none"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            View All Missions
          </Link>
        </div>
      </div>
    </section>
  );
}
