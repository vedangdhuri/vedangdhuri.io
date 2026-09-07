"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  CheckCircle2,
  Mail,
  Maximize2,
} from "lucide-react";

export default function ResumeViewer() {
  const [downloaded, setDownloaded] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [previewModal, setPreviewModal] = useState<1 | 2 | null>(null);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageNum: 1 | 2) => {
    setActivePage(pageNum);
    const targetRef = pageNum === 1 ? page1Ref : page2Ref;
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#00E5FF]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-[500px] right-0 w-[500px] h-[400px] bg-[#0A3BFF]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[400px] bg-[#00E5FF]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24 relative z-10">
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          {/* Back to Portfolio Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#00E5FF]/40 text-neutral-300 hover:text-white transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#00E5FF]" />
            <span className="text-xs font-mono tracking-wider uppercase">
              Back to Portfolio
            </span>
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Download Button */}
            <a
              href="/Resume/Vedang_Dhuri_Resume.pdf"
              download="Vedang_Dhuri_Resume.pdf"
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-[#00E5FF] text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-black" />
                  <span>Download PDF</span>
                </>
              )}
            </a>

            {/* Open in New Tab Button */}
            <a
              href="/Resume/Vedang_Dhuri_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/15 hover:border-[#00E5FF]/40 text-white text-xs font-mono tracking-wider uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              <ExternalLink className="w-4 h-4 text-[#00E5FF]" />
              <span className="hidden sm:inline">Open in New Tab</span>
              <span className="sm:hidden">Open</span>
            </a>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>LATEST VERSION • 2026 EDITION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Vedang Dhuri{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-blue-500">
              Resume
            </span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
            Full Stack Developer & AI Engineer specializing in Next.js, MERN stack, Django,
            and scalable real-time systems. Complete overview of experience, projects, skills, and certifications.
          </p>

          {/* Page Switcher Tabs */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              Jump to:
            </span>
            <button
              onClick={() => scrollToPage(1)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activePage === 1
                  ? "bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-semibold"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Page 1 (Experience & Skills)
            </button>
            <button
              onClick={() => scrollToPage(2)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activePage === 2
                  ? "bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-semibold"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Page 2 (Certifications & Activities)
            </button>
          </div>
        </div>

        {/* Resume Documents List */}
        <div className="space-y-12">
          {/* Page 1 Container */}
          <div
            ref={page1Ref}
            id="page-1"
            className="group relative rounded-2xl bg-neutral-900/60 border border-white/10 p-3 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#00E5FF]/40 hover:shadow-[0_0_40px_rgba(0,229,255,0.12)]"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase">
                  Page 01 / 02
                </span>
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                  Profile, Skills, Projects, Education
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewModal(1)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-[#00E5FF] transition-colors"
                  title="Expand Fullscreen"
                  aria-label="Expand Page 1 Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <a
                  href="/Resume/Vedang_Dhuri_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-[#00E5FF] transition-colors"
                  title="Open PDF"
                  aria-label="Open PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Document Render */}
            <div className="relative w-full rounded-xl overflow-hidden bg-white border border-neutral-800 shadow-inner">
              <Image
                src="/Resume/Vedang_Dhuri_Resume_1.png"
                alt="Vedang Dhuri Resume - Page 1"
                width={1786}
                height={2526}
                className="w-full h-auto object-contain block"
                priority
              />
            </div>
          </div>

          {/* Page 2 Container */}
          <div
            ref={page2Ref}
            id="page-2"
            className="group relative rounded-2xl bg-neutral-900/60 border border-white/10 p-3 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#00E5FF]/40 hover:shadow-[0_0_40px_rgba(0,229,255,0.12)]"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase">
                  Page 02 / 02
                </span>
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                  Certifications & Additional Information
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewModal(2)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-[#00E5FF] transition-colors"
                  title="Expand Fullscreen"
                  aria-label="Expand Page 2 Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <a
                  href="/Resume/Vedang_Dhuri_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-[#00E5FF] transition-colors"
                  title="Open PDF"
                  aria-label="Open PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Document Render */}
            <div className="relative w-full rounded-xl overflow-hidden bg-white border border-neutral-800 shadow-inner">
              <Image
                src="/Resume/Vedang_Dhuri_Resume_2.png"
                alt="Vedang Dhuri Resume - Page 2"
                width={1786}
                height={2526}
                className="w-full h-auto object-contain block"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent" />

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Interested in collaborating or hiring?
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-6">
            I am currently open to full-time engineering roles, high-impact freelance projects, and research collaborations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Resume/Vedang_Dhuri_Resume.pdf"
              download="Vedang_Dhuri_Resume.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E5FF] text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-white text-xs font-mono tracking-wider uppercase hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4 text-[#00E5FF]" />
              <span>Get in Touch</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono tracking-wider uppercase hover:bg-white/10 transition-all"
            >
              <span>Explore Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {previewModal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-y-auto"
            onClick={() => setPreviewModal(null)}
          >
            <div
              className="relative max-w-4xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 text-white">
                <span className="text-sm font-mono text-[#00E5FF]">
                  Page {previewModal} of 2 (High Resolution)
                </span>
                <button
                  onClick={() => setPreviewModal(null)}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  Close [ESC]
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-white shadow-2xl border border-white/20">
                <Image
                  src={
                    previewModal === 1
                      ? "/Resume/Vedang_Dhuri_Resume_1.png"
                      : "/Resume/Vedang_Dhuri_Resume_2.png"
                  }
                  alt={`Vedang Dhuri Resume - Page ${previewModal}`}
                  width={1786}
                  height={2526}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
