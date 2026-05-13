"use client";

import { GSAP_CONSTANTS } from "@/utils/gsap-constants";
import { useDeviceTier } from "@/utils/useDeviceTier";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPreview() {
  const featuredProjects = projects.slice(0, 3);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const tier = useDeviceTier();

  useEffect(() => {
    const isLowTier = tier > 0;

    // Cinematic Heading Reveal
    if (headingRef.current && headingLineRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { 
          opacity: 0, 
          y: 40,
          clipPath: isLowTier ? "none" : "inset(100% 0% 0% 0%)"
        },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: "inset(0% 0% 0% 0%)",
          duration: GSAP_CONSTANTS.DURATION_MEDIUM, 
          ease: GSAP_CONSTANTS.EASE_CINEMATIC 
        }
      );

      tl.fromTo(
        headingLineRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1,
          duration: GSAP_CONSTANTS.DURATION_MEDIUM, 
          ease: GSAP_CONSTANTS.EASE_CINEMATIC 
        },
        "-=0.4"
      );
    }

    // Subtitle Reveal
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: isLowTier ? "none" : "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: GSAP_CONSTANTS.DURATION_MEDIUM,
          ease: GSAP_CONSTANTS.EASE_CINEMATIC,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Horizontal Scroll for Projects with Entry Animation
    if (containerRef.current && scrollWrapperRef.current) {
      const getScrollAmount = () => {
        const wrapperWidth = scrollWrapperRef.current!.scrollWidth;
        const windowWidth = document.documentElement.clientWidth;
        return -(wrapperWidth - windowWidth);
      };

      // Entrance animation for cards
      const cards = scrollWrapperRef.current.querySelectorAll(".project-card-wrapper");
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          x: 50, 
          scale: 0.95,
          clipPath: isLowTier ? "none" : "inset(0% 100% 0% 0%)"
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: GSAP_CONSTANTS.DURATION_MEDIUM,
          stagger: GSAP_CONSTANTS.STAGGER_MEDIUM,
          ease: GSAP_CONSTANTS.EASE_CINEMATIC,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "center center",
        end: () => `+=${scrollWrapperRef.current!.scrollWidth}`,
        scrub: 1,
        animation: gsap.to(scrollWrapperRef.current, {
          x: getScrollAmount,
          ease: "none",
        }),
        invalidateOnRefresh: true,
      });

      return () => {
        pinTrigger.kill();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [tier]);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-neutral-100 tracking-tight opacity-0"
          >
            Projects
          </h2>
          <div
            ref={headingLineRef}
            className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center"
            style={{ transform: "scaleX(0)" }}
          />
          <p
            ref={subtitleRef}
            className="text-lg text-neutral-400 max-w-2xl mx-auto opacity-0"
          >
            Showcasing impactful projects and technical achievements.
          </p>
        </div>

        {/* Horizontal Projects Carousel */}
        <div ref={containerRef} className="overflow-hidden w-full py-10 mt-10">
          <div
            ref={scrollWrapperRef}
            className="flex flex-row items-stretch gap-8 w-max pl-6 pr-[10vw] md:pr-[20vw] lg:pr-[30vw]"
          >
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="project-card-wrapper w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 h-auto"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-neutral-100 bg-neutral-800 border border-neutral-700 rounded-xl hover:bg-neutral-700 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 group cursor-target focus:outline-none"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            View All Missions
          </Link>
        </div>
      </div>
    </section>
  );
}
