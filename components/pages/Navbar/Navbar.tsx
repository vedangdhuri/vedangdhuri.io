"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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
  { logo: <FaHome size={22} />, href: "/", text: "Home" },
  { logo: <FaUser size={22} />, href: "/#about", text: "About" },
  { logo: <FaCode size={22} />, href: "/#skills", text: "Skills" },
  { logo: <FaLaptopCode size={22} />, href: "/projects", text: "Projects" },
  { logo: <FaEnvelope size={22} />, href: "/#contact", text: "Contact" },
  { logo: <FaGithub size={22} />, href: "/#github", text: "Github" },
];

const MagneticItem = ({
  children,
  isActive,
  text,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  text: string;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull strength: 0.4
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative flex items-center justify-center p-3 sm:p-4 rounded-2xl group cursor-pointer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          layoutId="navbar-active-bubble"
          className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md"
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      )}

      <motion.div
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className={cn(
          "relative z-10 flex items-center justify-center transition-colors duration-300",
          isActive ? "text-white" : "text-gray-400 group-hover:text-blue-300 drop-shadow-md"
        )}
      >
        {children}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-indigo-950/90 text-white text-xs font-semibold py-1 px-3 rounded-lg border border-white/10 pointer-events-none whitespace-nowrap shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
        {text}
      </div>
    </motion.div>
  );
};

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

  // 3D Antigravity Entrance Animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, xPercent: -50, opacity: 0, rotateX: -45, scale: 0.8 },
        {
          y: 24, // Drops in and sits slightly below the top edge
          xPercent: -50,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          delay: 2.8,
          ease: "elastic.out(1, 0.6)",
          transformPerspective: 800,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (pathname === "/projects") {
      if (activeLink !== "/projects") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
      {/* Desktop Antigravity Dock */}
      <nav
        ref={navRef}
        className="hidden md:flex w-max z-[99] fixed left-1/2 top-0 -translate-x-1/2 items-center gap-1 p-2 rounded-[2rem] bg-indigo-950/20 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.05)]"
        style={{ opacity: 0 }}
      >
        <div className="flex gap-2 relative z-10">
          {navItems.map((item, key) => (
            <Link key={key} href={item.href} passHref legacyBehavior>
              <a>
                <MagneticItem
                  isActive={activeLink === item.href}
                  text={item.text}
                  onClick={() => setActiveLink(item.href)}
                >
                  {item.logo}
                </MagneticItem>
              </a>
            </Link>
          ))}
        </div>
        
        {/* Deep ambient glow behind the dock */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-[2rem] blur-xl -z-10" />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-2xl bg-indigo-950/40 backdrop-blur-xl border border-white/10 text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] focus:outline-none hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
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
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-[9997]"
            />

            {/* Menu Panel Card (Antigravity Style) */}
            <motion.div
              initial={{ opacity: 0, y: -40, rotateX: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, rotateX: 10, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              style={{ transformPerspective: 800 }}
              className="md:hidden fixed top-6 right-6 left-6 z-[9998] bg-indigo-950/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white font-bold text-xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Navigation
                </span>
                <div className="w-12 h-12" /> {/* Spacer for close button */}
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-3">
                {navItems.map((item, key) => (
                  <Link
                    key={key}
                    href={item.href}
                    onClick={() => {
                      setActiveLink(item.href);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group relative flex items-center gap-5 text-base px-5 py-4 rounded-2xl transition-all duration-300 w-full overflow-hidden",
                      activeLink === item.href
                        ? "text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {activeLink === item.href && (
                      <motion.div
                        layoutId="mobile-navbar-active"
                        className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-5 w-full">
                      <span className={cn(
                        "flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                        activeLink === item.href ? "text-blue-400" : ""
                      )}>{item.logo}</span>
                      <span className="font-semibold tracking-wide">{item.text}</span>
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
