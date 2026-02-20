"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import IconCloudDemo from "@/components/ui/globe";

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

  const headingRef = useRef<HTMLDivElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading
    if (headingRef.current && headingLineRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        headingLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.3",
      );
    }

    // Globe slide in from left
    if (globeRef.current) {
      gsap.fromTo(
        globeRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: globeRef.current,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }

    // Form slide in from right with staggered fields
    if (formRef.current) {
      const formEl = formRef.current;
      gsap.fromTo(
        formEl,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formEl,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        },
      );

      // Stagger individual form fields
      const fields = formEl.querySelectorAll(".form-field");
      gsap.fromTo(
        fields,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: formEl,
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

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL!, {
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
        throw new Error("Webhook failed");
      }

      setSubmitStatus("success");
      reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Discord Webhook Error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 text-white z-1">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div ref={headingRef} className="opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
          </div>
          <div
            ref={headingLineRef}
            className="mx-auto h-[3px] w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-center mb-4"
            style={{ transform: "scaleX(0)" }}
          />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? {"I'd"} love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Globe */}
          <div ref={globeRef} className="space-y-8 opacity-0">
            <IconCloudDemo />
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="p-8 rounded-2xl border border-white/10 bg-indigo-950/20 backdrop-blur-sm z-1 opacity-0 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500"
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
                    className={`w-full bg-black/50 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300`}
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
                    className={`w-full bg-black/50 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300`}
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
                  className={`w-full bg-black/50 border ${errors.subject ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300`}
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
                  className={`w-full bg-black/50 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-[0.98] btn-pulse"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-400"
                >
                  <CheckCircle size={20} />
                  <span>
                    Message sent successfully! {"I'll"} get back to you soon.
                  </span>
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
