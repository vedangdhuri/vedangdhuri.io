"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

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
    activeCursor: "default" as const,
    tooltip: "native" as const,
    initial: [0.1, -0.1] as [number, number],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#00000000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon: any, theme: string) => {
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
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

interface IconCloudProps {
  iconSlugs?: string[];
  imageArray?: string[];
}

export default function IconCloud({
  iconSlugs = [],
  imageArray,
}: IconCloudProps) {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon: any) =>
      renderCustomIcon(icon, theme || "dark")
    );
  }, [data, theme]);

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px",
        }}
      />
    );
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>
        {renderedIcons}
        {imageArray &&
          imageArray.length > 0 &&
          imageArray.map((image, index) => {
            return (
              <a key={index} href="#" onClick={(e) => e.preventDefault()}>
                <img height="42" width="42" alt="A globe icon" src={image} />
              </a>
            );
          })}
      </>
    </Cloud>
  );
}
