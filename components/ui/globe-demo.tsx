"use client";

import IconCloud from "./icon-cloud";

const slugs = [
"typescript",
  "javascript",
  "python",
  "c",
  "cplusplus",
  "django",
  "react",
  "android",
  "html5",
  "css3",
  "tailwindcss",
  "nodedotjs",
  "express",
  "nextdotjs",
  "amazonwebservices",
  "postgresql",
  "sqlite",
  "mysql",
  "mongodb",
  "firebase",
  "vercel",
  "git",
  "github",
  "gitlab",
  "vscodium",
  "androidstudio",
  "figma",
  "davinciresolve",
  "riotgames",
  "epicgames",
  "steam",
  "framer",
  "kalilinux",
  "arduino",
  "vite",
];

export function GlobeDemo() {
  return (
    <div className="relative flex h-full w-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 bg-transparent mx-auto">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default GlobeDemo;
