"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Zap,
  ArrowDownRight,
  Crosshair,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useDeviceTier } from "@/utils/useDeviceTier";
import image1 from "@/public/img/image1.png";
import image2 from "@/public/img/image2.png";
import image3 from "@/public/img/image3.png";

/* ------------------------------------------------------------------ */
/*  Asset URLs                                                         */
/* ------------------------------------------------------------------ */
const HERO_BASE_IMG = image1.src;

const HERO_REVEAL_IMG = image2.src;

const PRODUCT_THUMB_IMG = image3.src;

/* ------------------------------------------------------------------ */
/*  Developer profile data                                              */
/* ------------------------------------------------------------------ */
const SPECS = [
  { label: "Frontend", value: "Next.js & React" },
  { label: "Backend", value: "Django & REST APIs" },
  { label: "Stack", value: "MERN & TypeScript" },
  { label: "Focus", value: "Scalable Web Apps" },
] as const;

/* ------------------------------------------------------------------ */
/*  Quick-action icon matrix data                                      */
/* ------------------------------------------------------------------ */
const ACTION_ICONS = [
  { Icon: Shield, label: "Full Stack Development" },
  { Icon: Eye, label: "UI/UX Design" },
  { Icon: Zap, label: "AI & API Integration" },
] as const;

const SOCIAL_LINKS = [
  { Icon: Github, label: "GitHub", href: "https://github.com/vedangdhuri" },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/vedang.dhuri.69",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Spotlight radius helper                                            */
/* ------------------------------------------------------------------ */
function getSpotlightRadius(): number {
  const w = window.innerWidth;
  if (w < 640) return 130;
  if (w < 1024) return 180;
  return 280;
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */
export function HeroVisual() {
  const tier = useDeviceTier();

  /* Refs ----------------------------------------------------------- */
  const heroRef = useRef<HTMLElement>(null);
  const baseImgRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);
  const hudTopRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  /* Smooth cursor tracking for spotlight reveal -------------------- */
  const mouseTarget = useRef({ x: -999, y: -999 });
  const mouseCurrent = useRef({ x: -999, y: -999 });
  const rafId = useRef<number>(0);

  /* Pointer tracking + RAF spotlight mask loop --------------------- */
  useEffect(() => {
    // Skip spotlight on reduced-motion / low-end devices
    if (tier >= 2) return;

    const hero = heroRef.current;
    if (!hero) return;

    let active = true;

    function tick() {
      if (!active) return;

      const el = revealImgRef.current;
      if (!el) return;

      const curr = mouseCurrent.current;
      const tgt = mouseTarget.current;

      // Lerp for smooth interpolation
      curr.x += (tgt.x - curr.x) * 0.12;
      curr.y += (tgt.y - curr.y) * 0.12;

      const r = getSpotlightRadius();
      const gradient = `radial-gradient(circle ${r}px at ${curr.x}px ${curr.y}px, #fff 0%, #fff 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.08) 88%, transparent 100%)`;

      el.style.maskImage = gradient;
      el.style.webkitMaskImage = gradient;

      rafId.current = requestAnimationFrame(tick);
    }

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = hero.getBoundingClientRect();
      mouseTarget.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointerMove(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    rafId.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [tier]);

  /* GSAP entrance timeline ----------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 });

      // 1. Background scale-in
      if (baseImgRef.current) {
        tl.fromTo(
          baseImgRef.current,
          { opacity: 0, scale: 1.15 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        );
      }

      // 2. Top HUD stagger
      if (hudTopRef.current) {
        const hudElements = hudTopRef.current.children;
        tl.fromTo(
          hudElements,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }

      // 3. Heading lines clip-path reveal
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-heading-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // 4. Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        );
      }

      // 5. Action icons
      if (iconsRef.current) {
        const icons = iconsRef.current.children;
        tl.fromTo(
          icons,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.35",
        );
      }

      // 6. Artifact card
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3",
        );
      }

      // 7. Specs matrix
      if (specsRef.current) {
        const rows = specsRef.current.children;
        tl.fromTo(
          rows,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "var(--nexus-void)" }}
    >
      {/* ============================================================ */}
      {/*  LAYER 1 — Base hero image                                    */}
      {/* ============================================================ */}
      <div
        ref={baseImgRef}
        className="absolute inset-0 z-[1] opacity-0"
        style={{
          backgroundImage: `url(${HERO_BASE_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          willChange: "transform, opacity",
        }}
      />

      {/* ============================================================ */}
      {/*  LAYER 2 — Reveal image (cursor spotlight mask)               */}
      {/* ============================================================ */}
      {tier < 2 ? (
        <div
          ref={revealImgRef}
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage: `url(${HERO_REVEAL_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            maskImage:
              "radial-gradient(circle 0px at -999px -999px, #fff, transparent)",
            WebkitMaskImage:
              "radial-gradient(circle 0px at -999px -999px, #fff, transparent)",
          }}
        />
      ) : (
        /* Tier 2 fallback: ambient static gradient overlay */
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,229,255,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ============================================================ */}
      {/*  LAYER 3 — Dot-grid background pattern                        */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.07] [background-image:radial-gradient(circle,#888_0.5px,transparent_0.5px)] [background-size:24px_24px]" />

      {/* ============================================================ */}
      {/*  LAYER 4 — Bottom vignette for readability                    */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 35%, transparent 55%)",
        }}
      />

      {/* ============================================================ */}
      {/*  LAYER 5 — HUD Telemetry Overlay                              */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-[10] pointer-events-none flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-14">
        {/* ---- TOP HUD BAR ---- */}
        <div ref={hudTopRef} className="flex items-start justify-between gap-4">
          {/* System status badge */}
          <div className="flex items-center gap-2.5 pointer-events-auto opacity-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#00E5FF]/80 font-medium select-none">
                VEDANG DHURI // AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto opacity-0">
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-white/40 text-right select-none">
              SAWANTWADI, MAHARASHTRA, INDIA
            </span>
            <nav aria-label="Social media links" className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/60 transition-colors duration-200 hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/15 hover:text-[#00E5FF]"
                >
                  <Icon size={15} strokeWidth={1.7} />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ---- MIDDLE — Main hero content ---- */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl pt-8 md:pt-0">
          {/* Hero heading */}
          <div ref={headingRef}>
            <h1
              className="font-heading font-black uppercase leading-[0.92] tracking-tighter select-none"
              style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
            >
              <span
                className="hero-heading-line block opacity-0"
                style={{
                  color: "#00E5FF",
                  textShadow: "0 0 30px rgba(0,229,255,0.35)",
                }}
              >
                VEDANG DHURI //
              </span>
              <span className="hero-heading-line block text-white opacity-0">
                FULL STACK
              </span>
              <span
                className="hero-heading-line block opacity-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #fff 40%, #00E5FF 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                DEVELOPER
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="opacity-0">
            <p className="mt-5 text-sm sm:text-base text-white/60 max-w-md font-sans leading-relaxed">
              Full Stack Developer building scalable web applications with
              Next.js, the MERN stack, Django, and thoughtful UI/UX.
            </p>
          </div>

          {/* Quick action icon matrix */}
          <div
            ref={iconsRef}
            className="flex items-center gap-3 mt-6 pointer-events-auto"
          >
            {ACTION_ICONS.map(({ Icon, label }) => (
              <motion.button
                key={label}
                aria-label={label}
                className="size-11 rounded-full border border-[#00E5FF]/25 bg-black/40 backdrop-blur-md text-[#00E5FF] flex items-center justify-center transition-all duration-300 hover:text-white hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/15 opacity-0"
                whileHover={{ scale: 1.12, rotate: 8 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon size={18} strokeWidth={1.5} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* ---- BOTTOM — Artifact card + Specs matrix ---- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 md:gap-8">
            {/* Developer profile card */}
          <article
            ref={cardRef}
            className="w-full max-w-sm rounded-[4px] bg-black/55 backdrop-blur-xl border border-white/10 hover:border-[#00E5FF]/35 p-3 sm:p-3.5 flex gap-3.5 sm:gap-4 items-center shadow-2xl transition-all duration-300 pointer-events-auto opacity-0"
            style={{
              boxShadow:
                "0 18px 50px rgba(0,0,0,0.35), 0 0 20px rgba(0,229,255,0.04)",
            }}
          >
            {/* Thumbnail */}
            <div
              className="size-[72px] sm:size-20 rounded-[4px] overflow-hidden flex-shrink-0 border border-white/10"
              style={{
                backgroundImage: `url(${PRODUCT_THUMB_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />

            {/* Meta + CTA */}
            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#00E5FF] uppercase font-medium">
                PROFILE // 01
              </span>
              <h4 className="font-heading text-sm text-white font-bold tracking-tight leading-tight">
                SCALABLE SOFTWARE
              </h4>
              <p className="text-[11px] text-white/45 leading-snug line-clamp-1 font-sans">
                Next.js, MERN, Django &amp; REST API development.
              </p>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 mt-1 w-fit rounded-full px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-black bg-[#00E5FF] hover:bg-[#33EBFF] transition-all duration-200 active:scale-95"
                style={{ boxShadow: "0 0 15px rgba(0,229,255,0.3)" }}
              >
                View Resume
                <ArrowDownRight size={13} strokeWidth={2} />
              </Link>
            </div>
          </article>

          {/* Developer skills matrix */}
          <div
            ref={specsRef}
            className="w-full max-w-xs flex flex-col pointer-events-auto self-end"
          >
            {/* Header */}
            <h3 className="text-[10px] text-[#00E5FF] uppercase tracking-[0.25em] font-mono font-semibold flex items-center gap-2 pb-2 border-b border-white/10 mb-1 opacity-0">
              <Crosshair size={12} strokeWidth={1.5} />
              Developer Profile
            </h3>

            {/* Telemetry rows */}
            {SPECS.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-baseline py-[6px] border-b border-white/[0.06] opacity-0"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
                  {label}
                </span>
                <span className="font-mono text-xs text-white/85 font-medium tracking-tight">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVisual;
