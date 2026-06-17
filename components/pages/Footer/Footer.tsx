"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { Instagram, Linkedin, Facebook, Github } from "lucide-react";
import { Discord, TwitterX } from "react-bootstrap-icons";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    logo: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
  },
  {
    logo: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/vedang.dhuri.69",
  },
  {
    logo: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/vedang.dhuri.69/",
  },
  {
    logo: <Github className="w-5 h-5" />,
    href: "https://github.com/vedangdhuri",
  },
  {
    logo: <Discord className="w-5 h-5" />,
    href: "https://discord.com/users/767682446959050753",
  },
  {
    logo: <TwitterX className="w-5 h-5" />,
    href: "https://x.com/VedangDhuri69",
  },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Small delay to let DOM settle after route change
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Name reveal
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: nameRef.current,
              start: "top 90%",
              toggleActions: "restart none none reset",
            },
          },
        );
        const st = ScrollTrigger.getAll().pop();
        if (st) triggers.push(st);
      }

      // Social icons staggered fly-in
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
      if (navLinksRef.current) {
        const links = navLinksRef.current.children;
        gsap.fromTo(
          links,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: navLinksRef.current,
              start: "top 92%",
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
      className="w-full relative border-t border-white/10 mt-12 bg-black/40 backdrop-blur-sm py-16 px-6 md:px-12 flex flex-col items-center gap-10 overflow-hidden"
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Name */}
      <div
        ref={nameRef}
        className="w-full text-center opacity-0 z-10"
      >
        <a href="#home" className="inline-block">
          <h2 className="font-bold tracking-wider transition-colors duration-300 text-4xl sm:text-5xl md:text-6xl text-white hover:text-blue-400">
            VEDANG DHURI
          </h2>
        </a>
      </div>

      {/* Social icons */}
      <div
        ref={socialsRef}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 z-10"
      >
        {socialLinks.map((item) => (
          <motion.a
            key={item.href}
            className="transition-all duration-300 border border-white/10 text-white bg-white/5 p-3 rounded-xl hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            href={item.href}
            target="_blank"
            whileHover={{
              scale: 1.15,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            {item.logo}
          </motion.a>
        ))}
      </div>

      {/* Bottom Row: Copyright and Back to Top */}
      {/* Bottom Row: Copyright and Back to Top */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 items-center gap-4 pt-6 border-t border-white/5 z-10">
        {/* Spacer for centering copyright on larger screens */}
        <div className="hidden sm:block" />

        {/* Copyright */}
        <p className="text-sm text-neutral-500 text-center">
          &copy; {new Date().getFullYear()} Vedang Dhuri. All rights reserved.
        </p>

        {/* Back to top */}
        <div className="flex justify-center sm:justify-end">
          <motion.a
            href="#home"
            className="p-3 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 hover:text-white transition-all duration-300 flex items-center justify-center"
            whileHover={{
              scale: 1.15,
              backgroundColor: "rgba(96, 165, 250, 0.2)",
              borderColor: "rgba(96, 165, 250, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
