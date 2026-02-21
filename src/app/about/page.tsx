import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About nanushi — AI & Web Development Company",
  description:
    "Learn about nanushi, our mission, values, and how we build intelligent digital solutions for modern businesses using AI, Next.js, React Native, and Supabase.",
  openGraph: {
    title: "About nanushi — AI & Web Development Company",
    description:
      "Learn about nanushi, our mission, values, and how we build intelligent digital solutions for modern businesses.",
  },
};

export default function About() {
  return <AboutClient />;
}
