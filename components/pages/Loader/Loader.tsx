"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const nameEl = nameRef.current;
    const lineEl = lineRef.current;
    const subtitleEl = subtitleRef.current;
    if (!container || !nameEl || !lineEl || !subtitleEl) return;

    const tl = gsap.timeline();

    // Phase 1: Letter-by-letter name reveal
    const chars = nameEl.querySelectorAll(".loader-char");
    tl.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
    );

    // Phase 2: Horizontal line expands from center
    tl.fromTo(
      lineEl,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
      "-=0.2",
    );

    // Phase 3: Subtitle fades in
    tl.fromTo(
      subtitleEl,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2",
    );

    // Phase 4: Hold, then wipe entire loader up
    tl.to(container, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const name = "VEDANG DHURI";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />

      {/* Name */}
      <div
        ref={nameRef}
        className="relative flex items-center gap-[2px] text-4xl md:text-6xl font-bold tracking-[0.2em] text-white"
        style={{ perspective: "600px" }}
      >
        {name.split("").map((char, i) => (
          <span
            key={i}
            className="loader-char inline-block"
            style={{ transformOrigin: "center bottom" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Horizontal line */}
      <div
        ref={lineRef}
        className="mt-6 h-[2px] w-32 md:w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="mt-4 text-sm md:text-base text-gray-500 tracking-[0.4em] uppercase opacity-0"
      >
        Portfolio
      </div>
    </div>
  );
};

export default Loader;
