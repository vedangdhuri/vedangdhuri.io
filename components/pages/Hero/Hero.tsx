"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import avtarUrl from "../../../public/img/main_image.png";
import { FlipWords } from "../../ui/FlipWords";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useMagneticEffect } from "@/utils/useMagneticEffect";
import SpaceProfileCard from "@/components/ui/SpaceProfileCard/SpaceProfileCard";

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
  const profileRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const magneticBtn1 = useMagneticEffect<HTMLAnchorElement>({ strength: 0.3 });
  const magneticBtn2 = useMagneticEffect<HTMLAnchorElement>({ strength: 0.3 });

  useEffect(() => {
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

    // Profile card + orbits scale in
    if (profileRef.current) {
      tl.fromTo(
        profileRef.current,
        { opacity: 0, scale: 0.85, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Nebula / Aurora background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] animate-nebula-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/6 blur-[100px] animate-nebula-drift-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-purple-600/4 blur-[150px]" />
      </div>

      {/* Cosmic dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-blue-300/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white">
          <div>
            <h2
              ref={subtitleRef}
              className="text-xl md:text-3xl font-medium text-blue-400 mb-4 opacity-0"
            >
              Hello, I&apos;m{" "}
              <span className="font-bold text-white">Vedang Dhuri</span> a
            </h2>
          </div>
          <SparklesText sparklesCount={10}>
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight overflow-hidden break-words"
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
              <span className="inline-block">
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
          </SparklesText>

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

        {/* Right Content - Profile + Orbital System */}
        <div
          ref={profileRef}
          className="hidden md:flex justify-center items-center relative opacity-0"
          style={{ perspective: "800px" }}
        >
          {/* Orbital rings */}
          <div
            ref={orbitRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Inner orbit */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/10 animate-orbit-spin" />
            {/* Middle orbit */}
            <div className="absolute w-[520px] h-[520px] rounded-full border border-indigo-400/8 animate-orbit-spin-reverse" />
            {/* Outer orbit 1*/}
            <div className="absolute w-[620px] h-[620px] rounded-full border border-purple-400/5 animate-orbit-spin-slow" />
            {/* Outer orbit 2*/}
            <div className="absolute w-[720px] h-[720px] rounded-full border border-purple-400/5 animate-orbit-spin-slow" />

            {/* Orbiting Tech: React */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-[420px] h-[420px]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-cyan-400">
                    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Tech: Next.js */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[520px] h-[520px]"
            >
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Tech: TypeScript */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[620px] h-[620px]"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-400">
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Tech: Node.js */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[720px] h-[720px]"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-green-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-400">
                    <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.921a.28.28 0 00-.137-.242l-8.791-5.072a.278.278 0 00-.271 0L3.075 6.68a.28.28 0 00-.138.24v10.15c0 .099.053.19.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 01-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.075.242a1.872 1.872 0 011.846 0l8.794 5.076c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078a1.857 1.857 0 01-.923.247z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Profile glow ring */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 blur-xl animate-pulse-slow" />

          <SpaceProfileCard avatarUrl={avtarUrl.src} />

          {/* Floating space elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 right-6 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-8 -left-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-indigo-400/20 shadow-[0_0_20px_rgba(129,140,248,0.2)]"
          >
            <span className="text-2xl">🛸</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -12, 0],
              x: [0, 8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-[-150px] right-[100px] bg-black/60 backdrop-blur-md p-3 rounded-xl border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <span className="text-xl">🪐</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-60 right-16 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span className="text-lg">🛰️</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 12, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute top-[-200] -left-8 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-green-400/20 shadow-[0_0_12px_rgba(74,222,128,0.2)]"
          >
            <span className="text-lg">⭐</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0"
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
    </section>
  );
};

export default Hero;
