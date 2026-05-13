"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getDeviceTier } from "@/utils/useDeviceTier";

export const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tier = getDeviceTier();

    // Tier 2 = prefers-reduced-motion → skip all animations
    if (tier === 2) return;

    const isMobile = window.innerWidth < 768;

    // Star counts per tier
    const starMultiplier = tier === 1 ? 0.25 : isMobile ? 0.6 : 1;

    // Create 3 layers of stars for parallax depth
    const layers = [
      {
        count: Math.floor(100 * starMultiplier),
        speed: 200,
        size: "1px",
        opacity: 0.4,
        class: "stars-bg",
      },
      {
        count: Math.floor(50 * starMultiplier),
        speed: 120,
        size: "2px",
        opacity: 0.7,
        class: "stars-md",
      },
      {
        count: Math.floor(25 * starMultiplier),
        speed: 60,
        size: "3px",
        opacity: 1,
        class: "stars-fg",
      },
    ];

    // Collect all star elements so we can batch-animate them
    const allStars: HTMLElement[] = [];

    layers.forEach((layer) => {
      const layerDiv = document.createElement("div");
      layerDiv.className = `absolute inset-0 ${layer.class}`;
      containerRef.current?.appendChild(layerDiv);

      for (let i = 0; i < layer.count; i++) {
        const star = document.createElement("div");
        const x = Math.random() * 100;
        const initialY = Math.random() * 100;

        star.className = "absolute rounded-full bg-white";
        star.style.left = `${x}%`;
        star.style.top = `${initialY}%`;
        star.style.width = layer.size;
        star.style.height = layer.size;
        star.style.opacity = `${Math.random() * layer.opacity}`;
        star.style.boxShadow = `0 0 ${parseInt(layer.size) * 2}px rgba(255, 255, 255, ${layer.opacity})`;
        // Only promote elements that will actually animate
        star.style.willChange = "transform, opacity";

        allStars.push(star);

        // Continuous downward movement (GPU-accelerated transform)
        const remainingDistance = 100 - initialY;
        const duration = (remainingDistance / 100) * layer.speed;

        gsap.to(star, {
          y: `${remainingDistance}vh`,
          duration: duration,
          ease: "none",
          onComplete: () => {
            gsap.set(star, { top: "-5%", y: 0 });
            gsap.to(star, {
              y: "105vh",
              duration: layer.speed,
              repeat: -1,
              ease: "none",
            });
          },
        });

        layerDiv.appendChild(star);
      }
    });

    // Batch all twinkle animations into a single timeline with stagger
    // This is far cheaper than N individual gsap.to() calls
    if (allStars.length > 0) {
      gsap.to(allStars, {
        opacity: 0.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.08,
          from: "random",
        },
      });
    }

    // Meteors — skip entirely on Tier 1 (mobile/low-end)
    if (tier === 1) {
      return () => {
        if (containerRef.current) containerRef.current.innerHTML = "";
      };
    }

    const meteorInterval = setInterval(() => {
      if (!containerRef.current) return;
      const count = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const meteorWrapper = document.createElement("div");
          meteorWrapper.className =
            "absolute h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]";
          meteorWrapper.style.top = Math.random() * 50 + "%";
          meteorWrapper.style.left = Math.random() * 100 + "%";
          meteorWrapper.style.animation = "meteor 5s linear forwards";
          meteorWrapper.style.willChange = "transform, opacity";

          const meteorTail = document.createElement("div");
          meteorTail.className =
            "absolute top-1/2 -translate-y-1/2 right-full h-[1px] w-[100px] bg-gradient-to-r from-transparent to-white/80";
          meteorWrapper.appendChild(meteorTail);

          containerRef.current?.appendChild(meteorWrapper);

          setTimeout(() => {
            meteorWrapper.remove();
          }, 5500);
        }, i * 400);
      }
    }, 3000); // Increased from 1500ms to 3000ms

    return () => {
      clearInterval(meteorInterval);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Deep Space Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-[#020008] to-[#020008] z-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 z-10" />

      {/* Central Galaxy Glow — lighter blur, no animation on this static element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-blue-900/5 blur-[80px] opacity-20 z-0" />

      <style jsx global>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(1000px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
