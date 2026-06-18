"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, User, Calendar, MapPin } from "lucide-react";
import { useScrollReveal } from "@/utils/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export const education = [
  {
    degree: "Diploma in Computer Engineering",
    institution: "Yashwantrao Bhonsale Institute of Technology",
    year: "2023 - 2026",
    description:
      "Focused on software engineering, algorithms, and web technologies. Expected Graduation with Honors.",
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

  // Scroll reveal refs
  const bioRef = useScrollReveal<HTMLDivElement>({ direction: "left", delay: 100, distance: 50 });
  const eduRef = useScrollReveal<HTMLDivElement>({ direction: "right", delay: 200, distance: 50 });
  const chipsRef = useScrollReveal<HTMLDivElement>({ direction: "up", delay: 300, distance: 30 });

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Heading animation with underline draw
    if (headingRef.current && headingLineRef.current) {
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
          onToggle: (self) => triggers.push(self),
        },
      });

      headingTl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      headingTl.fromTo(
        headingLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.2",
      );
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 text-white z-1">
      <div className="container mx-auto px-6 z-1">
        {/* Section Header */}
        <div className="text-center mb-20">
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
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My journey, education, and professional experience in the world of
            technology.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto z-1">
          {/* Biography — takes 3 cols */}
          <div ref={bioRef} className="lg:col-span-3 z-1">
            <div className="relative">
              {/* Decorative accent */}
              <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/30 to-transparent hidden lg:block" />

              <div className="lg:pl-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-500 text-sm font-mono block">01.</span>
                    Biography
                  </div>
                </h3>

                <div className="space-y-5">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I am a passionate Full Stack Developer with a keen eye for
                    design and a drive for creating immersive digital experiences.
                    With a strong foundation in computer science and years of
                    hands-on experience, I specialize in building scalable web
                    applications using modern technologies.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    My approach combines technical expertise with creative
                    problem-solving. I believe that great software is not just
                    about code, but about understanding user needs and delivering
                    solutions that make a difference. When I&apos;m not coding,
                    you can find me exploring new technologies, contributing to
                    open source, or designing 3D assets.
                  </p>
                </div>

                {/* Quick info chips */}
                <div ref={chipsRef} className="flex flex-wrap gap-3 mt-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Maharashtra, India
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    2+ Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education — takes 2 cols */}
          <div ref={eduRef} className="lg:col-span-2 z-1">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-blue-500 text-sm font-mono block">02.</span>
                Education
              </div>
            </h3>

            <div className="space-y-6 relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500/40 via-blue-500/20 to-transparent" />

              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-indigo-500 border-2 border-black group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(129,140,248,0.5)] transition-all duration-300" />

                  <div className="bg-indigo-950/20 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:-translate-y-0.5">
                    <h4 className="text-base font-bold text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-blue-400 font-medium text-sm">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 mb-3 font-mono">
                      {edu.year}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
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
