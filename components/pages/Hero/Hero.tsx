"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Zap, Code2, X } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useDeviceTier } from "@/utils/useDeviceTier";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Social link data for hero grid                                     */
/* ------------------------------------------------------------------ */
const heroSocials = [
  {
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://github.com/vedangdhuri",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
    label: "LinkedIn",
  },
  {
    icon: <FaInstagram className="w-5 h-5" />,
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
      {/*  MAIN GRID LAYOUT                                            */}
      {/* ============================================================ */}
      <div
        ref={gridRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-0"
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
              className="group flex items-center gap-3 text-sm font-mono text-white/70 hover:text-white transition-all duration-300 uppercase tracking-[0.15em] cursor-pointer"
              whileHover={{ x: 4 }}
            >
              Resume
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300">
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
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
        <ArrowDownRight className="w-5 h-5" />
      </motion.a>
    </section>
  );
};

export default Hero;
