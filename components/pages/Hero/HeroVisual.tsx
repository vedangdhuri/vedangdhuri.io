"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Github,
  Linkedin,
  ArrowDownRight,
  Zap,
  Code2,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { Spotlight } from "@/components/ui/spotlight-new";

const personal = {
  name: "Vedang Dhuri",
  avatar: "/public/img/main_image.png",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/vedangdhuri" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/vedang-dhuri-b03280348" },
    { platform: "Instagram", url: "https://www.instagram.com/vedang.dhuri.69" },
  ],
};

export function HeroVisual() {
  const githubRef = useRef(null);
  const linkedinRef = useRef(null);
  const instagramRef = useRef(null);
  const zapRef = useRef(null);
  const zapSmallRef = useRef(null);
  const botRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal + Loop for GitHub
      gsap.fromTo(
        githubRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(githubRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true,
            });
          },
        },
      );

      // Reveal + Loop for LinkedIn
      gsap.fromTo(
        linkedinRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(linkedinRef.current, {
              y: 10,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true,
            });
          },
        },
      );

      // Reveal + Loop for Instagram
      gsap.fromTo(
        instagramRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(instagramRef.current, {
              x: 10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true,
            });
          },
        },
      );

      // Zap pulsing - Energetic heartbeat effect
      gsap.to([zapRef.current, zapSmallRef.current], {
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        force3D: true,
      });

      // Bot floating - Responsive and smooth
      gsap.to(botRef.current, {
        rotation: 8,
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20"
    >
      {/* Background Pattern */}
      <div className="w-full absolute h-full z-0 bg-[radial-gradient(circle,_#888_0.5px,_transparent_0.5px)] dark:bg-[radial-gradient(circle,_#444_0.5px,_transparent_0.5px)] opacity-20 [background-size:24px_24px]" />

      {/* Spotlight Effect - Dramatic lighting */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <Spotlight
          duration={10}
          xOffset={120}
          translateY={-300}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .05) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .1) 0, hsla(0, 0%, 100%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 100%, 0) 80%, transparent 100%)"
        />
      </div>

      <main className="relative flex-1 flex flex-col justify-center pt-40 pb-20 z-10">
        <div className="flex relative gap-4 px-6 md:items-center w-full flex-col justify-center">
          {/* Line 1: FULL STACK */}
          <div className="md:flex gap-8 items-center relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs text-white/40 text-start md:text-right leading-relaxed max-w-[200px] md:max-w-[220px] font-medium uppercase tracking-[0.2em]"
            >
              Hi, I&apos;m {personal.name}. I build creative digital experiences with
              code.
            </motion.p>
            <div className="relative">
              <div
                ref={githubRef}
                className="absolute -top-4 right-0 md:right-2 text-white/60 hover:text-white z-20 opacity-0"
              >
                <a
                  href={
                    personal.socialLinks.find((s) => s.platform === "GitHub")
                      ?.url
                  }
                  target="_blank"
                  className="block"
                >
                  <Github size={32} />
                </a>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,11vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
              >
                FULL STACK
              </motion.h1>
            </div>
          </div>

          {/* Line 2: DEVELOPER */}
          <div className="md:flex gap-8 items-center relative">
            <div className="relative">
              <div
                ref={linkedinRef}
                className="absolute -top-8 left-4 text-white/60 hover:text-white z-20 opacity-0"
              >
                <a
                  href={
                    personal.socialLinks.find((s) => s.platform === "LinkedIn")
                      ?.url
                  }
                  target="_blank"
                  className="block"
                >
                  <Linkedin size={32} />
                </a>
              </div>
              <div
                ref={instagramRef}
                className="absolute -bottom-12 right-24 md:right-36 text-white/60 hover:text-white z-20 opacity-0"
              >
                <a
                  href={
                    personal.socialLinks.find((s) => s.platform === "Instagram")
                      ?.url
                  }
                  target="_blank"
                  className="block"
                >
                  <Instagram size={32} />
                </a>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
              >
                <span className="">DEVE</span>
                <div ref={zapRef} className="hidden lg:block mx-[0.05em]">
                  <Zap
                    className="w-[0.8em] h-[0.8em] text-sky-400"
                    strokeWidth={1.5}
                  />
                </div>
                <div ref={zapSmallRef} className="block lg:hidden mx-[0.02em]">
                  <Zap
                    className="w-[0.8em] h-[0.8em] text-sky-400"
                    strokeWidth={2}
                  />
                </div>
                <span className="">LOPER</span>
              </motion.h1>
            </div>
          </div>

          {/* Line 3: & DESIGNER */}
          <div className="md:flex gap-8 items-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
            >
              <span className="">&amp;</span>
              <div ref={botRef} className="mx-[0.05em] relative">
                <Code2 className="w-[0.85em] h-[0.85em] text-indigo-400 fill-indigo-400/10" />
              </div>
              <span className="">DESIGNER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[10px] md:text-xs text-white/40 pt-4 md:pt-8 leading-relaxed max-w-[250px] md:max-w-[200px] font-medium uppercase tracking-widest"
            >
              Open to all forms of collaboration, regardless of location and
              language.
            </motion.p>
          </div>
        </div>

        {/* Separator Section */}
        <div className="mx-auto max-w-[105rem] w-full px-8 md:px-20 mt-12 md:mt-24">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-[1px] bg-white/10 hidden md:block" />
            <div className="text-[10px] md:text-xs whitespace-nowrap font-bold tracking-[0.3em] text-white/40 uppercase">
              MAHARASHTRA, IN — {new Date().getFullYear()}
            </div>
            <Link href="/resume" className="group flex items-center">
              <motion.div className="relative flex items-center bg-zinc-100 dark:bg-white h-12 w-12 group-hover:w-44 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden shadow-xl">
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-black pl-6 pr-12">
                  View Resume
                </span>
                <div className="absolute right-0 flex items-center justify-center size-12 text-zinc-900 dark:text-black group-hover:rotate-45 transition-transform duration-500">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default HeroVisual;
