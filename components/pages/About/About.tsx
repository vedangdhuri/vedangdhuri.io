"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My journey, education, and professional experience in the world of
            technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Biography & Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-blue-500">01.</span> Biography
              </h3>
              <div className="prose prose-invert text-white">
                <p className="mb-4">
                  I am a passionate Full Stack Developer with a keen eye for
                  design and a drive for creating immersive digital experiences.
                  With a strong foundation in computer science and years of
                  hands-on experience, I specialize in building scalable web
                  applications using modern technologies.
                </p>
                <p>
                  My approach combines technical expertise with creative
                  problem-solving. I believe that great software is not just
                  about code, but about understanding user needs and delivering
                  solutions that make a difference. When {"I'm"} not coding, you
                  can find me exploring new technologies, contributing to open
                  source, or designing 3D assets.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500">02.</span> Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-blue-600/10 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
