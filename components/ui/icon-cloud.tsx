/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud";

/* ----------------------------------
   Types
----------------------------------- */

type IconCloudProps = {
  iconSlugs?: string[];
  imageArray?: string[];
};

type SimpleIconsResponse = {
  simpleIcons: Record<string, SimpleIcon>;
};

/* ----------------------------------
   Cloud Config
----------------------------------- */

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native" as const,
    initial: [0.1, -0.1] as [number, number],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

/* ----------------------------------
   Icon Renderer
----------------------------------- */

export const renderCustomIcon = (
  icon: SimpleIcon,
  theme: "light" | "dark"
) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

/* ----------------------------------
   Component
----------------------------------- */

export default function IconCloud({
  iconSlugs = [],
  imageArray = [],
}: IconCloudProps) {
  const [data, setData] = useState<SimpleIconsResponse | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!iconSlugs.length) return;

    fetchSimpleIcons({ slugs: iconSlugs }).then(
      setData as (value: SimpleIconsResponse) => void
    );
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    const resolvedTheme =
      theme === "light" || theme === "dark" ? theme : "dark";

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, resolvedTheme)
    );
  }, [data, theme]);

  return (
    <Cloud {...cloudProps}>
        {renderedIcons}

        {imageArray.map((image, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={image}
              alt="Custom icon"
              width={42}
              height={42}
            />
          </a>
        ))}
    </Cloud>
  );
}