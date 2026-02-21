"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import ProjectCarousel from "@/components/ProjectCarousel";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ProjectsIllustration } from "@/components/illustrations";
import { GradientBlob } from "@/components/decorations";

interface Project {
  name: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  stack: string[];
  image: string;
  enabled: boolean;
  liveUrl?: string;
  repoUrl?: string;
  screenshots?: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    name: "ai-powered customer support platform",
    category: "ai & web development",
    description:
      "intelligent customer support system with GPT-4 integration featuring contextual AI chatbot, ticket routing, and human handoff capabilities.",
    challenge:
      "building a scalable AI support system that understands context and knows when to escalate to human agents.",
    solution:
      "custom AI chatbot with contextual understanding, ticket routing, and seamless human handoff.",
    stack: ["Next.js", "OpenAI GPT-4", "Supabase", "Vercel"],
    image: "/projects/ai-support.jpg",
    enabled: false,
  },
  {
    name: "NestFind — real estate listing platform",
    category: "web development",
    description:
      "full-stack real estate platform with interactive map search, property listings across 500+ properties in 25 North American cities, multi-step listing forms, and real-time enquiry management.",
    challenge:
      "building a scalable real estate marketplace with Mapbox-powered map search, image-rich property cards, role-based dashboards for owners and buyers, and direct owner-buyer communication.",
    solution:
      "Next.js 15 app with Supabase auth and RLS, Redux Toolkit for state management, Mapbox GL for interactive map search with clustered markers, and an emerald-themed responsive UI with dark mode.",
    stack: ["Next.js", "TypeScript", "Supabase", "Redux Toolkit", "Mapbox GL", "Tailwind CSS", "Vercel"],
    image: "/projects/nestfind/1.png",
    enabled: true,
    liveUrl: "https://nestfind-c8hg.vercel.app/",
    repoUrl: "https://github.com/chyashp/nestfind",
    screenshots: [
      { src: "/projects/nestfind/1.png", alt: "landing page hero" },
      { src: "/projects/nestfind/2.png", alt: "browse by property type" },
      { src: "/projects/nestfind/3.png", alt: "CTA section & footer" },
      { src: "/projects/nestfind/4.png", alt: "map search — North America view" },
      { src: "/projects/nestfind/5.png", alt: "map search — city zoom with price markers" },
      { src: "/projects/nestfind/6.png", alt: "property search with filters" },
      { src: "/projects/nestfind/7.png", alt: "search results grid" },
      { src: "/projects/nestfind/8.png", alt: "login page" },
      { src: "/projects/nestfind/9.png", alt: "owner dashboard overview" },
      { src: "/projects/nestfind/10.png", alt: "my listings management" },
      { src: "/projects/nestfind/11.png", alt: "enquiries inbox" },
      { src: "/projects/nestfind/12.png", alt: "multi-step listing form" },
    ],
  },
  {
    name: "e-commerce analytics dashboard",
    category: "web development",
    description:
      "real-time analytics platform providing actionable insights for online retailers with interactive charts, order management, and product analytics.",
    challenge:
      "building a unified analytics view that aggregates sales, orders, and product data into one interactive dashboard with per-user data isolation.",
    solution:
      "full-stack dashboard with Chart.js visualizations, date-range filtering, row-level security via Supabase, and dark mode support.",
    stack: ["Next.js", "Supabase", "TypeScript", "Chart.js", "Vercel"],
    image: "/projects/analytics.jpg",
    enabled: true,
    liveUrl: "https://ecom-dash-psi.vercel.app",
    repoUrl: "https://github.com/chyashp/ecom-dash",
    screenshots: [
      { src: "/projects/ecom-dash/1.png", alt: "dashboard overview" },
      { src: "/projects/ecom-dash/2.png", alt: "analytics charts" },
      { src: "/projects/ecom-dash/3.png", alt: "orders management" },
      { src: "/projects/ecom-dash/4.png", alt: "product analytics" },
      { src: "/projects/ecom-dash/5.png", alt: "dark mode view" },
      { src: "/projects/ecom-dash/6.png", alt: "settings & theme" },
    ],
  },
  {
    name: "HealthPulse — healthcare appointment system",
    category: "custom software",
    description:
      "full-stack healthcare platform with role-based dashboards for patients, doctors, and admins — featuring appointment booking, schedule management, medical records, and mock video consultations.",
    challenge:
      "building a multi-role healthcare system with appointment scheduling, doctor availability management, medical records, and role-based access control.",
    solution:
      "Next.js 15 app with Supabase auth and RLS for data isolation, Redux Toolkit for state management, and a teal-themed responsive UI with dark mode support.",
    stack: ["Next.js", "TypeScript", "Supabase", "Redux Toolkit", "Tailwind CSS", "Vercel"],
    image: "/projects/healthcare.jpg",
    enabled: true,
    liveUrl: "https://healthcare-app-wine-delta.vercel.app/",
    repoUrl: "https://github.com/chyashp/healthcare-app.git",
    screenshots: [
      { src: "/projects/healthcare/1.png", alt: "patient appointments list" },
      { src: "/projects/healthcare/2.png", alt: "book appointment flow" },
      { src: "/projects/healthcare/3.png", alt: "patient dashboard overview" },
      { src: "/projects/healthcare/4.png", alt: "doctor dashboard" },
      { src: "/projects/healthcare/5.png", alt: "doctor appointments management" },
      { src: "/projects/healthcare/6.png", alt: "patient medical records" },
      { src: "/projects/healthcare/7.png", alt: "doctor schedule management" },
      { src: "/projects/healthcare/8.png", alt: "video consultation" },
    ],
  },
  {
    name: "content automation platform",
    category: "ai & automation",
    description:
      "AI-driven content generation and management system for marketing teams, creating personalized content at scale.",
    challenge:
      "building an AI-powered content pipeline that maintains brand voice across blog posts, social media, and email.",
    solution:
      "LLM-powered platform generating blog posts, social media content, and email campaigns with brand voice consistency.",
    stack: ["Next.js", "LLM API", "Supabase", "Vercel"],
    image: "/projects/content-ai.jpg",
    enabled: false,
  },
  {
    name: "logistics tracking application",
    category: "mobile & IoT",
    description:
      "real-time package tracking and fleet management system with GPS integration and delivery route optimization.",
    challenge:
      "building a real-time tracking system with live GPS updates, route optimization, and delivery status management.",
    solution:
      "mobile app with GPS tracking, real-time map updates, and predictive delivery estimates.",
    stack: ["React Native", "Supabase", "Google Maps API", "Vercel"],
    image: "/projects/logistics.jpg",
    enabled: false,
  },
];

const enabledProjects = projects.filter((p) => p.enabled);
const categories = [
  "all",
  ...Array.from(new Set(enabledProjects.map((p) => p.category))),
];

export default function ProjectsClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? enabledProjects
      : enabledProjects.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/25 via-orange-50/50 to-primary-100/35" />
        <div className="absolute inset-0 bg-white/45" />
        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-500/15 px-4 py-1.5 text-sm font-semibold text-primary-600 mb-6 ring-1 ring-primary-500/20">
                Portfolio
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-navy-500 sm:text-6xl">
                Our Work
              </h1>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary-500 to-orange-400" />
              <p className="mt-6 text-xl leading-8 text-navy-500/70">
                Explore the solutions we&apos;ve built across industries — from
                AI-powered platforms to custom mobile apps and real-time
                dashboards.
              </p>
            </div>
            <ScrollReveal delay={0.2} className="hidden lg:block">
              <ProjectsIllustration className="w-full max-w-sm mx-auto" />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            className="-mb-px flex space-x-8 overflow-x-auto py-4"
            aria-label="Categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "border-[#FF6B2B] text-[#FF6B2B]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:gap-16">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.name}>
            <div
              className={`grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold mb-4"
                  style={{ backgroundColor: "#FF6B2B15", color: "#FF6B2B" }}
                >
                  {project.category}
                </div>
                <h2
                  className="text-3xl font-bold tracking-tight mb-4"
                  style={{ color: "#1a365d" }}
                >
                  {project.name}
                </h2>
                <p
                  className="text-lg leading-8 mb-6"
                  style={{ color: "#1a365d99" }}
                >
                  {project.description}
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#1a365d" }}
                    >
                      challenge
                    </h3>
                    <p className="text-base" style={{ color: "#1a365d99" }}>
                      {project.challenge}
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#1a365d" }}
                    >
                      solution
                    </h3>
                    <p className="text-base" style={{ color: "#1a365d99" }}>
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#1a365d" }}
                  >
                    technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.liveUrl || project.repoUrl) && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        style={{ backgroundColor: "#FF6B2B" }}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                        live demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:text-[#FF6B2B] hover:border-[#FF6B2B] transition-all"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        source code
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div
                className={
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }
              >
                {project.screenshots ? (
                  <ProjectCarousel images={project.screenshots} />
                ) : (
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <svg
                        className="mx-auto h-16 w-16 mb-4"
                        style={{ color: "#FF6B2B" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#1a365d99" }}
                      >
                        coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Community Projects */}
      <ScrollReveal>
      <div className="bg-gradient-to-b from-orange-50/40 to-primary-50/25 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Community Projects</span>
            </h2>
            <p
              className="mt-4 text-lg leading-8"
              style={{ color: "#1a365d99" }}
            >
              through{" "}
              <Link
                href="/community"
                className="font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "#FF6B2B" }}
              >
                nanushi community
              </Link>
              , we&apos;ve supported developers in building dozens of mobile
              apps through collaborative missions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/missions"
                className="rounded-full px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-lg hover:scale-105 transition-all"
                style={{ backgroundColor: "#FF6B2B" }}
              >
                view community projects
              </Link>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* CTA */}
      <div className="relative overflow-hidden mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <GradientBlob color="orange" size={400} className="top-0 left-1/2 -translate-x-1/2" />
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Ready to Start Your Project?</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-8"
            style={{ color: "#1a365d99" }}
          >
            let&apos;s discuss how we can bring your vision to life with custom
            software that delivers results.
          </p>
          <div className="mt-10">
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-lg hover:scale-105 transition-all"
              style={{ backgroundColor: "#FF6B2B" }}
            >
              get in touch
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
