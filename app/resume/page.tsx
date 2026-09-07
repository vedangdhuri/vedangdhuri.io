import ResumeViewer from "@/components/pages/Resume/ResumeViewer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Vedang Dhuri",
  description:
    "View and download the official resume of Vedang Dhuri — Full Stack Developer & AI Engineer specializing in Next.js, MERN stack, Django, and real-time systems.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}

