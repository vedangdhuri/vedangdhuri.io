"use client";

import { useEffect, useRef, useCallback } from "react";
import { getDeviceTier } from "./useDeviceTier";

/* ------------------------------------------------------------------ */
/*  Scroll Reveal Hook                                                 */
/*  Uses IntersectionObserver for lightweight, GPU-accelerated         */
/*  scroll-triggered animations via CSS classes.                       */
/* ------------------------------------------------------------------ */

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";

interface UseScrollRevealOptions {
  /** Direction the element slides in from (default: "up") */
  direction?: RevealDirection;
  /** Delay in ms before animation starts (default: 0) */
  delay?: number;
  /** How far the element travels in px (default: 60) */
  distance?: number;
  /** Duration of the animation in ms (default: 800) */
  duration?: number;
  /** Viewport threshold (0–1) to trigger (default: 0.15) */
  threshold?: number;
  /** Root margin for IntersectionObserver (default: "0px 0px -80px 0px") */
  rootMargin?: string;
  /** Whether the animation should only play once (default: true) */
  once?: boolean;
  /** Whether to stagger children instead of the container (default: false) */
  staggerChildren?: boolean;
  /** Stagger delay between children in ms (default: 80) */
  staggerDelay?: number;
}

/**
 * useScrollReveal — attaches an IntersectionObserver to a ref
 * and applies CSS custom-property–driven reveal animations
 * when the element scrolls into view.
 *
 * Returns a ref to attach to the target element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    direction = "up",
    delay = 0,
    distance = 60,
    duration = 800,
    threshold = 0.15,
    rootMargin = "0px 0px -80px 0px",
    once = true,
    staggerChildren = false,
    staggerDelay = 80,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tier = getDeviceTier();

    // prefers-reduced-motion → show immediately, no animation
    if (tier === 2) {
      el.style.opacity = "1";
      el.style.transform = "none";
      if (staggerChildren) {
        Array.from(el.children).forEach((child) => {
          (child as HTMLElement).style.opacity = "1";
          (child as HTMLElement).style.transform = "none";
        });
      }
      return;
    }

    // Set CSS custom properties for the animation
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    el.style.setProperty("--reveal-duration", `${duration}ms`);
    el.style.setProperty("--reveal-distance", `${distance}px`);

    // Apply the initial hidden state class
    el.classList.add("scroll-reveal", `scroll-reveal--${direction}`);

    // If staggering children, prepare each child
    if (staggerChildren) {
      Array.from(el.children).forEach((child, i) => {
        const childEl = child as HTMLElement;
        childEl.style.setProperty("--reveal-delay", `${delay + i * staggerDelay}ms`);
        childEl.style.setProperty("--reveal-duration", `${duration}ms`);
        childEl.style.setProperty("--reveal-distance", `${distance}px`);
        childEl.classList.add("scroll-reveal", `scroll-reveal--${direction}`);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the animation
            if (staggerChildren) {
              Array.from(el.children).forEach((child) => {
                (child as HTMLElement).classList.add("scroll-reveal--visible");
              });
            } else {
              el.classList.add("scroll-reveal--visible");
            }

            if (once) observer.unobserve(el);
          } else if (!once) {
            // Reset when scrolling out
            if (staggerChildren) {
              Array.from(el.children).forEach((child) => {
                (child as HTMLElement).classList.remove("scroll-reveal--visible");
              });
            } else {
              el.classList.remove("scroll-reveal--visible");
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [direction, delay, distance, duration, threshold, rootMargin, once, staggerChildren, staggerDelay]);

  return ref;
}

/**
 * useParallax — creates a subtle parallax offset on scroll.
 * Uses CSS transform for GPU acceleration.
 * Returns a ref to attach to the element.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
) {
  const ref = useRef<T>(null);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // How far the element is from the center of the viewport (normalised)
    const progress = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
    const yOffset = progress * speed * 100;
    el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
  }, [speed]);

  useEffect(() => {
    const tier = getDeviceTier();
    if (tier >= 1) return; // skip parallax on mobile / reduced-motion

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return ref;
}
