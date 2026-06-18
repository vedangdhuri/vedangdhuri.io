"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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
        duration = 0.5,
        delay = 0,
        stagger = 0,
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
                fromVars.y = 30;
                toVars.y = 0;
                break;
            case "fade-down":
                fromVars.y = -30;
                toVars.y = 0;
                break;
            case "fade-left":
                fromVars.x = 40;
                toVars.x = 0;
                break;
            case "fade-right":
                fromVars.x = -40;
                toVars.x = 0;
                break;
            case "scale":
                fromVars.scale = 0.95;
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

        gsap.fromTo(el.children.length > 0 && stagger > 0 ? el.children : el, fromVars, toVars);
    }, [type, duration, delay, stagger]);

    return ref;
}

// Simplified text reveal that fades the entire heading instead of split-character animation
export function useGsapTextReveal(options: {
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerStart?: string;
} = {}) {
    const ref = useRef<HTMLElement>(null);
    const {
        duration = 0.5,
        delay = 0,
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: "power3.out",
            }
        );
    }, [duration, delay]);

    return ref;
}
