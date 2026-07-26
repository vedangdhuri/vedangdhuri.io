"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";
import { getDeviceTier } from "@/utils/useDeviceTier";

interface LoaderProps {
  onComplete?: () => void;
  onExitStart?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, onExitStart }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bootStage, setBootStage] = useState<"counter" | "greeting">("counter");
  
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const hasExitedRef = useRef(false);

  const handleSkip = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    setIsLoading(false);
    onExitStart?.();
    setTimeout(() => {
      onComplete?.();
    }, 1100);
  }, [onComplete, onExitStart]);

  const handleGreetingComplete = useCallback(() => {
    if (hasExitedRef.current) return;

    setTimeout(() => {
      if (hasExitedRef.current) return;
      hasExitedRef.current = true;
      setIsLoading(false);
      onExitStart?.();
      setTimeout(() => {
        onComplete?.();
      }, 1100);
    }, 350);
  }, [onComplete, onExitStart]);

  // Stage 1: Digital numeric boot counter driven by GSAP
  useEffect(() => {
    const tier = getDeviceTier();
    const counterDuration = tier === 2 ? 0.4 : 1.3;
    const valObj = { val: 0 };

    const tween = gsap.to(valObj, {
      val: 100,
      duration: counterDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(valObj.val).toString().padStart(2, "0")}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${valObj.val}%`;
        }
        if (statusRef.current) {
          const v = valObj.val;
          if (v < 25) {
            statusRef.current.textContent = "[ SYS.INIT // BOOTING KERNEL ]";
          } else if (v < 60) {
            statusRef.current.textContent = "[ NEURAL.ASSETS // LOADING ]";
          } else if (v < 90) {
            statusRef.current.textContent = "[ INTERFACE.SYNC // OPTIMIZING ]";
          } else {
            statusRef.current.textContent = "[ NEXUS.READY // WELCOME ]";
          }
        }
      },
      onComplete: () => {
        setTimeout(() => {
          if (!hasExitedRef.current) {
            setBootStage("greeting");
          }
        }, 250);
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  // Safety fallback in case SVG completion callback is delayed or tab is inactive
  useEffect(() => {
    if (bootStage === "greeting") {
      const timer = setTimeout(() => {
        handleGreetingComplete();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [bootStage, handleGreetingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.1,
              ease: [0.7, 0, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden will-change-transform select-none"
        >
          {/* Ambient Cyber Atmosphere Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0A3BFF]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Decorative Corner Telemetry (Desktop only to maintain mobile clarity) */}
          <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 font-mono text-[11px] text-[#00E5FF]/50 tracking-wider">
            <span>[ NEXUS_CORE // v2.0.26 ]</span>
          </div>
          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 font-mono text-[11px] text-[#00E5FF]/50 tracking-wider">
            <span>SYS.MONITOR // ACTIVE</span>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 font-mono text-[11px] text-[#00E5FF]/70 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
            <span>[ STATUS: ONLINE ]</span>
          </div>

          {/* Interactive Skip Button */}
          <button
            onClick={handleSkip}
            type="button"
            className="absolute bottom-5 right-6 z-20 flex items-center gap-1.5 font-mono text-[11px] text-[#00E5FF]/80 hover:text-[#00E5FF] transition-all py-1.5 px-3 rounded border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10 backdrop-blur-md cursor-pointer group"
          >
            <span>[ SKIP INTRO</span>
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            <span>]</span>
          </button>

          {/* Main Visual Stage */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-[480px] px-6 min-h-[220px]">
            <AnimatePresence mode="wait">
              {bootStage === "counter" ? (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.05,
                    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                  }}
                  className="flex flex-col items-center justify-center w-full text-center z-10"
                >
                  <div
                    ref={counterRef}
                    className="font-mono text-6xl sm:text-7xl md:text-8xl font-extralight tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                  >
                    00%
                  </div>
                  <div className="w-full max-w-[280px] sm:max-w-[320px] h-1 bg-white/10 rounded-full overflow-hidden mt-6 relative">
                    <div
                      ref={progressBarRef}
                      className="h-full w-0 bg-gradient-to-r from-[#00E5FF] via-[#0A3BFF] to-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]"
                    />
                  </div>
                  <div
                    ref={statusRef}
                    className="font-mono text-[11px] sm:text-xs text-[#00E5FF]/90 tracking-[0.2em] mt-5 uppercase min-h-[1.5rem] flex items-center justify-center"
                  >
                    [ SYS.INIT // BOOTING KERNEL ]
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="greeting"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center justify-center w-full z-10"
                >
                  <AppleHelloEnglishEffect
                    speed={1.3}
                    onAnimationComplete={handleGreetingComplete}
                    className="text-white h-16 sm:h-20 md:h-24 will-change-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="mt-8 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#00E5FF] uppercase bg-[#00E5FF]/5 px-5 py-2 rounded-full border border-[#00E5FF]/30 shadow-[0_0_25px_rgba(0,229,255,0.15)] backdrop-blur-md flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                    <span>[ AUTONOMOUS PORTFOLIO OS ]</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glowing Scanner Blade on Exit Wipe */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_25px_#00E5FF] opacity-90" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

