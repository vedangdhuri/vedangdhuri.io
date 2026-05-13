"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Code2, Sparkles, Zap, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
// import avtarUrl from "../../../public/img/main_image.png";
import { FlipWords } from "../../ui/FlipWords";
import { useMagneticEffect } from "@/utils/useMagneticEffect";
// import SpaceProfileCard from "@/components/ui/SpaceProfileCard/SpaceProfileCard";
import { useDeviceTier } from "@/utils/useDeviceTier";

/* ------------------------------------------------------------------ */
/*  Interactive Bento Grid – replaces the old SpaceProfileCard section */
/* ------------------------------------------------------------------ */
const BentoGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  /* Stat counter values */
  const stats = [
    { label: "Projects", value: "10+", icon: Code2, color: "from-blue-500 to-cyan-400" },
    { label: "Tech Stack", value: "15+", icon: Zap, color: "from-purple-500 to-pink-400" },
    { label: "Experience", value: "2+ Yrs", icon: Sparkles, color: "from-amber-400 to-orange-500" },
  ];

  /* Animated code lines for the terminal card */
  const codeLines = [
    { text: "const dev = {", color: "text-purple-400" },
    { text: '  name: "Vedang Dhuri",', color: "text-green-400" },
    { text: '  passion: "building cool stuff",', color: "text-green-400" },
    { text: '  stack: ["React", "Next.js", "Node"]', color: "text-cyan-400" },
    { text: "};", color: "text-purple-400" },
  ];

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden md:grid grid-cols-2 grid-rows-3 gap-3 w-full max-w-[520px] h-[420px]"
      style={{
        perspective: "1000px",
        transform: `rotateY(${mousePos.x * 0.3}deg) rotateX(${mousePos.y * -0.3}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Terminal Card – spans 2 cols, 2 rows */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
        className="col-span-2 row-span-2 relative group rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      >
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />

        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-gray-500 font-mono">vedang.ts</span>
        </div>

        {/* Code block */}
        <div className="p-5 font-mono text-sm leading-relaxed">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.0 + i * 0.15, duration: 0.4 }}
              className={`${line.color} whitespace-pre`}
            >
              {line.text}
              {i === codeLines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-blue-400 ml-1 align-middle"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* Stat cards – bottom row */}
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3.4 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          className={`${i === 2 ? "col-span-2" : ""} relative group/stat rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center gap-3 overflow-hidden hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 cursor-default`}
        >
          {/* Icon */}
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} flex-shrink-0`}>
            <stat.icon className="w-5 h-5 text-white" />
          </div>

          {/* Text */}
          <div>
            <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>

          {/* Hover glow */}
          <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-0 group-hover/stat:opacity-10 blur-xl transition-opacity duration-500`} />
        </motion.div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Available indicator                                                */
/* ------------------------------------------------------------------ */
const AvailableBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.0, duration: 0.5 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm mb-6"
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
    </span>
    <span className="text-xs text-green-400 font-medium tracking-wide uppercase">Available for work</span>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const words = [
    "Computer Engineer",
    "UI/UX Designer",
    "Photo Editor",
    "Gamer",
  ];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const magneticBtn1 = useMagneticEffect<HTMLAnchorElement>({ strength: 0.3 });
  const magneticBtn2 = useMagneticEffect<HTMLAnchorElement>({ strength: 0.3 });

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

    const tl = gsap.timeline({ delay: 2.2 });

    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      );
    }

    // Main heading character stagger
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".hero-char");
      tl.fromTo(
        chars,
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
    }

    // "I'm a" FlipWords entrance
    if (flipRef.current) {
      tl.fromTo(
        flipRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );
    }

    // CTA buttons slide up
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.3",
      );
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );
    }

    // ScrollTrigger storytelling effect (Smooth fade out and pin)
    if (heroSectionRef.current && contentWrapperRef.current) {
      const st = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
        animation: gsap.to(contentWrapperRef.current, {
          opacity: 0,
          scale: 0.92,
          y: -80,
          filter: "blur(6px)",
          ease: "none",
        }),
      });

      return () => {
        tl.kill();
        st.kill();
        clearTimeout(timeoutId);
      };
    }

    return () => {
      tl.kill();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroSectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Narrative Wrapper that fades out */}
      <div
        ref={contentWrapperRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Nebula / Aurora background glow — heavy blur omitted on low-end */}
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

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <AvailableBadge />
            <div>
              <h2
                ref={subtitleRef}
                className="text-xl md:text-3xl font-medium text-blue-400 mb-4 opacity-0"
              >
                Hello, I&apos;m{" "}
                <span className="font-bold text-white">Vedang Dhuri</span>
              </h2>
            </div>
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight overflow-hidden break-words relative z-10"
              style={{ perspective: "600px" }}
            >
              {"Creative ".split("").map((char, i) => (
                <span
                  key={`c-${i}`}
                  className="hero-char inline-block opacity-0"
                  style={{ transformOrigin: "center bottom" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <span className="inline-block ml-2 md:ml-3">
                {"Developer".split("").map((char, i) => (
                  <span
                    key={`d-${i}`}
                    className="hero-char inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
                    style={{ transformOrigin: "center bottom" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <div
              ref={flipRef}
              className="text-xl md:text-3xl text-blue-400 font-bold mb-8 h-8 opacity-0"
            >
              <span className="text-white">I&apos;m a</span>
              <FlipWords words={words} className="ml-2" />
            </div>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 font-bold"
            >
              <a
                ref={magneticBtn1}
                href="#projects"
                className="group relative flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)] overflow-hidden"
              >
                {/* Button shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center">
                  View Work
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </span>
              </a>
              <a
                ref={magneticBtn2}
                href="#contact"
                className="flex items-center justify-center px-8 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-all duration-500 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(96,165,250,0.2)]"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Content — Interactive Bento Grid */}
          <BentoGrid />

          {/* ============================================================
           *  COMMENTED OUT: Original SpaceProfileCard + Orbital System
           *  Preserved for future reference / re-activation.
           * ============================================================
           *
           * <div
           *   ref={profileRef}
           *   className="hidden md:flex justify-center items-center relative opacity-0"
           *   style={{ perspective: "800px" }}
           * >
           *   {/* Orbital rings *\/}
           *   <div
           *     ref={orbitRef}
           *     className="absolute inset-0 flex items-center justify-center pointer-events-none"
           *   >
           *     <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/10 animate-orbit-spin" />
           *     <div className="absolute w-[520px] h-[520px] rounded-full border border-indigo-400/8 animate-orbit-spin-reverse" />
           *
           *     {tier === 0 && (
           *       <>
           *         {/* Orbiting Tech: React *\/}
           *         <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-[420px] h-[420px]">
           *           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
           *             <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
           *               <svg viewBox="0 0 24 24" className="w-5 h-5 fill-cyan-400">
           *                 <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
           *               </svg>
           *             </motion.div>
           *           </div>
           *         </motion.div>
           *
           *         {/* ... more orbiting tech icons ... *\/}
           *       </>
           *     )}
           *   </div>
           *
           *   <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 blur-xl animate-pulse-slow" />
           *   <SpaceProfileCard avatarUrl={avtarUrl.src} />
           *
           *   {/* Floating space elements *\/}
           *   {tier === 0 && (
           *     <>
           *       <motion.div animate={{ y: [0, -20, 0], rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 right-6 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
           *         <span className="text-2xl">🚀</span>
           *       </motion.div>
           *       ... more floating elements ...
           *     </>
           *   )}
           * </div>
           */}
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 z-20"
        >
          <span className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-500/50 rounded-full flex justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-blue-500 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
