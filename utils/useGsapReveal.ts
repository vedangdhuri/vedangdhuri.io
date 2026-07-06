"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "fade-up" | "fade-left" | "fade-right" | "fade-down" | "scale" | "clip-up";

interface UseGsapRevealOptions {
    type?: RevealType;
    duration?: number;
    delay?: number;
    stagger?: number;
    scrub?: boolean;
    once?: boolean;
    triggerStart?: string;
}

export function useGsapReveal<T extends HTMLElement>(
    options: UseGsapRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        type = "fade-up",
        duration = 1,
        delay = 0,
        stagger = 0,
        scrub = false,
        once = true,
        triggerStart = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const fromVars: gsap.TweenVars = { opacity: 0 };
        const toVars: gsap.TweenVars = {
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
        };

        switch (type) {
            case "fade-up":
                fromVars.y = 80;
                toVars.y = 0;
                break;
            case "fade-down":
                fromVars.y = -80;
                toVars.y = 0;
                break;
            case "fade-left":
                fromVars.x = 100;
                toVars.x = 0;
                break;
            case "fade-right":
                fromVars.x = -100;
                toVars.x = 0;
                break;
            case "scale":
                fromVars.scale = 0.8;
                toVars.scale = 1;
                break;
            case "clip-up":
                fromVars.clipPath = "inset(100% 0% 0% 0%)";
                toVars.clipPath = "inset(0% 0% 0% 0%)";
                break;
        }

        if (stagger > 0) {
            toVars.stagger = stagger;
        }

        toVars.scrollTrigger = {
            trigger: el,
            start: triggerStart,
            toggleActions: once ? "play none none none" : "play none none reverse",
            ...(scrub ? { scrub: 1 } : {}),
        };

        gsap.fromTo(el.children.length > 0 && stagger > 0 ? el.children : el, fromVars, toVars);

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [type, duration, delay, stagger, scrub, once, triggerStart]);

    return ref;
}

// Utility to split text into spans for character animation
export function useGsapTextReveal(options: {
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerStart?: string;
} = {}) {
    const ref = useRef<HTMLElement>(null);
    const {
        duration = 0.8,
        delay = 0,
        stagger = 0.03,
        triggerStart = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const text = el.textContent || "";
        el.innerHTML = "";
        el.style.overflow = "hidden";

        const chars = text.split("").map((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(100%)";
            el.appendChild(span);
            return span;
        });

        gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: triggerStart,
                toggleActions: "play none none none",
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [duration, delay, stagger, triggerStart]);

    return ref;
}
