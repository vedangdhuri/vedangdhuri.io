"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const globeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // Globe slide in from left with orbital float on complete
    if (globeRef.current) {
      gsap.fromTo(
        globeRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: globeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            const icons = globeRef.current?.querySelectorAll(".contact-icon-float");
            if (icons && icons.length > 0) {
              gsap.to(icons, {
                y: -6,
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: {
                  each: 0.4,
                  from: "random",
                },
              });
            }
          },
        },
      );
    }

    // Form slide in from right with staggered fields
    if (formRef.current) {
      const formEl = formRef.current;
      gsap.fromTo(
        formEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formEl,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Stagger individual form fields
      const fields = formEl.querySelectorAll(".form-field");
      gsap.fromTo(
        fields,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formEl,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitStatus("idle");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Portfolio Contact Form",
          embeds: [
            {
              title: "📩 New Contact Message",
              color: 3447003,
              fields: [
                {
                  name: "👤 Name",
                  value: data.name,
                  inline: true,
                },
                {
                  name: "📧 Email",
                  value: data.email,
                  inline: true,
                },
                {
                  name: "📌 Subject",
                  value: data.subject,
                },
                {
                  name: "💬 Message",
                  value: data.message,
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      if (!res.ok) {
        throw new Error("Message could not be sent");
      }

      setSubmitStatus("success");
      reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 text-white z-1">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Globe */}
          <div ref={globeRef} className="flex flex-col justify-between opacity-0">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I&apos;m always open to discussing product design work or partnership opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              
              <div className="flex flex-col gap-6 mb-10">
                <a href="mailto:vedangdhuri.work@gmail.com" className="flex items-center gap-4 group cursor-pointer w-max">
                  <div className="contact-icon-float w-12 h-12 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-colors duration-200 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Email</p>
                    <p className="text-white font-medium group-hover:text-[#00E5FF] transition-colors duration-200">vedangdhuri.work@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 group w-max">
                  <div className="contact-icon-float w-12 h-12 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-colors duration-200 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Location</p>
                    <p className="text-white font-medium group-hover:text-[#00E5FF] transition-colors duration-200">Maharashtra, India</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a href="https://github.com/vedangdhuri" target="_blank" rel="noopener noreferrer" className="contact-icon-float w-12 h-12 rounded-full bg-[#0A0A0A]/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/vedang-dhuri" target="_blank" rel="noopener noreferrer" className="contact-icon-float w-12 h-12 rounded-full bg-[#0A0A0A]/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/vedangdhuri" target="_blank" rel="noopener noreferrer" className="contact-icon-float w-12 h-12 rounded-full bg-[#0A0A0A]/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="p-6 sm:p-8 rounded-[20px] border border-white/20 bg-[#0A0A0A]/40 backdrop-blur-md z-1 opacity-0 hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 form-field">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full bg-[#0A0A0A]/60 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 form-field">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full bg-[#0A0A0A]/60 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 form-field">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full bg-[#0A0A0A]/60 border ${errors.subject ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.subject.message}
                  </span>
                )}
              </div>

              <div className="space-y-2 form-field">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "Message is required" })}
                  className={`w-full bg-[#0A0A0A]/60 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300 resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message.message}
                  </span>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-black font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-[4px] flex items-center gap-3 text-[#00E5FF]"
                >
                  <CheckCircle size={20} />
                  <span>
                    Message sent successfully! {"I'll"} get back to you soon.
                  </span>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-[4px] flex items-center gap-3 text-red-300"
                >
                  <AlertCircle size={20} />
                  <span>Your message could not be sent. Please try again or email me directly.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
