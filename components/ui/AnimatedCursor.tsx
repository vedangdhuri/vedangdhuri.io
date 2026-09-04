"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function AnimatedCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer technical frame
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run on devices with fine pointers (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is interactive
      const isClickable = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.tagName.toLowerCase() === "select" ||
        (target.hasAttribute("role") && target.getAttribute("role") === "button") ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");
      
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Hide default cursor globally
    const style = document.createElement("style");
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden sm:block">
      {/* Inner Dot - Instant tracking */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isClicking ? 0.5 : isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />

      {/* Outer Technical Frame - Spring tracking */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isClicking ? 0.9 : isPointer ? 1.2 : 1,
          rotate: isClicking ? -45 : isPointer ? 90 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Corner brackets that expand and fade out on hover */}
          <motion.path 
            d="M12 6H6V12M36 6H42V12M12 42H6V36M36 42H42V36" 
            stroke="#00E5FF" 
            strokeWidth="1.5" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
            animate={{
              strokeOpacity: isPointer ? 0 : 0.8,
              d: isClicking 
                ? "M14 8H8V14M34 8H40V14M14 40H8V34M34 40H40V34" 
                : "M12 6H6V12M36 6H42V12M12 42H6V36M36 42H42V36"
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Inner rotating dashed focus ring */}
          <motion.circle 
            cx="24" 
            cy="24" 
            r="16" 
            stroke="#00E5FF" 
            strokeWidth="1.2" 
            strokeDasharray="4 6" 
            animate={{
              r: isPointer ? 22 : 16,
              strokeOpacity: isPointer ? 0.9 : 0.4,
              rotate: isPointer ? 180 : 0,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            style={{ originX: "50%", originY: "50%" }}
          />
          
          {/* Solid glassy circle that appears on hover */}
          <motion.circle 
            cx="24" 
            cy="24" 
            r="20" 
            fill="#00E5FF" 
            animate={{
              fillOpacity: isPointer ? 0.15 : 0,
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
