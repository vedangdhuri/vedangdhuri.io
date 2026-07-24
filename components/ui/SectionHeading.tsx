"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: React.ReactNode;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let st: ScrollTrigger | undefined;

      if (containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none", // Or "play none none reverse" depending on preference, let's stick to playing once or playing every time. Often for headings, once is better so it doesn't replay annoyingly, but "play none none reverse" makes it replay. Let's use "play none none none" as in Skills.
            once: true,
            onToggle: (self) => {
              st = self;
            },
          },
        });

        // Animate title characters
        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll(".char");
          tl.fromTo(
            chars,
            { opacity: 0, y: 40, rotateX: -50 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: "back.out(1.4)",
            }
          );
        }

        // Animate the accent line
        if (lineRef.current) {
          tl.fromTo(
            lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power3.inOut" },
            "-=0.5"
          );
        }

        // Animate subtitle
        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );
        }
      }

      return () => {
        st?.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [title, subtitle]);

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const lineAlignmentOrigin = {
    left: "origin-left",
    center: "origin-center",
    right: "origin-right",
  };

  const titleChars = title.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ transformOrigin: "center bottom" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${alignmentClasses[alignment]} mb-16 ${className}`}
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight"
        style={{ perspective: "600px" }}
      >
        {titleChars}
      </h2>
      <div
        ref={lineRef}
        className={`h-[3px] w-20 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent ${lineAlignmentOrigin[alignment]} mb-5`}
        style={{ transform: "scaleX(0)" }}
      />
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-neutral-400 max-w-2xl text-base md:text-lg opacity-0"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
