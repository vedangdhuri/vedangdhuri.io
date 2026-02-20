"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [meteors, setMeteors] = useState<number[]>([]);

  useEffect(() => {
    // Create 3 layers of stars for parallax depth
    const layers = [
      { count: 800, speed: 200, size: "1px", opacity: 0.4, class: "stars-bg" }, // Far background (slowest)
      { count: 400, speed: 120, size: "2px", opacity: 0.7, class: "stars-md" }, // Mid-ground
      { count: 200, speed: 60, size: "3px", opacity: 1, class: "stars-fg" }, // Foreground (fastest)
    ];

    layers.forEach((layer) => {
      const layerDiv = document.createElement("div");
      layerDiv.className = `absolute inset-0 ${layer.class}`;
      containerRef.current?.appendChild(layerDiv);

      for (let i = 0; i < layer.count; i++) {
        const star = document.createElement("div");
        const x = Math.random() * 100;
        const initialY = Math.random() * 100; // Start at random Y

        star.className = "absolute rounded-full bg-white";
        star.style.left = `${x}%`;
        star.style.top = `${initialY}%`;
        star.style.width = layer.size;
        star.style.height = layer.size;
        star.style.opacity = `${Math.random() * layer.opacity}`;
        star.style.boxShadow = `0 0 ${parseInt(layer.size) * 2}px rgba(255, 255, 255, ${layer.opacity})`;

        // Random twinkle animation
        gsap.to(star, {
          opacity: 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        });

        // Continuous downward movement logic
        const remainingDistance = 100 - initialY;
        const duration = (remainingDistance / 100) * layer.speed;

        gsap.to(star, {
          top: "100%",
          duration: duration,
          ease: "none",
          onComplete: () => {
            star.style.top = "-5%";
            gsap.to(star, {
              top: "100%",
              duration: layer.speed,
              repeat: -1,
              ease: "none",
              onRepeat: () => {
                gsap.set(star, { top: "-5%" });
              },
            });
          },
        });

        layerDiv.appendChild(star);
      }
    });

    // Meteor generator - More frequent (every 1.5 seconds)
    const meteorInterval = setInterval(() => {
      // Sometimes multiple meteors at once
      const count = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          setMeteors((prev) => [...prev, Date.now() + i]);
        }, i * 400);
      }

      // Clean up old meteors logic
      setTimeout(() => {
        setMeteors((prev) => prev.slice(count));
      }, 2500);
    }, 1500);

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

      {/* Central Galaxy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-blue-900/5 blur-[120px] opacity-30 z-0 animate-pulse-slow" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-indigo-900/5 blur-[100px] opacity-20 z-0 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Meteors */}
      {meteors.map((id) => (
        <div
          key={id}
          className="absolute h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: Math.random() * 50 + "%",
            left: Math.random() * 100 + "%",
            animation: "meteor 2s linear forwards",
          }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 right-full h-[1px] w-[100px] bg-gradient-to-r from-transparent to-white/80" />
        </div>
      ))}

      <style jsx global>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
