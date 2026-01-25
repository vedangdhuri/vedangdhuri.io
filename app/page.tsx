"use client";
import About from "@/components/pages/About/About";
import Contact from "@/components/pages/Contact/Contact";
import Hero from "@/components/pages/Hero/Hero";
import Projects from "@/components/pages/Project/Projects";
import SkillsSection from "@/components/pages/Skills/Skills";
import Loader from "@/components/pages/Loader/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div
        className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Hero />
        <About />
        <SkillsSection />
        {/* <Projects /> */}
        <Contact />
      </div>
    </>
  );
}
