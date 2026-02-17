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
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const navItems = [
  { logo: <FaHome size={20} />, href: "/" },
  { logo: <FaUser size={20} />, href: "/#about" },
  { logo: <FaCode size={20} />, href: "/#skills" },
  { logo: <FaLaptopCode size={20} />, href: "/projects" },
  { logo: <FaEnvelope size={20} />, href: "/#contact" },
];

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
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
        { y: 100, opacity: 0 },
        {
          y: 0,
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

    const sections = ["home", "about", "skills", "projects", "contact"];
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
      <nav
        ref={navRef}
        className="w-max z-[9999] fixed bg-gray-700/10 -translate-x-2/4 flex gap-[0.8rem] backdrop-blur-md px-4 py-[0.5rem] rounded-[3rem] left-2/4 bottom-6 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        style={{ opacity: 0 }}
      >
        <div className="flex gap-4 relative">
          {navItems.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={cn(
                "relative flex text-[1.1rem] p-[0.9rem] rounded-[50%] transition-all duration-300",
                activeLink === item.href
                  ? "text-black"
                  : "text-white hover:text-blue-300",
              )}
            >
              {/* Sliding active indicator */}
              {activeLink === item.href && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-blue-400 rounded-[50%] shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.logo}
              </motion.span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
