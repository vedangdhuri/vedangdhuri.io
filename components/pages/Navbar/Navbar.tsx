"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

import {
  Home,
  User,
  Code,
  Laptop,
  Mail,
  Github,
  Menu,
  X,
  Award,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { logo: <Home size={20} />, href: "/", text: "Home" },
  { logo: <User size={20} />, href: "/#about", text: "About" },
  { logo: <Code size={20} />, href: "/#skills", text: "Skills" },
  { logo: <Laptop size={20} />, href: "/projects", text: "Projects" },
  { logo: <Award size={20} />, href: "/#certifications", text: "Certifications" },
  { logo: <FileText size={20} />, href: "/resume", text: "Resume" },
  { logo: <Mail size={20} />, href: "/#contact", text: "Contact" },
  { logo: <Github size={20} />, href: "/#github", text: "Github" },
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
      className="relative flex items-center justify-center p-3 sm:p-4 rounded-full group cursor-pointer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          layoutId="navbar-active-bubble"
          className="absolute inset-0 bg-[#00E5FF]/10 rounded-full border border-[#00E5FF]/30 shadow-[inset_0_1px_1px_rgba(0,229,255,0.2)] backdrop-blur-md"
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      )}

      <motion.div
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className={cn(
          "relative z-10 flex items-center justify-center transition-colors duration-200",
          isActive ? "text-[#00E5FF]" : "text-white/60 group-hover:text-white drop-shadow-md"
        )}
      >
        {children}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0A0A0A] text-white text-xs font-semibold py-1.5 px-3 rounded-[4px] border border-white/20 pointer-events-none whitespace-nowrap shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
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

    if (pathname === "/resume") {
      if (activeLink !== "/resume") {
        setActiveLink("/resume");
      }
      return;
    }

    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "certifications",
      "contact",
      "github",
    ];

    let observer: IntersectionObserver;

    const initObserver = () => {
      if (observer) observer.disconnect();

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      
      let rootMargin = "-20% 0px -80% 0px";
      if (isMobile) rootMargin = "-10% 0px -70% 0px";
      else if (isTablet) rootMargin = "-15% 0px -75% 0px";

      const observerOptions = {
        root: null,
        rootMargin,
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
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
    };

    initObserver();
    window.addEventListener("resize", initObserver);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", initObserver);
    };
  }, [pathname, activeLink]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    if (pathname === "/" && href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Desktop Antigravity Dock */}
      <nav
        ref={navRef}
        className="hidden md:flex w-max z-[99] fixed left-1/2 top-0 -translate-x-1/2 items-center gap-1 p-2 rounded-full bg-[#0A0A0A]/40 backdrop-blur-sm border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_8px_0_rgba(0,229,255,0.3)]"
        style={{ opacity: 0 }}
      >
        <div className="flex gap-2 relative z-10">
          {navItems.map((item, key) => (
            <Link key={key} href={item.href} passHref legacyBehavior>
              <a>
                <MagneticItem
                  isActive={activeLink === item.href}
                  text={item.text}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.logo}
                </MagneticItem>
              </a>
            </Link>
          ))}
        </div>
        
        {/* Deep ambient glow behind the dock */}
        <div className="absolute inset-0 bg-[#00E5FF]/20 rounded-full blur-xl -z-10" />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-[20px] bg-[#0A0A0A]/60 backdrop-blur-sm border border-white/20 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_8px_0_rgba(0,229,255,0.3)] focus:outline-none hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-[#0A0A0A]/60 z-[9997]"
            />

            {/* Menu Panel Card (Antigravity Style) */}
            <motion.div
              initial={{ opacity: 0, y: -40, rotateX: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, rotateX: 10, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              style={{ transformPerspective: 800 }}
              className="md:hidden fixed top-6 right-6 left-6 z-[9998] bg-[#0A0A0A]/80 backdrop-blur-md border border-white/20 rounded-[20px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white font-bold text-lg tracking-[1.2px] uppercase">
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
                      "group relative flex items-center gap-5 text-base px-5 py-4 rounded-[4px] transition-all duration-200 w-full overflow-hidden cursor-pointer",
                      activeLink === item.href
                        ? "text-[#00E5FF]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {activeLink === item.href && (
                      <motion.div
                        layoutId="mobile-navbar-active"
                        className="absolute inset-0 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-[4px]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-5 w-full">
                      <span className={cn(
                        "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                        activeLink === item.href ? "text-[#00E5FF]" : ""
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
