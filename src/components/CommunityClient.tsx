"use client";

import Link from "next/link";
import {
  UserGroupIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "@/components/ScrollReveal";
import { DotGrid, GlowOrb } from "@/components/decorations";
import Image from "next/image";

const communityLinks = [
  {
    name: "Missions",
    href: "/missions",
    description:
      "Join real product teams and build mobile apps in 6-week collaborative projects.",
    icon: RocketLaunchIcon,
  },
  {
    name: "Tutorials",
    href: "/tutorials",
    description:
      "Step-by-step guides to master React Native, TypeScript, and mobile development.",
    icon: BookOpenIcon,
  },
  {
    name: "How It Works",
    href: "/how-it-works",
    description:
      "Learn about our collaborative team-based approach to mobile development learning.",
    icon: AcademicCapIcon,
  },
  {
    name: "FAQ",
    href: "/faq",
    description:
      "Get answers to common questions about the nanushi community platform.",
    icon: QuestionMarkCircleIcon,
  },
];

const features = [
  {
    name: "Real Product Teams",
    description:
      "Work with developers, designers, and product managers in a realistic team environment.",
    icon: UserGroupIcon,
  },
  {
    name: "Hands-On Projects",
    description:
      "Build production-ready mobile apps from scratch using React Native and modern tools.",
    icon: CodeBracketIcon,
  },
  {
    name: "Structured Learning",
    description:
      "6-week missions with clear milestones, code reviews, and professional workflows.",
    icon: AcademicCapIcon,
  },
];

export default function CommunityClient() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/community-code.jpg"
            alt=""
            fill
            className="object-cover blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-500/75 via-navy-500/60 to-primary-900/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              nanushi Community
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200">
              A collaborative learning platform where aspiring mobile developers
              build real apps in product teams.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Gain hands-on experience through 6-week mobile app projects with
              developers, designers, and product managers.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Learning Through Building
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Real experience. Real teams. Real apps.</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The nanushi community is designed to bridge the gap between learning
            and professional mobile development through collaborative,
            project-based experience.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.name} delay={index * 0.1}>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-navy-500">
                    <feature.icon
                      className="h-8 w-8 flex-none text-primary-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </div>

      {/* Community Resources */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 to-primary-50/25 py-16 sm:py-24">
        <DotGrid opacity={0.2} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Explore Our Community</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need to get started with collaborative mobile
              development.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-2">
            {communityLinks.map((link, index) => (
              <ScrollReveal key={link.name} delay={index * 0.1}>
                <Link
                  href={link.href}
                  className="flex flex-col gap-y-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500">
                      <link.icon
                        className="h-7 w-7 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-500">
                      {link.name}
                    </h3>
                  </div>
                  <p className="text-base leading-7 text-gray-600">
                    {link.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-sm font-semibold text-primary-500 hover:text-primary-600">
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Skills & Experience
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">What you&apos;ll learn</span>
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2">
            <ScrollReveal>
              <div className="flex flex-col border-l-4 border-primary-500 pl-6">
                <dt className="text-xl font-semibold text-navy-500 mb-4">
                  Technical Skills
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Mobile development with React Native and TypeScript
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      State management, navigation, and API integration
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Version control with Git and collaborative workflows
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Testing, debugging, and production deployment
                    </li>
                  </ul>
                </dd>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-col border-l-4 border-primary-500 pl-6">
                <dt className="text-xl font-semibold text-navy-500 mb-4">
                  Professional Experience
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Product planning and agile development practices
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Cross-functional team collaboration and communication
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Code reviews, feedback, and quality assurance
                    </li>
                    <li className="flex items-start gap-x-2">
                      <svg
                        className="h-6 w-6 flex-none text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Project management and sprint planning
                    </li>
                  </ul>
                </dd>
              </div>
            </ScrollReveal>
          </dl>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden bg-navy-500 py-16 sm:py-24">
        <GlowOrb color="orange" size={400} className="-top-20 -left-20" />
        <GlowOrb color="orange" size={300} className="-bottom-20 -right-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to join the community?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Start building real mobile apps with our community of
                developers, designers, and product managers.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/missions"
                  className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
                >
                  Explore Missions
                </Link>
                <Link
                  href="/tutorials"
                  className="text-base font-semibold leading-7 text-white hover:text-primary-300 transition-colors"
                >
                  Start Learning <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
