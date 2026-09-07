"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Code2 } from "lucide-react";
import { Instagram, Linkedin, Facebook, Github } from "lucide-react";
import { Discord, TwitterX } from "react-bootstrap-icons";
import GradientText from "@/components/ui/GradientText";
import DecryptedText from "@/components/ui/DecryptedText";
import BlurText from "@/components/ui/BlurText";
import Magnet from "@/components/ui/Magnet";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    logo: <Github className="w-5 h-5" />,
    href: "https://github.com/vedangdhuri",
    label: "GitHub",
  },
  {
    logo: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
    label: "LinkedIn",
  },
  {
    logo: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/vedang.dhuri.69",
    label: "Instagram",
  },
  {
    logo: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/vedang.dhuri.69/",
    label: "Facebook",
  },
  {
    logo: <Discord className="w-5 h-5" />,
    href: "https://discord.com/users/767682446959050753",
    label: "Discord",
  },
  {
    logo: <TwitterX className="w-5 h-5" />,
    href: "https://x.com/VedangDhuri69",
    label: "X",
  },
];

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Divider line scale-in
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 92%",
              toggleActions: "restart none none reset",
            },
          },
        );
        const st = ScrollTrigger.getAll().pop();
        if (st) triggers.push(st);
      }

      // Social icons stagger
      if (socialsRef.current) {
        const icons = socialsRef.current.children;
        gsap.fromTo(
          icons,
          { opacity: 0, y: 30, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialsRef.current,
              start: "top 92%",
              toggleActions: "restart none none reset",
            },
          },
        );
        const st = ScrollTrigger.getAll().pop();
        if (st) triggers.push(st);
      }

      // Nav links stagger
      if (navRef.current) {
        const links = navRef.current.children;
        gsap.fromTo(
          links,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: navRef.current,
              start: "top 94%",
              toggleActions: "restart none none reset",
            },
          },
        );
        const st = ScrollTrigger.getAll().pop();
        if (st) triggers.push(st);
      }

      // Bottom row fade-in
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 96%",
              toggleActions: "restart none none reset",
            },
          },
        );
        const st = ScrollTrigger.getAll().pop();
        if (st) triggers.push(st);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill());
    };
  }, [pathname]);

  return (
    <footer
      ref={footerRef}
      className="w-full relative mt-12 py-20 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.02) 30%, rgba(0, 229, 255, 0.04) 100%)",
      }}
    >
      {/* Top divider line */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-0 right-0 h-[1px] origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.6), transparent)",
          transform: "scaleX(0)",
        }}
      />

      {/* Background ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* Name with GradientText */}
        <div className="text-center z-10">
          <a href="#home" className="inline-block group">
            <GradientText
              colors={["#00E5FF", "#0A3BFF", "#00E5FF", "#FFFFFF", "#00E5FF"]}
              animationSpeed={6}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter"
            >
              VEDANG DHURI
            </GradientText>
          </a>
        </div>

        {/* DecryptedText tagline */}
        <div className="text-center z-10">
          <DecryptedText
            text="Full Stack Developer & Designer"
            animateOn="view"
            speed={40}
            maxIterations={15}
            sequential={true}
            revealDirection="center"
            characters="01!@#$%&*<>{}[]"
            className="text-white/80 font-mono"
            encryptedClassName="text-[#00E5FF]/40 font-mono"
            parentClassName="text-sm md:text-base tracking-[0.2em] uppercase"
          />
        </div>

        {/* Navigation links */}
        <div
          ref={navRef}
          className="flex flex-wrap justify-center gap-6 md:gap-8 z-50"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 hover:text-[#00E5FF] transition-colors duration-300 opacity-0"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Social icons with Magnet effect */}
        <div
          ref={socialsRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-5 z-10"
        >
          {socialLinks.map((item) => (
            <Magnet key={item.href} padding={60} magnetStrength={3}>
              <motion.a
                className="relative flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/[0.06] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                whileTap={{ scale: 0.9 }}
              >
                {item.logo}
              </motion.a>
            </Magnet>
          ))}
        </div>

        {/* Bottom Row */}
        <div
          ref={bottomRef}
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 z-10 opacity-0"
        >
          {/* Coded with love indicator */}
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Code2 size={14} className="text-[#00E5FF]/50" />
            <span>Crafted with passion</span>
          </div>

          {/* Copyright with BlurText */}
          <BlurText
            text={`© ${new Date().getFullYear()} Vedang Dhuri. All rights reserved.`}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="text-xs text-white/30 justify-center"
            stepDuration={0.3}
          />

          {/* Back to top */}
          <Magnet padding={80} magnetStrength={2}>
            <motion.a
              href="#home"
              className="group flex items-center gap-2 text-xs text-white/30 hover:text-[#00E5FF] transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="hidden sm:inline uppercase tracking-widest">
                Top
              </span>
              <div className="p-2 rounded-full border border-white/10 group-hover:border-[#00E5FF]/40 group-hover:bg-[#00E5FF]/[0.06] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300">
                <ArrowUp size={14} />
              </div>
            </motion.a>
          </Magnet>
        </div>
      </div>
    </footer>
  );
};
