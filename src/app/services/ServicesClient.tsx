'use client'

import { useState } from 'react'
import ContactModal from '@/components/ContactModal'
import ScrollReveal from '@/components/ScrollReveal'
import { ServicesIllustration } from '@/components/illustrations'
import { GradientBlob } from '@/components/decorations'
import {
  SparklesIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  BeakerIcon,
  CircleStackIcon,
  CloudIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: CodeBracketIcon,
    description: 'Full-stack web applications built with modern frameworks for speed, scalability, and exceptional user experience.',
    features: [
      'SaaS platforms and web applications',
      'E-commerce and marketplace solutions',
      'Content management systems',
      'Progressive web apps (PWAs)',
      'API development and integrations',
      'Real-time collaboration tools',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    useCases: [
      'Customer portals and dashboards',
      'Online marketplaces and booking platforms',
      'Internal business tools and admin panels',
      'Marketing websites with CMS integration',
    ],
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    icon: DevicePhoneMobileIcon,
    description: 'Cross-platform mobile apps that deliver native experiences on both iOS and Android with a single codebase.',
    features: [
      'Cross-platform development with React Native',
      'Native iOS and Android apps',
      'Mobile-first UI/UX design',
      'Offline-first architecture',
      'Push notifications and real-time updates',
      'App store deployment and maintenance',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux', 'Native modules'],
    useCases: [
      'Consumer mobile apps and marketplaces',
      'Field service and workforce management',
      'Health and fitness tracking apps',
      'Social networking and communication',
    ],
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    icon: Cog6ToothIcon,
    description: 'Bespoke solutions designed specifically for your unique business requirements and workflows.',
    features: [
      'Custom business logic and workflows',
      'Legacy system modernization',
      'Third-party integrations',
      'Data migration and ETL pipelines',
      'Microservices architecture',
      'Cloud infrastructure and DevOps',
    ],
    technologies: ['Python', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    useCases: [
      'ERP and CRM customization',
      'Payment processing integrations',
      'Supply chain management systems',
      'Custom reporting and analytics',
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: SparklesIcon,
    description: 'Transform your business with intelligent automation and AI-powered solutions that learn and adapt.',
    features: [
      'Custom chatbots and conversational AI',
      'LLM integrations (GPT, Gemini, etc.)',
      'Intelligent process automation',
      'Natural language processing',
      'Predictive analytics and forecasting',
      'Computer vision and image recognition',
    ],
    technologies: ['OpenAI', 'Gemini', 'TensorFlow', 'PyTorch', 'Hugging Face', 'LangChain'],
    useCases: [
      'Customer support automation with AI chatbots',
      'Document processing and intelligent search',
      'Personalized recommendations and content',
      'Automated data analysis and insights',
    ],
  },
]

const additionalServices = [
  { name: 'API Development', icon: CircleStackIcon },
  { name: 'Cloud Infrastructure', icon: CloudIcon },
  { name: 'Data Analytics', icon: ChartBarIcon },
  { name: 'UI/UX Design', icon: BeakerIcon },
  { name: 'Conversational AI', icon: ChatBubbleLeftRightIcon },
  { name: 'IoT Solutions', icon: CpuChipIcon },
  { name: 'SEO & Marketing', icon: GlobeAltIcon },
  { name: 'E-commerce', icon: ShoppingCartIcon },
  { name: 'User Authentication', icon: UserCircleIcon },
  { name: 'Content Management', icon: DocumentTextIcon },
]

export default function ServicesClient() {
  const [isContactOpen, setIsContactOpen] = useState(false)

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
                What We Do
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-navy-500 sm:text-6xl">
                Our Services
              </h1>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary-500 to-orange-400" />
              <p className="mt-6 text-xl leading-8 text-navy-500/70">
                Comprehensive development services to bring your vision to life with cutting-edge technology and expert execution.
              </p>
            </div>
            <ScrollReveal delay={0.2} className="hidden lg:block">
              <ServicesIllustration className="w-full max-w-sm mx-auto" />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="space-y-0">
        {services.map((service, index) => (
          <div key={service.id} className={index % 2 === 1 ? 'bg-gradient-to-b from-orange-50/40 to-primary-50/25' : ''}>
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <ScrollReveal>
            <div id={service.id} className="relative">
              <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-x-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-500">
                      <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-navy-500">
                      {service.name}
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-gray-600 mb-8">
                    {service.description}
                  </p>

                  <h3 className="text-xl font-semibold text-navy-500 mb-4">What We Deliver</h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-x-3">
                        <svg className="h-6 w-6 flex-none text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-base text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-navy-500 mb-3 uppercase tracking-wider">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className={`rounded-2xl p-8 ${index % 2 === 1 ? 'bg-white shadow-sm ring-1 ring-gray-900/5' : 'bg-gradient-to-br from-primary-50 to-orange-50'}`}>
                    <h3 className="text-xl font-semibold text-navy-500 mb-6">Example Use Cases</h3>
                    <ul className="space-y-4">
                      {service.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-x-3">
                          <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                            {i + 1}
                          </span>
                          <span className="text-base text-gray-700">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-8 pt-8 border-t ${index % 2 === 1 ? 'border-gray-200' : 'border-primary-200'}`}>
                      <button
                        onClick={() => setIsContactOpen(true)}
                        className="w-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
                      >
                        Discuss This Service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
          </div>
        ))}
      </div>

      {/* Additional Capabilities */}
      <div className="bg-gradient-to-b from-orange-50/40 to-primary-50/25 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Additional Capabilities</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We offer a wide range of specialized services to complement your project needs.
            </p>
          </div>
          <ScrollReveal>
          <div className="mx-auto mt-16 grid max-w-lg gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-5 sm:grid-cols-3 grid-cols-2">
            {additionalServices.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center gap-y-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
              >
                <service.icon className="h-10 w-10 text-primary-500" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-navy-500 text-center">{service.name}</h3>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <GradientBlob color="orange" size={400} className="top-0 left-1/2 -translate-x-1/2" />
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-navy-500 to-primary-600 bg-clip-text text-transparent">Ready to get started?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Let&apos;s discuss your project requirements and how we can help you achieve your goals.
          </p>
          <div className="mt-10">
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
            >
              Contact Us Today
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  )
}
