"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Zap, Code2 } from "lucide-react";

import { useDeviceTier } from "@/utils/useDeviceTier";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Social link data for hero grid                                     */
/* ------------------------------------------------------------------ */
/* Inline social icons — avoids loading the full react-icons/fa barrel */
const IconGitHub = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedIn = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconInstagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const heroSocials = [
  {
    icon: <IconGitHub className="w-5 h-5" />,
    href: "https://github.com/vedangdhuri",
    label: "GitHub",
  },
  {
    icon: <IconLinkedIn className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
    label: "LinkedIn",
  },
  {
    icon: <IconInstagram className="w-5 h-5" />,
    href: "https://www.instagram.com/vedang.dhuri.69",
    label: "Instagram",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bigText1Ref = useRef<HTMLDivElement>(null);
  const bigText2Ref = useRef<HTMLDivElement>(null);
  const bigText3Ref = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLDivElement>(null);

  const tier = useDeviceTier();

  const [dustParticles, setDustParticles] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      xStart: number;
    }>
  >([]);

  useEffect(() => {
    // Skip dust particles on low-end / mobile devices
    if (tier >= 1) return;
    const timeoutId = setTimeout(() => {
      setDustParticles(
        [...Array(20)].map(() => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 5,
          xStart: Math.random() * 20 - 10,
        })),
      );
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [tier]);

  /* GSAP entrance animation timeline */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 });

    // Intro text
    if (introRef.current) {
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }

    // Big typography rows — staggered reveal
    const bigTexts = [bigText1Ref, bigText2Ref, bigText3Ref];
    bigTexts.forEach((ref, i) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.7,
            ease: "power3.out",
          },
          i === 0 ? "-=0.3" : "-=0.4",
        );
      }
    });

    // Social icons
    if (socialsRef.current) {
      const icons = socialsRef.current.children;
      tl.fromTo(
        icons,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );
    }

    // Vertical badge
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5",
      );
    }

    // Collab text
    if (collabRef.current) {
      tl.fromTo(
        collabRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );
    }

    // Bottom row
    if (bottomRef.current) {
      tl.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );
    }

    // Mobile Cyber-Kinetic Stack entrance animation
    if (mobileHeroRef.current) {
      const mobileElements = mobileHeroRef.current.children;
      tl.fromTo(
        mobileElements,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1.2",
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Nebula / Aurora background glow */}
      {tier === 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[80px] animate-nebula-drift" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/6 blur-[60px] animate-nebula-drift-reverse" />
        </div>
      )}

      {/* Cosmic dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dustParticles.map((particle, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-blue-300/60"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xStart, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/*  VERTICAL SIDE BADGE — "AVAILABLE FOR OPPORTUNITY"           */}
      {/* ============================================================ */}
      {/* <div
        ref={badgeRef}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0"
      >
        <div
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 whitespace-nowrap border-l border-white/10 pl-3 py-8"
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
          }}
        >
          Available for Opportunity
        </div>
      </div> */}

      {/* ============================================================ */}
      {/*  MOBILE CYBER-KINETIC CARD STACK (< 768px)                   */}
      {/* ============================================================ */}
      <div
        ref={mobileHeroRef}
        className="flex md:hidden flex-col justify-between w-full min-h-[88vh] px-5 py-12 z-10 gap-6"
      >
        {/* Top Status Bar */}
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-4 opacity-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 font-medium">
              Available for Opportunity
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-[0.1em] text-white/40">
            IN — {new Date().getFullYear()}
          </span>
        </div>

        {/* Cyber-Kinetic Stacked Cards */}
        <div className="flex flex-col gap-4 my-auto">
          {/* Card 1: Identity & Intro */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden shadow-xl opacity-0">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00E5FF] font-semibold">
              Creative Technologist
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00E5FF]">Vedang Dhuri</span>.
            </h1>
            <p className="text-xs text-white/60 font-mono leading-relaxed mt-1">
              Building high-impact digital experiences with clean code and modern design.
            </p>
          </div>

          {/* Card 2: Massive Stacked Title with Neon Badges */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/15 backdrop-blur-lg flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl opacity-0">
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
            <span className="text-4xl xs:text-5xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#00E5FF] to-indigo-400 select-none">
              FULL STACK
            </span>
            <div className="flex items-center gap-2 my-2.5">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/30" />
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-5 h-5 text-[#00E5FF] fill-[#00E5FF]/20" />
              </motion.div>
              <span className="text-xl font-bold tracking-widest text-white font-mono uppercase">
                DEVELOPER
              </span>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="w-5 h-5 text-indigo-400" />
              </motion.div>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/30" />
            </div>
            <span className="text-2xl xs:text-3xl font-extrabold tracking-tight text-white/80 select-none">
              &amp; DESIGNER
            </span>
          </div>

          {/* Card 3: Interactive Skill Pills */}
          <div className="flex flex-wrap gap-2 items-center justify-center opacity-0">
            {["#Next.js", "#TypeScript", "#UI/UX", "#GSAP", "#Tailwind", "#Framer"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/5 border border-white/10 text-white/70 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Touch-Optimized CTAs & Socials (min-h-[44px]) */}
        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-white/10 opacity-0">
          <div className="flex items-center gap-3">
            <motion.a
              href="#projects"
              className="flex-1 min-h-[48px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
              whileTap={{ scale: 0.96 }}
            >
              Explore Works
              <ArrowDownRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/resume"
              className="min-h-[48px] px-5 rounded-xl bg-white/5 border border-white/15 text-white/90 font-medium text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center active:scale-[0.98] transition-transform hover:bg-white/10"
              whileTap={{ scale: 0.96 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Touch Social Bar */}
          <div className="flex items-center justify-center gap-4 pt-1">
            {heroSocials.map((social) => (
              <motion.a
                key={`mobile-${social.label}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/80 active:bg-white/20 active:border-white/40 transition-colors shadow-md"
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MAIN GRID LAYOUT (DESKTOP >= 768px ONLY)                    */}
      {/* ============================================================ */}
      <div
        ref={gridRef}
        className="hidden md:flex relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-0"
      >
        {/* Grid structure */}
        <div className="flex flex-col gap-0">
          {/* ---- Row 1: Intro text + "FULL" ---- */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8">
            {/* Intro text block */}
            <div
              ref={introRef}
              className="max-w-[280px] md:max-w-[320px] opacity-0 flex-shrink-0 mb-2 md:mb-4"
            >
              <p className="text-sm md:text-base text-white/60 uppercase tracking-[0.15em] leading-relaxed font-mono">
                Hi, I&apos;m{" "}
                <span className="text-white font-semibold">Vedang Dhuri</span>.
                I build creative digital experiences with code.
              </p>
            </div>

            {/* Massive text: "FULL STACK" */}
            <div
              ref={bigText1Ref}
              className="flex-1 opacity-0 flex items-center"
            >
              <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tighter text-white select-none">
                FULL
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 ml-2 md:ml-4">
                  STACK
                </span>
              </h1>
            </div>
          </div>

          {/* ---- Row 2: Social icons + "DEVE" + icons + "LOPER" ---- */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative">
            {/* Social icons column */}
            <div
              ref={socialsRef}
              className="flex md:flex-col gap-4 md:gap-5 flex-shrink-0 md:pr-6 md:border-r border-white/5"
            >
              {heroSocials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Massive text: "DEVE" + decorative icons + "LOPER" */}
            <div
              ref={bigText2Ref}
              className="flex-1 opacity-0 flex flex-wrap items-center md:pl-6"
            >
              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tighter text-white select-none">
                DEVE
              </span>

              {/* Decorative icon — Lightning */}
              <motion.div
                className="mx-2 md:mx-4 flex-shrink-0"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Zap className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 text-blue-400 fill-blue-400/30" />
              </motion.div>

              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tighter text-white select-none">
                LOPER
              </span>
            </div>
          </div>

          {/* ---- Row 3: Decorative icon row / "& DESIGNER" accent ---- */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mt-2">
            <div
              ref={bigText3Ref}
              className="flex-1 opacity-0 flex flex-wrap items-center"
            >
              <span className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-bold leading-[0.85] tracking-tighter text-white/20 select-none">
                &amp;
              </span>

              {/* Decorative icon — Code */}
              <motion.div
                className="mx-3 md:mx-5 flex-shrink-0"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Code2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-indigo-400" />
              </motion.div>

              <span className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 select-none">
                DESIGNER
              </span>
            </div>

            {/* Collaboration text */}
            <div
              ref={collabRef}
              className="max-w-[260px] md:max-w-[280px] flex-shrink-0 opacity-0 md:text-right"
            >
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed font-mono">
                Open to all forms of collaboration, regardless of location and
                language.
              </p>
            </div>
          </div>

          {/* ---- Row 4: Bottom metadata bar ---- */}
          <div
            ref={bottomRef}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 md:mt-12 pt-6 border-t border-white/5 opacity-0"
          >
            {/* Location / Year */}
            <span className="text-xs md:text-sm font-mono text-white/30 uppercase tracking-[0.3em]">
              Maharashtra, India — {new Date().getFullYear()}
            </span>

            {/* Resume CTA */}
            <motion.a
              href="/resume"
              aria-label="View Resume"
              className="group flex items-center gap-3 text-sm font-mono text-white/70 hover:text-white transition-all duration-300 uppercase tracking-[0.15em] cursor-pointer"
              whileHover={{ x: 4 }}
            >
              Resume
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300">
                <ArrowDownRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Floating action button — bottom right */}
      <motion.a
        href="#about"
        className="hidden md:flex fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white text-black shadow-2xl items-center justify-center border border-white/20 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll down"
      >
        <ArrowDownRight aria-hidden="true" className="w-5 h-5" />
      </motion.a>
    </section>
  );
};

export default Hero;
