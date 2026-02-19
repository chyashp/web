import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Portfolio — Our Work | nanushi",
  description:
    "Explore our portfolio of AI-powered platforms, full-stack web applications, and custom software solutions built with Next.js, Supabase, and React Native.",
  openGraph: {
    title: "Portfolio — Our Work | nanushi",
    description:
      "Explore our portfolio of AI-powered platforms, full-stack web applications, and custom software solutions.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
