"use client";
import { color } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Instagram, Linkedin, Facebook, Github } from "lucide-react";
import { Discord, TwitterX } from "react-bootstrap-icons";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    logo: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vedang-dhuri-b03280348",
  },
  {
    logo: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/vedang.dhuri.69",
  },
  {
    logo: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/vedang.dhuri.69/",
  },
  {
    logo: <Github className="w-5 h-5" />,
    href: "https://github.com/vedangdhuri",
  },
  {
    logo: <Discord className="w-5 h-5" />,
    href: "https://discord.com/users/767682446959050753",
  },
  {
    logo: <TwitterX className="w-5 h-5" />,
    href: "https://x.com/VedangDhuri69",
  },
];

export const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#0b111e" }}
      className="mx-auto py-100 px-4 relative border-t border-border mt-12 pt-8 flex flex-wrap items-center justify-between"
    >
      {/* Social icons */}
      <div className="absolute left-1/2 -translate-x-1/2 flex mt-15 w-full justify-center">
        <a href="#home">
          <h2 className="font-medium tracking-tight transition delay-100 ease-in-out text-5xl md:text-6xl hover:text-blue-400">
            VEDANG DHURI
          </h2>
        </a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex mt-60 space-x-5 bg-blue lg:space-x-8 xl:space-x-8 2xl:space-x-8">
        {socialLinks.map((item) => (
          <a
            key={item.href}
            className="transition delay-100 ease-in-out border text-black bg-white/90 p-3 rounded-xl hover:bg-black/10 hover:border hover:border-white hover:text-white"
            href={item.href}
            target="_blank"
          >
            {item.logo}
          </a>
        ))}
      </div>

      {/* Navigation Items */}
      <div className="flex space-x-5 absolute left-1/2 -translate-x-1/2 mt-100 lg:space-x-8 xl:space-x-8 2xl:space-x-8">
        {navItems.map((item, key) => (
          <a
            key={key}
            href={item.href}
            className="text-foreground/80 hover:text-blue-400 transition-colors duration-300 text-lg font-bold"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="absolute left-1/2 -translate-x-1/2 flex mt-130">
        <p className="text-sm text-muted-foreground">
          {" "}
          &copy; {new Date().getFullYear()} Vedang Dhuri. All rights reserved.
        </p>
      </div>

      <div className="ml-auto">
        <a
          href="#home"
          className="absolute right-6 top-2/3 -translate-y-1/2 p-3 rounded-full bg-blue-400/10 transition-colors items-end justify-center hover:scale-110 hover:text-blue-400/30"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};
