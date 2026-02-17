"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GitHubGraph() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading
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

    // Graph entrance
    if (graphRef.current) {
      gsap.fromTo(
        graphRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: graphRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Stats entrance
    if (statsRef.current) {
      const cards = statsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div ref={headingRef} className="opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight">
              GitHub Activity
            </h2>
          </div>
          <div
            ref={headingLineRef}
            className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-green-400 to-transparent origin-center"
            style={{ transform: "scaleX(0)" }}
          />
          <p className="text-neutral-400 max-w-xl mx-auto text-lg">
            My open source contributions and coding activity
          </p>
        </div>

        {/* Contribution Graph */}
        <div
          ref={graphRef}
          className="relative rounded-2xl border border-neutral-800 bg-[#0d1117] p-6 md:p-8 overflow-hidden hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.08)] transition-all duration-500 opacity-0"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />

          {/* Square Contribution Heatmap */}
          <div className="w-full overflow-x-auto mb-6">
            <img
              src="https://ghchart.rshah.org/3fb950/vedangdhuri"
              alt="Vedang Dhuri's GitHub Contribution Heatmap"
              className="w-full min-w-[700px] h-auto rounded-lg"
              style={{
                filter:
                  "invert(1) hue-rotate(180deg) brightness(0.85) contrast(1.2)",
              }}
              loading="lazy"
            />
          </div>

          {/* Label */}
          <div className="flex items-center justify-between mb-8 text-xs text-neutral-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#161b22] border border-neutral-700" />
              <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />
              <div className="w-3 h-3 rounded-sm bg-[#006d32]" />
              <div className="w-3 h-3 rounded-sm bg-[#26a641]" />
              <div className="w-3 h-3 rounded-sm bg-[#39d353]" />
            </div>
            <span>More</span>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6" />

          {/* Activity Line Graph */}
          <div className="w-full overflow-x-auto">
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=vedangdhuri&theme=github-dark&hide_border=true&bg_color=0d1117&color=3fb950&line=3fb950&point=ffffff&area=true&area_color=238636"
              alt="Vedang Dhuri's GitHub Activity Graph"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* GitHub Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-neutral-800 bg-[#0d1117] p-5 text-center hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] transition-all duration-300 opacity-0"
          >
            <img
              src="https://github-readme-stats-vd.vercel.app/api?username=vedangdhuri&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=3fb950&icon_color=3fb950&text_color=c9d1d9&count_private=true"
              alt="GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
            />
          </a>

          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-neutral-800 bg-[#0d1117] p-5 text-center hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] transition-all duration-300 opacity-0"
          >
            <img
              src="https://github-readme-streak-stats.herokuapp.com?user=vedangdhuri&theme=github-dark-blue&hide_border=true&background=0d1117&ring=3fb950&fire=3fb950&currStreakLabel=3fb950"
              alt="GitHub Streak"
              className="w-full h-auto"
              loading="lazy"
            />
          </a>

          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-neutral-800 bg-[#0d1117] p-5 text-center hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] transition-all duration-300 opacity-0"
          >
            <img
              src="https://github-readme-stats-vd.vercel.app/api/top-langs/?username=vedangdhuri&layout=compact&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=3fb950&text_color=c9d1d9"
              alt="Top Languages"
              className="w-full h-auto"
              loading="lazy"
            />
          </a>
        </div>

        {/* Profile Link */}
        <div className="flex justify-center mt-8">
          <a
            href="https://github.com/vedangdhuri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-neutral-100 bg-neutral-800 border border-neutral-700 rounded-xl hover:bg-neutral-700 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Full Profile
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
