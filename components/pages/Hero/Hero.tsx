"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import ProfileCard from "../../ui/ProfileCard/ProfileCard";
import avtarUrl from "../../../public/img/main_image.png";
import codeIcon from "../../../public/img/code.png";
import { FlipWords } from "../../ui/FlipWords";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useMagneticEffect } from "@/utils/useMagneticEffect";

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

    // Profile card scale in
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
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight overflow-hidden"
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
              className="group flex items-center justify-center px-8 py-3 bg-blue-400 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(96,165,250,0.4)]"
            >
              View Work
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              ref={magneticBtn2}
              href="#contact"
              className="flex items-center justify-center px-8 py-3 border border-white/20 hover:bg-white/10 text-white rounded-full transition-all duration-300 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Content - Hero Image/Interaction Area */}
        <div
          ref={profileRef}
          className="hidden md:flex justify-center items-center relative opacity-0"
          style={{ perspective: "800px" }}
        >
          <ProfileCard
            enableMobileTilt
            behindGlowEnabled={false}
            behindGlowColor="hsla(199, 100%, 70%, 0.6)"
            innerGradient="linear-gradient(145deg,hsla(199, 40%, 45%, 0.55) 0%,hsla(11, 60%, 70%, 0.27) 100%)"
            avatarUrl={avtarUrl.src}
            iconUrl={codeIcon.src}
          />

          {/* Floating Elements with enhanced parallax */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -8, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 left-0 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="text-2xl">💻</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-1/2 -right-5 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="text-xl">⚡</span>
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
          className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-blue-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
