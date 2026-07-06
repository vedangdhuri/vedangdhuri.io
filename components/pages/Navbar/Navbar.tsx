"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import {
  FaLaptopCode,
  FaHome,
  FaUser,
  FaEnvelope,
  FaCode,
  FaGithub,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const navItems = [
  { logo: <FaHome size={16} />, href: "/", text: "Home" },
  { logo: <FaUser size={16} />, href: "/#about", text: "About" },
  { logo: <FaCode size={16} />, href: "/#skills", text: "Skills" },
  { logo: <FaLaptopCode size={16} />, href: "/projects", text: "Projects" },
  { logo: <FaEnvelope size={16} />, href: "/#contact", text: "Contact" },
  { logo: <FaGithub size={16} />, href: "/#github", text: "Github" },
];

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: 100, xPercent: -50, opacity: 0 },
        {
          y: 0,
          xPercent: -50,
          opacity: 1,
          duration: 0.8,
          delay: 2.8,
          ease: "back.out(1.7)",
        },
      );
    }
  }, []);

  useEffect(() => {
    if (pathname === "/projects") {
      if (activeLink !== "/projects") {
        setActiveLink("/projects");
      }
      return;
    }

    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "contact",
      "github",
    ];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "home") setActiveLink("/");
          else if (entry.target.id === "projects") setActiveLink("/projects");
          else setActiveLink(`/#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        ref={navRef}
        className="hidden md:flex w-max z-[99] fixed bg-indigo-950/30 -translate-x-2/4 gap-[0.8rem] backdrop-blur-md px-4 py-[0.5rem] rounded-[3rem] left-1/2 top-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        style={{ opacity: 0 }}
      >
        <div className="flex gap-4 relative">
          {navItems.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={cn(
                "relative flex items-center gap-2 text-[0.8rem] px-4 py-2 rounded-full transition-all duration-300",
                activeLink === item.href
                  ? "text-black"
                  : "text-white hover:text-blue-300",
              )}
            >
              {/* Sliding active indicator */}
              {activeLink === item.href && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon & Text */}
              <motion.span
                className="relative z-10 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.logo}
                <span className="font-semibold">{item.text}</span>
              </motion.span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-indigo-950/30 backdrop-blur-md border border-white/10 text-white shadow-lg focus:outline-none hover:bg-indigo-900/50 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-[9997] backdrop-blur-sm"
            />

            {/* Menu Panel Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden fixed top-4 right-4 left-4 z-[9998] bg-indigo-950/95 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white font-bold text-lg tracking-wide">
                  Portfolio
                </span>
                {/* Reserved space for the top-right floating button */}
                <div className="w-10 h-10" />
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-2">
                {navItems.map((item, key) => (
                  <Link
                    key={key}
                    href={item.href}
                    onClick={() => {
                      setActiveLink(item.href);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "relative flex items-center gap-4 text-[0.8rem] px-4 py-3 rounded-xl transition-all duration-300 w-full overflow-hidden",
                      activeLink === item.href
                        ? "text-black"
                        : "text-white hover:text-blue-300 hover:bg-white/5",
                    )}
                  >
                    {activeLink === item.href && (
                      <motion.div
                        layoutId="mobile-navbar-active"
                        className="absolute inset-0 bg-blue-400 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-4 w-full">
                      <span className="flex-shrink-0">{item.logo}</span>
                      <span className="font-semibold">{item.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
