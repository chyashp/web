"use client";

import Link from "next/link";
import {
  SparklesIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  LightBulbIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "@/components/ScrollReveal";
import { GradientBlob, DotGrid, GlowOrb } from "@/components/decorations";

const values = [
  {
    name: "Innovation First",
    description:
      "We embrace cutting-edge technologies and AI to build solutions that push boundaries and deliver exceptional results.",
    icon: SparklesIcon,
  },
  {
    name: "Client Success",
    description:
      "Your success is our success. We're committed to delivering solutions that drive real business value.",
    icon: RocketLaunchIcon,
  },
  {
    name: "Collaborative Partnership",
    description:
      "We work alongside our clients as true partners, maintaining transparency and open communication throughout.",
    icon: UserGroupIcon,
  },
  {
    name: "Excellence & Quality",
    description:
      "From code quality to user experience, we maintain the highest standards in everything we build.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Continuous Learning",
    description:
      "We stay ahead of the curve, constantly learning and evolving with the latest technologies and best practices.",
    icon: LightBulbIcon,
  },
  {
    name: "Community Impact",
    description:
      "Beyond client work, we're passionate about giving back through open-source contributions and developer education.",
    icon: HeartIcon,
  },
];

const team = [
  {
    title: "Expert Developers",
    description:
      "Our team brings years of experience in AI, web, and mobile development across diverse industries.",
  },
  {
    title: "Full-Stack Capabilities",
    description:
      "From frontend to backend, cloud infrastructure to mobile apps — we handle it all.",
  },
  {
    title: "Global Perspective",
    description:
      "A distributed team with international experience brings diverse insights to every project.",
  },
];

export default function AboutClient() {
  return (
    <main className="relative pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <GradientBlob color="orange" size={500} className="-top-20 -right-20" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-navy-500 sm:text-6xl">
              About nanushi
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re an AI & web development company building intelligent
              digital solutions for modern businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Story */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-500">
                  Our Mission
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  To empower businesses with intelligent, scalable software
                  solutions that drive growth and transform how they operate.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  We combine cutting-edge AI technology with proven development
                  expertise to create custom solutions tailored to each
                  client&apos;s unique needs. From startups to established
                  enterprises, we help businesses leverage technology to achieve
                  their goals.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-500">
                  Who We Are
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  nanushi is a team of experienced developers, designers, and
                  engineers passionate about building exceptional software. We
                  specialize in AI integrations, full-stack web applications,
                  mobile development, and custom software solutions.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Our approach combines technical excellence with a deep
                  understanding of business needs. We don&apos;t just write code —
                  we solve problems, optimize workflows, and create tools that
                  make a real difference.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
        <DotGrid opacity={0.2} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-lg font-semibold leading-7 text-primary-500">
              Our Values
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
              What drives us
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These core principles guide everything we do, from how we work
              with clients to how we build software.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
              {values.map((value, index) => (
                <ScrollReveal key={value.name} delay={index * 0.1}>
                  <div className="flex flex-col bg-white p-8 rounded-xl shadow-sm">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-navy-500">
                      <value.icon
                        className="h-7 w-7 flex-none text-primary-500"
                        aria-hidden="true"
                      />
                      {value.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{value.description}</p>
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team/Expertise */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-7 text-primary-500">
            Our Team
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
            Experience that delivers
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A multidisciplinary team with deep expertise across the full
            software development spectrum.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {team.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.15}>
                <div className="relative pl-16">
                  <dt className="text-lg font-semibold leading-7 text-navy-500">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                      <svg
                        className="h-6 w-6 text-white"
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
                    </div>
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {item.description}
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </div>

      {/* Community Connection */}
      <div className="relative overflow-hidden bg-navy-500 py-16 sm:py-24">
        <GlowOrb color="orange" size={400} className="-top-20 -left-20" />
        <GlowOrb color="orange" size={300} className="-bottom-20 -right-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                nanushi Community
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Beyond client work, we&apos;re passionate about developer
                education. We run <strong>nanushi Community</strong> — a
                collaborative learning platform where aspiring mobile developers
                build real apps in product teams.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-300">
                Through 6-week missions, developers gain hands-on experience with
                React Native, work in cross-functional teams, and build
                portfolio-worthy projects. It&apos;s our way of giving back and
                helping the next generation of developers grow.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/community"
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-navy-500 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Learn About Our Community
                </Link>
                <Link
                  href="/missions"
                  className="text-base font-semibold leading-7 text-white hover:text-primary-300 transition-colors"
                >
                  Explore Missions <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <GradientBlob color="orange" size={400} className="top-0 left-1/2 -translate-x-1/2" />
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-500 sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Whether you need a custom AI solution, a modern web application, or
              a mobile app — we&apos;d love to hear about your project.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
              >
                View Our Services
              </Link>
              <Link
                href="/projects"
                className="text-base font-semibold leading-7 text-navy-500 hover:text-primary-500 transition-colors"
              >
                See Our Work <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
