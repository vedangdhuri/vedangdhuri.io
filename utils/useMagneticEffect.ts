"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticOptions {
    strength?: number;
    ease?: number;
}

export function useMagneticEffect<T extends HTMLElement>(
    options: MagneticOptions = {}
) {
    const ref = useRef<T>(null);
    const { strength = 0.35, ease = 0.2 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Don't apply on touch devices
        if ("ontouchstart" in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(el, {
                x: deltaX,
                y: deltaY,
                duration: ease,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
            });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength, ease]);

    return ref;
}
