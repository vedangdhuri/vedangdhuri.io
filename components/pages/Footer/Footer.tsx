"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { Instagram, Linkedin, Facebook, Github } from "lucide-react";
import { Discord, TwitterX } from "react-bootstrap-icons";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "#contact" },
];

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

  useEffect(() => {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: "#0b111e" }}
      className="mx-auto py-100 px-4 relative border-t border-border mt-12 pt-8 flex flex-wrap items-center justify-between"
    >
      {/* Name */}
      <div
        ref={nameRef}
        className="absolute left-1/2 -translate-x-1/2 flex mt-15 w-full justify-center opacity-0"
      >
        <a href="#home">
          <h2 className="font-medium tracking-tight transition delay-100 ease-in-out text-5xl md:text-6xl hover:text-blue-400">
            VEDANG DHURI
          </h2>
        </a>
      </div>

      {/* Social icons */}
      <div
        ref={socialsRef}
        className="absolute left-1/2 -translate-x-1/2 flex mt-60 space-x-5 bg-blue lg:space-x-8 xl:space-x-8 2xl:space-x-8"
      >
        {socialLinks.map((item) => (
          <motion.a
            key={item.href}
            className="transition delay-100 ease-in-out border text-black bg-white/90 p-3 rounded-xl hover:bg-black/10 hover:border hover:border-white hover:text-white"
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

      {/* Navigation Items */}
      <div
        ref={navLinksRef}
        className="flex space-x-5 absolute left-1/2 -translate-x-1/2 mt-100 lg:space-x-8 xl:space-x-8 2xl:space-x-8"
      >
        {navItems.map((item, key) => (
          <a
            key={key}
            href={item.href}
            className="text-foreground/80 hover:text-blue-400 transition-colors duration-300 text-lg font-bold"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="absolute left-1/2 -translate-x-1/2 flex mt-130">
        <p className="text-sm text-muted-foreground">
          {" "}
          &copy; {new Date().getFullYear()} Vedang Dhuri. All rights reserved.
        </p>
      </div>

      <div className="ml-auto">
        <motion.a
          href="#home"
          className="absolute right-6 top-2/3 -translate-y-1/2 p-3 rounded-full bg-blue-400/10 transition-colors items-end justify-center"
          whileHover={{
            scale: 1.2,
            backgroundColor: "rgba(96, 165, 250, 0.2)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.a>
      </div>
    </footer>
  );
};
