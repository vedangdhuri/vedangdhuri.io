import IconCloud from "./icon-cloud";

const slugs: string[] = [
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
  // "dart",
  // "prisma",
  // "nginx",
  // "testinglibrary",
  // "jest",
  // "cypress",
  // "docker",
  // "jira",
  // "sonarqube",
];

export default function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-transparent px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
