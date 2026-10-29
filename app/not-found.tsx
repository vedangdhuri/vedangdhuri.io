import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description:
    "The page or project you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-neutral-200">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-300">
            Page Not Found
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto">
            The page or project you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg hover:bg-white transition-all duration-300"
          >
            Return Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-200 border border-neutral-700 rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-300"
          >
            Browse Projects
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-200 border border-neutral-700 rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-300"
          >
            About Vedang
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-200 border border-neutral-700 rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-300"
          >
            Contact Vedang
          </Link>
        </div>
      </div>
    </div>
  );
}
