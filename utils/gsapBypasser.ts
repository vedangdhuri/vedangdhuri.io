import gsap from "gsap";

if (typeof window !== "undefined") {
  const cleanVars = (vars: any) => {
    if (!vars) return vars;
    const clean = { ...vars };

    // Strip ScrollTrigger completely
    if (clean.scrollTrigger) {
      delete clean.scrollTrigger;
    }

    // Cap duration to keep animations fast and snappy
    if (typeof clean.duration === "number" && clean.duration > 0.4) {
      clean.duration = 0.4;
    }

    // Limit stagger delay to prevent animation lag
    if (typeof clean.stagger === "number" && clean.stagger > 0.05) {
      clean.stagger = 0.05;
    }

    return clean;
  };

  const origTo = gsap.to;
  gsap.to = function (targets: any, vars: any) {
    return (origTo as any).call(gsap, targets, cleanVars(vars));
  } as any;

  const origFromTo = gsap.fromTo;
  gsap.fromTo = function (targets: any, fromVars: any, toVars: any) {
    return (origFromTo as any).call(gsap, targets, fromVars, cleanVars(toVars));
  } as any;

  const origTimeline = gsap.timeline;
  gsap.timeline = function (vars: any) {
    const tl = origTimeline.call(gsap, cleanVars(vars));

    const origTlTo = tl.to;
    tl.to = function (targets: any, vars: any, position?: any) {
      return (origTlTo as any).call(tl, targets, cleanVars(vars), position);
    };

    const origTlFromTo = tl.fromTo;
    tl.fromTo = function (targets: any, fromVars: any, toVars: any, position?: any) {
      return (origTlFromTo as any).call(tl, targets, fromVars, cleanVars(toVars), position);
    };

    return tl;
  } as any;
}
