"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationType =
  | "fade-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "none";

interface MotionWrapperProps {
  children: ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  viewportOnce?: boolean;
  className?: string;
  amount?: "some" | "all" | number; // How much of the element needs to be visible
}

export default function MotionWrapper({
  children,
  animation = "fade-in",
  duration = 0.5,
  delay = 0,
  viewportOnce = true,
  className = "",
  amount = "some",
}: MotionWrapperProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x:
        animation === "slide-left"
          ? 100
          : animation === "slide-right"
            ? -100
            : 0,
      y:
        animation === "slide-up" ? 100 : animation === "slide-down" ? -100 : 0,
      scale: animation === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  } as const;

  if (animation === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, amount: amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
