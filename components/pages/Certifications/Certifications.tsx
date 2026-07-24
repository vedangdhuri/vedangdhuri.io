"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { courseLinks } from "@/data/course_links";
import { getDeviceTier } from "@/utils/useDeviceTier";
import { ExternalLink, Award, BookOpen, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Stat items ─────────────────────────────────────────────────────────────
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const STATS: StatItem[] = [
  {
    value: 20,
    suffix: "+",
    label: "Certifications Earned",
    icon: <Award className="w-5 h-5" />,
    color: "text-[#00E5FF]",
  },
  {
    value: 100,
    suffix: "%",
    label: "Google Cloud Skill Boost",
    icon: <Zap className="w-5 h-5" />,
    color: "text-[#4285F4]",
  },
  {
    value: 1,
    suffix: " Platform",
    label: "Continuous Learning Path",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-[#34A853]",
  },
];

// Split certificates into two rows of 10
const ROW_1 = courseLinks.slice(0, 10);
const ROW_2 = courseLinks.slice(10, 20);

// ─── Infinite marquee (text) ─────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [...courseLinks, ...courseLinks];
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/5 mb-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((cert, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/40 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/60 shrink-0" />
            {cert.title}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Badge card ──────────────────────────────────────────────────────────────
interface BadgeCardProps {
  title: string;
  link: string;
  img: string;
}

function BadgeCard({ title, link, img }: BadgeCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View badge: ${title}`}
      className="group relative flex-shrink-0 flex items-center justify-center p-2 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div
        className="badge-img-wrap relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 flex-shrink-0 drop-shadow-[0_0_20px_rgba(0,229,255,0.15)] group-hover:drop-shadow-[0_0_35px_rgba(0,229,255,0.45)] transition-all duration-300"
      >
        <Image
          src={img}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 240px, 256px"
        />
      </div>
    </a>
  );
}

// ─── Marquee Row (GSAP-powered infinite scroll) ─────────────────────────────
interface MarqueeRowProps {
  certs: typeof courseLinks;
  direction: "left" | "right";
  rowRef: React.RefObject<HTMLDivElement | null>;
}

function MarqueeRow({ certs, direction, rowRef }: MarqueeRowProps) {
  // Duplicate the items 3× for seamless loop
  const items = [...certs, ...certs, ...certs];

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-6 md:gap-8 items-center will-change-transform"
        data-direction={direction}
      >
        {items.map((cert, idx) => (
          <BadgeCard
            key={`${cert.id}-${idx}`}
            title={cert.title}
            link={cert.link}
            img={cert.img[0]}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const counterRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const row1Ref      = useRef<HTMLDivElement>(null);
  const row2Ref      = useRef<HTMLDivElement>(null);
  const rowsWrapRef  = useRef<HTMLDivElement>(null);

  const [isReducedMotion] = useState(() => getDeviceTier() === 2);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {

      // ── 2. Stats count-up ────────────────────────────────────────────────
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        STATS.forEach((stat, i) => {
          const el = counterRefs.current[i];
          if (!el) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.6,
            ease: "power2.out",
            delay: i * 0.12,
            onUpdate() {
              el.textContent = Math.floor(obj.val) + stat.suffix;
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        });
      }

      // ── 3. Scroll-scrubbed Marquee Rows ──────────────────────────────────
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      const rowsWrap = rowsWrapRef.current;
      const section = sectionRef.current;

      if (row1 && row2 && rowsWrap && section) {
        const setupScrubRow = (
          el: HTMLElement,
          direction: "leftToRight" | "rightToLeft",
        ) => {
          gsap.fromTo(
            el,
            { x: () => (direction === "leftToRight" ? -(el.scrollWidth / 3) : 0) },
            {
              x: () => (direction === "leftToRight" ? 0 : -(el.scrollWidth / 3)),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        };

        // First row: animates from left to right
        setupScrubRow(row1, "leftToRight");

        // Second row: animates from right to left
        setupScrubRow(row2, "rightToLeft");

        // ── 4. Fade-in entrance for the rows ───────────────────────────────
        gsap.fromTo(
          rowsWrap,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rowsWrap,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative z-10"
    >
      {/* ── Inner container for non-pinned content ── */}
      <div className="container mx-auto px-4 pt-16">

        {/* Section heading */}
        <div className="text-center mb-12">
          <SectionHeading 
            title="Certifications & Achievements"
            subtitle={
              <>
                Verified credentials earned through the{" "}
                <span className="text-[#00E5FF]/80">Google Cloud Skills Boost</span>{" "}
                platform{" — "}spanning AI, data engineering, cloud infrastructure, and security.
              </>
            }
            alignment="center"
            className="!mb-0"
          />
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 border border-white/8 bg-white/[0.03] backdrop-blur-sm px-6 py-5"
            >
              <span className={`${stat.color} mb-1`}>{stat.icon}</span>
              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className={`text-2xl font-bold font-mono ${stat.color}`}
              >
                0{stat.suffix}
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <MarqueeStrip />
      </div>

      {/* ── Two-row certificate marquee ───────────────────────────────────── */}
      <div ref={rowsWrapRef} className="relative py-8 md:py-12 space-y-6 md:space-y-8">
        {/* Row 1 — scrolls left */}
        <MarqueeRow certs={ROW_1} direction="left" rowRef={row1Ref} />

        {/* Row 2 — scrolls right */}
        <MarqueeRow certs={ROW_2} direction="right" rowRef={row2Ref} />
      </div>

      {/* ── View all CTA ─────────────────────────────────────────────────── */}
      <div className="flex justify-center py-12">
        <a
          href="https://www.skills.google/public_profiles/dd4f0778-2e40-45dc-a7b1-a0df3a2ee621"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-[2px] uppercase text-white/40 hover:text-[#00E5FF] transition-colors duration-200 border border-white/10 hover:border-[#00E5FF]/30 px-6 py-3 cursor-pointer"
        >
          View Full Profile on Google Skills
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>

      {/* ── Keyframes ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
