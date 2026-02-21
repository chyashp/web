"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";
import ScrollReveal from "@/components/ScrollReveal";
import { GradientBlob, DotGrid, GlowOrb } from "@/components/decorations";
import Image from "next/image";
import { HeroIllustration, ProcessIllustration } from "@/components/illustrations";
import {
  SparklesIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  PencilSquareIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    name: "Web Development",
    description:
      "Full-stack web applications, SaaS platforms, and responsive websites built with modern frameworks.",
    icon: CodeBracketIcon,
  },
  {
    name: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native that deliver seamless experiences on iOS and Android.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Custom Software",
    description:
      "Bespoke solutions tailored to your business needs, from API development to system integrations.",
    icon: Cog6ToothIcon,
  },
  {
    name: "AI & Machine Learning",
    description:
      "Custom AI solutions, chatbots, intelligent automation, and LLM integrations that transform how you do business.",
    icon: SparklesIcon,
  },
];

const benefits = [
  {
    name: "End-to-End Delivery",
    description:
      "From concept to deployment, we handle the full software development lifecycle.",
    icon: RocketLaunchIcon,
  },
  {
    name: "AI-First Approach",
    description:
      "Every solution is enhanced with intelligent automation to maximize efficiency.",
    icon: BoltIcon,
  },
  {
    name: "Proven Track Record",
    description:
      "Backed by a global community of developers and real-world projects.",
    icon: UserGroupIcon,
  },
  {
    name: "Post-Launch Support",
    description:
      "Ongoing maintenance, optimization, and scaling to ensure long-term success.",
    icon: ShieldCheckIcon,
  },
];

const process = [
  {
    step: "01",
    name: "Discovery",
    description:
      "Understand your goals, challenges, and requirements through in-depth consultation.",
    icon: LightBulbIcon,
  },
  {
    step: "02",
    name: "Design & Plan",
    description:
      "Create architecture, wireframes, and a detailed project roadmap.",
    icon: PencilSquareIcon,
  },
  {
    step: "03",
    name: "Build & Iterate",
    description:
      "Agile development sprints with regular demos and your feedback integrated.",
    icon: WrenchScrewdriverIcon,
  },
  {
    step: "04",
    name: "Launch & Support",
    description: "Seamless deployment, monitoring, and ongoing improvements.",
    icon: RocketLaunchIcon,
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "OpenAI",
  "Tailwind CSS",
  "Vercel",
];

export default function HomeClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden min-h-screen flex items-center">
        {/* Background image with warm orange overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-orange-50/55 to-primary-100/40" />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
            <ScrollReveal>
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-navy-500 sm:text-7xl">
                  We Build Intelligent Digital Solutions
                </h1>
                <p className="mt-8 text-xl leading-8 text-navy-500/70">
                  AI-powered applications, modern web platforms, and custom software
                  — engineered for your business
                </p>
                <div className="mt-12 flex items-center gap-x-6">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-10 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-primary-500/30 hover:scale-105 transition-all"
                  >
                    Get a Free Consultation
                  </button>
                  <Link
                    href="/projects"
                    className="text-lg font-semibold leading-7 text-navy-500 hover:text-primary-500 transition-colors"
                  >
                    View Our Work <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="hidden lg:block">
              <HeroIllustration className="w-full max-w-md mx-auto drop-shadow-xl" />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/45 via-primary-50/25 to-white py-16 sm:py-24">
        <DotGrid opacity={0.2} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Everything you need to build great software</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We offer comprehensive development services to bring your ideas to
            life with cutting-edge technology.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal key={service.name} delay={index * 0.1}>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-navy-500">
                    <service.icon
                      className="h-8 w-8 flex-none text-primary-500"
                      aria-hidden="true"
                    />
                    {service.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-base font-semibold leading-7 text-primary-500 hover:text-primary-600 transition-colors"
            >
              Learn more about our services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/code-bokeh.jpg"
            alt=""
            fill
            className="object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/80 via-navy-500/70 to-navy-500/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-lg font-semibold leading-7 text-primary-400">
                Why Choose Us
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Built for success from day one
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We combine technical excellence with business acumen to deliver
                solutions that drive real results.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-6 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={benefit.name} delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-8 h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/20 mb-4">
                      <benefit.icon
                        className="h-7 w-7 text-primary-400"
                        aria-hidden="true"
                      />
                    </div>
                    <dt className="text-lg font-semibold leading-7 text-white">
                      {benefit.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-300">
                      {benefit.description}
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* How We Work Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Our Process
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">How we work with you</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A proven, collaborative approach to building software that delivers
            results.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
          <div className="grid lg:grid-cols-5 lg:gap-12 items-start">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-2 lg:col-span-3">
            {process.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 0.15}>
                <div className="flex flex-col gap-y-4">
                  <dt className="flex items-center gap-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary-500">
                        {item.step}
                      </div>
                      <div className="text-xl font-semibold text-navy-500">
                        {item.name}
                      </div>
                    </div>
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 pl-16">
                    <p className="flex-auto">{item.description}</p>
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
          <ScrollReveal delay={0.3} className="hidden lg:block lg:col-span-2">
            <ProcessIllustration className="w-full max-w-sm mx-auto opacity-80" />
          </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="relative overflow-hidden bg-navy-500 py-16 sm:py-24">
        <GlowOrb color="orange" size={400} className="-top-20 -left-20" />
        <GlowOrb color="orange" size={300} className="-bottom-20 -right-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Technologies We Work With
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Modern tools and frameworks to build fast, scalable, and reliable software.
                </p>
              </div>
              <div className="mt-16 flex flex-wrap justify-center gap-4 sm:mt-20">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 text-base font-medium text-white ring-1 ring-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative overflow-hidden mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <GradientBlob color="orange" size={400} className="top-0 left-1/2 -translate-x-1/2" />
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Ready to Build Something Great?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Let&apos;s discuss your project and explore how we can help you
              achieve your goals. Get in touch for a free consultation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
              >
                Contact Us Today
              </button>
              <Link
                href="/about"
                className="text-base font-semibold leading-7 text-navy-500 hover:text-primary-500 transition-colors"
              >
                Learn more about us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
