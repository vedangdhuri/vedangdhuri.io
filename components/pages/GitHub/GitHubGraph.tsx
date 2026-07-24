/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function GitHubGraph() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Bento Grid Stagger Entrance
      if (gridRef.current) {
        const cards = gsap.utils.toArray(".bento-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-mono tracking-[3px] uppercase text-[#3fb950]/80 mb-2">
            {"// metrics"}
          </p>
          <SectionHeading 
            title="GitHub Activity"
            subtitle="A real-time overview of my open-source contributions, repositories, and coding consistency."
            alignment="center"
            className="!mb-0"
          />
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* 1. Main Heatmap (Full Width) */}
          <div className="bento-item opacity-0 md:col-span-12 group relative rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl p-6 md:p-8 overflow-hidden hover:border-[#3fb950]/30 transition-all duration-500 shadow-2xl">
            {/* Subtle Glow */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3fb950]/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono tracking-widest uppercase text-white/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                Contribution Heatmap
              </h3>
              <a href="https://github.com/vedangdhuri" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#3fb950] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="w-full overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              <img
                src="https://ghchart.rshah.org/3fb950/vedangdhuri"
                alt="Vedang Dhuri's GitHub Contribution Heatmap"
                className="w-full min-w-[700px] h-auto rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  filter: "invert(1) hue-rotate(180deg) brightness(0.85) contrast(1.2)",
                }}
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-end mt-2 text-[10px] font-mono text-white/40 uppercase tracking-widest gap-2">
              <span>Less</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5 border border-white/10" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* 2. GitHub Stats Card */}
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-item opacity-0 md:col-span-4 group relative rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl p-5 md:p-6 flex flex-col justify-center items-center hover:border-[#3fb950]/30 hover:bg-white/[0.03] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(63,185,80,0.1)]"
          >
            <img
              src="https://github-readme-stats-vd.vercel.app/api?username=vedangdhuri&show_icons=true&theme=transparent&hide_border=true&title_color=3fb950&icon_color=3fb950&text_color=c9d1d9&count_private=true"
              alt="GitHub Stats"
              className="w-full max-w-[350px] h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </a>

          {/* 3. Top Languages Card */}
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-item opacity-0 md:col-span-4 group relative rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl p-5 md:p-6 flex flex-col justify-center items-center hover:border-[#3fb950]/30 hover:bg-white/[0.03] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(63,185,80,0.1)]"
          >
            <img
              src="https://github-readme-stats-vd.vercel.app/api/top-langs/?username=vedangdhuri&layout=compact&theme=transparent&hide_border=true&title_color=3fb950&text_color=c9d1d9"
              alt="Top Languages"
              className="w-full max-w-[350px] h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </a>

          {/* 4. GitHub Streak Card */}
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-item opacity-0 md:col-span-4 group relative rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl p-5 md:p-6 flex flex-col justify-center items-center hover:border-[#3fb950]/30 hover:bg-white/[0.03] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(63,185,80,0.1)]"
          >
            <img
              src="https://streak-stats.demolab.com?user=vedangdhuri&theme=github-dark-blue&hide_border=true&background=transparent&ring=3fb950&fire=3fb950&currStreakLabel=3fb950"
              alt="GitHub Streak"
              className="w-full max-w-[350px] h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </a>

          {/* 5. Activity Line Graph (Full Width) */}
          <div className="bento-item opacity-0 md:col-span-12 group relative rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl p-6 md:p-8 overflow-hidden hover:border-[#3fb950]/30 transition-all duration-500 shadow-2xl mt-2">
            {/* Subtle Glow */}
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#3fb950]/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h3 className="text-sm font-mono tracking-widest uppercase text-white/60 mb-6">
              Contribution History
            </h3>
            
            <div className="w-full overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=vedangdhuri&theme=github-dark&hide_border=true&bg_color=transparent&color=3fb950&line=3fb950&point=ffffff&area=true&area_color=238636"
                alt="Vedang Dhuri's GitHub Activity Graph"
                className="w-full min-w-[700px] h-auto rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Profile Link / CTA */}
        <div className="flex justify-center mt-12 md:mt-16">
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[2px] uppercase text-white/40 hover:text-[#3fb950] transition-colors duration-200 border border-white/10 hover:border-[#3fb950]/30 px-6 py-3 rounded-full cursor-pointer bg-white/[0.02] backdrop-blur-sm hover:bg-[#3fb950]/5"
          >
            Explore Repositories
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}
