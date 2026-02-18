"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface SpaceProfileCardProps {
  avatarUrl: string;
}

const SpaceProfileCard: React.FC<SpaceProfileCardProps> = ({ avatarUrl }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(200, 210, 240, 0.15) 0%, transparent 50%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    glow.style.background = "transparent";
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      className="relative w-[370px] h-[370px] rounded-full cursor-pointer transition-transform duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Moonlight halo — soft silvery outer glow */}
      <div
        className="absolute inset-[-30px] rounded-full animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(200,210,240,0.08) 30%, rgba(140,160,220,0.04) 50%, transparent 70%)",
        }}
      />

      {/* Spinning orbital dust ring */}
      <div className="absolute inset-[-6px] rounded-full animate-avatar-ring-spin opacity-60">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(180,190,220,0.25) 12%, transparent 25%, rgba(160,170,210,0.2) 45%, transparent 55%, rgba(190,200,230,0.2) 75%, transparent 88%)",
          }}
        />
      </div>

      {/* Moon body */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow:
            "0 0 50px rgba(180,190,230,0.12), 0 0 100px rgba(140,150,200,0.06), inset -30px -10px 60px rgba(0,0,0,0.6), inset 8px 8px 30px rgba(200,210,240,0.08)",
        }}
      >
        {/* Avatar image */}
        <Image
          src={avatarUrl}
          alt="Profile"
          fill
          className="object-cover object-top"
          sizes="350px"
          priority
        />

        {/* Moon surface shadow — crescent dark side */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Moonlight highlight — top-left illumination */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 25% 20%, rgba(220,225,245,0.12) 0%, transparent 50%)",
          }}
        />

        {/* Subtle crater texture — circular shadows */}
        <div className="absolute inset-0 rounded-full opacity-20">
          <div className="absolute w-6 h-6 rounded-full top-[18%] left-[22%] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)] bg-white/3" />
          <div className="absolute w-4 h-4 rounded-full top-[55%] left-[15%] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] bg-white/2" />
          <div className="absolute w-8 h-8 rounded-full top-[35%] right-[20%] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.35)] bg-white/3" />
          <div className="absolute w-3 h-3 rounded-full bottom-[25%] right-[30%] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] bg-white/2" />
        </div>

        {/* Atmospheric rim light — thin bright edge */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 60%, rgba(180,190,230,0.06) 85%, rgba(200,210,240,0.1) 95%, transparent 100%)",
          }}
        />

        {/* Interactive glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-200"
        />
      </div>

      {/* Bottom horizon light — reflected light from space */}
      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent blur-[3px]" />
    </div>
  );
};

export default React.memo(SpaceProfileCard);
