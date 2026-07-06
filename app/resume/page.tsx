import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Vedang Dhuri",
  description: "View and download the resume of Vedang Dhuri.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 flex flex-col items-center py-20 px-4 font-sans">
      {/* Top Navigation Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 px-2">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </Link>

        {/* Action Button: Open in New Tab */}
        <a
          href="/Resume/Vedang_Dhuri_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white text-sm px-5 py-2.5 rounded-full shadow-lg transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="font-semibold">Open in New Tab</span>
        </a>
      </div>

      {/* Resume Image Container */}
      <div className="w-full max-w-4xl bg-neutral-900/50 border border-white/10 rounded-2xl p-4 shadow-2xl flex justify-center items-center overflow-hidden">
        <img
          src="/Resume/Vedang_Dhuri_Resume_1.png"
          alt="Vedang Dhuri Resume"
          className="max-w-full h-auto rounded-lg shadow-xl object-contain border border-neutral-800"
        />
      </div>
    </main>
  );
}
