"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const education = [
  {
    degree: "Diploma in Computer Engineering",
    institution: "Yashwantrao bhonsale institute of technology",
    year: "2023 - 2026",
    description:
      "Focused on software engineering, algorithms, and web technologies. Graduated with Honors.",
  },
  {
    degree: "Full Stack Web Development & IoT ",
    institution: "Softmusk Info Pvt Ltd",
    year: "2025",
    description:
      "Intensive 12-week program covering modern web stack including MERN and IoT development.",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const eduHeaderRef = useRef<HTMLHeadingElement>(null);
  const eduCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation with underline draw
    if (headingRef.current && headingLineRef.current) {
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      });

      headingTl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      headingTl.fromTo(
        headingLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3",
      );
    }

    // Subtitle animation
    const subtitle = sectionRef.current?.querySelector(".about-subtitle");
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitle,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Biography paragraphs reveal
    if (bioRef.current) {
      const paragraphs = bioRef.current.querySelectorAll("p");
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Education header
    if (eduHeaderRef.current) {
      gsap.fromTo(
        eduHeaderRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eduHeaderRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Education cards staggered slide-in
    if (eduCardsRef.current) {
      const cards = eduCardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, x: 80, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eduCardsRef.current,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 text-white z-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-4 opacity-0"
          >
            About Me
          </h2>
          <div
            ref={headingLineRef}
            className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center mb-4"
            style={{ transform: "scaleX(0)" }}
          />
          <p className="about-subtitle text-gray-400 max-w-2xl mx-auto opacity-0">
            My journey, education, and professional experience in the world of
            technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Biography & Education */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-blue-500">01.</span> Biography
              </h3>
              <div
                ref={bioRef}
                className="prose prose-invert text-white flex-none text-justify"
              >
                <p className="mb-4" style={{ fontSize: "18px" }}>
                  I am a passionate Full Stack Developer with a keen eye for
                  design and a drive for creating immersive digital experiences.
                  With a strong foundation in computer science and years of
                  hands-on experience, I specialize in building scalable web
                  applications using modern technologies.
                </p>
                <br />
                <p style={{ fontSize: "18px" }}>
                  My approach combines technical expertise with creative
                  problem-solving. I believe that great software is not just
                  about code, but about understanding user needs and delivering
                  solutions that make a difference. When I'm not coding, you can
                  find me exploring new technologies, contributing to open
                  source, or designing 3D assets.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="z-50">
            <h3
              ref={eduHeaderRef}
              className="text-2xl font-bold mb-6 flex items-center gap-2 opacity-0"
            >
              <span className="text-blue-500">02.</span> Education
            </h3>

            <div
              ref={eduCardsRef}
              className="space-y-8"
              style={{ perspective: "600px" }}
            >
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group bg-indigo-950/20 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-blue-500 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 mb-2">
                        {edu.year}
                      </p>
                      <p className="text-gray-400 text-sm">{edu.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
