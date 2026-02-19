"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";
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
    name: "AI & Machine Learning",
    description:
      "Custom AI solutions, chatbots, intelligent automation, and LLM integrations that transform how you do business.",
    icon: SparklesIcon,
  },
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
      <div className="relative pt-20">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-navy-500 sm:text-6xl">
              We Build Intelligent Digital Solutions
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              AI-powered applications, modern web platforms, and custom software
              — engineered for your business
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
              >
                Get a Free Consultation
              </button>
              <Link
                href="/projects"
                className="text-base font-semibold leading-7 text-navy-500 hover:text-primary-500 transition-colors"
              >
                View Our Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
            Everything you need to build great software
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We offer comprehensive development services to bring your ideas to
            life with cutting-edge technology.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
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

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-lg font-semibold leading-7 text-primary-500">
              Why Choose Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
              Built for success from day one
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We combine technical excellence with business acumen to deliver
              solutions that drive real results.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.name}
                  className="flex flex-col border-l-4 border-primary-500 pl-6"
                >
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-navy-500">
                    <benefit.icon
                      className="h-7 w-7 flex-none text-primary-500"
                      aria-hidden="true"
                    />
                    {benefit.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{benefit.description}</p>
                  </dd>
                </div>
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
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
            How we work with you
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A proven, collaborative approach to building software that delivers
            results.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-2">
            {process.map((item) => (
              <div key={item.name} className="flex flex-col gap-y-4">
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
            ))}
          </dl>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="bg-navy-500 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
            Ready to Build Something Great?
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
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
