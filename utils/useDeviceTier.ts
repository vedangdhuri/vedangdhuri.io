"use client";

import { useEffect, useState } from "react";

/**
 * Device animation tiers:
 *  0 = Full animations  (high-end desktop)
 *  1 = Reduced          (mobile / low-end — fewer particles, no heavy blur)
 *  2 = Minimal          (prefers-reduced-motion OS setting)
 */
export type DeviceTier = 0 | 1 | 2;

function detectTier(): DeviceTier {
  // SSR guard
  if (typeof window === "undefined") return 0;

  // Respect OS accessibility setting first
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 2;

  const isMobile = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency ?? 4;
  const isLowEnd = cores <= 4 || isMobile;

  return isLowEnd ? 1 : 0;
}

/**
 * Returns the current device animation tier.
 * Initialises to 0 on the server, then updates on the client.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(0);

  useEffect(() => {
    setTier(detectTier());
  }, []);

  return tier;
}

/** Non-hook version for use inside useEffect (already client-side). */
export function getDeviceTier(): DeviceTier {
  return detectTier();
}
