"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProfileCard from "../../ui/ProfileCard/ProfileCard";
import avtarUrl from "../../../public/img/main_image.png";
import codeIcon from "../../../public/img/code.png";
import { FlipWords } from "../../ui/FlipWords";

const Hero = () => {
  const words = [
    "Computer Engineer",
    "UI/UX Designer",
    "Photo Editor",
    "Gamer",
  ];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white"
        >
          <div>
            <h2 className="text-xl md:text-3xl font-medium text-blue-400 mb-4">
              Hello, I&apos;m{" "}
              <span className="font-bold text-white">Vedang Dhuri</span> a
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Creative{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Developer
            </span>
          </h1>

          <div className="text-xl md:text-3xl text-blue-400 font-bold mb-8 h-8">
            <span className="text-white">I&apos;m a</span>

            <motion.span
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              <FlipWords words={words} className="ml-2" />
            </motion.span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 font-bold">
            <a
              href="#projects"
              className="group flex items-center justify-center px-8 py-3 bg-blue-400 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View Work
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center px-8 py-3 border border-white/20 hover:bg-white/10 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Content - Hero Image/Interaction Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden md:flex justify-center items-center relative"
        >
          <ProfileCard
            enableMobileTilt
            behindGlowEnabled={false}
            behindGlowColor="hsla(199, 100%, 70%, 0.6)"
            innerGradient="linear-gradient(145deg,hsla(199, 40%, 45%, 0.55) 0%,hsla(11, 60%, 70%, 0.27) 100%)"
            avatarUrl={avtarUrl.src}
            iconUrl={codeIcon.src}
          />

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 left-0 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10"
          >
            <span className="text-2xl">💻</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-blue-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
