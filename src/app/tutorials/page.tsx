'use client'

import Link from 'next/link'
import { BookOpenIcon, CodeBracketIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

const tutorialSeries = [
  {
    title: 'react native fundamentals',
    description: 'a comprehensive guide to mobile development with react native. perfect for web developers transitioning to mobile.',
    chapters: 20,
    duration: '10-12 hours',
    level: 'beginner',
    icon: DevicePhoneMobileIcon,
    href: '/tutorials/react-native-fundamentals/introduction',
    tags: ['react native', 'mobile', 'typescript']
  },
  // More series to be added
]

export default function Tutorials() {
  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: '#1a365d' }}>
            learn mobile development
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            comprehensive tutorials to help you master mobile development. from beginner fundamentals to advanced topics.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tutorialSeries.map((series) => (
            <div
              key={series.title}
              className="flex flex-col bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-x-4">
                  <series.icon className="h-6 w-6" style={{ color: '#FF6B2B' }} />
                  <span className="text-sm font-medium" style={{ color: '#1a365d' }}>
                    {series.level}
                  </span>
                  <span className="text-sm text-gray-500">
                    {series.duration}
                  </span>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold" style={{ color: '#1a365d' }}>
                    {series.title}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {series.description}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-x-2 text-sm text-gray-500">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>{series.chapters} chapters</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {series.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto p-6 pt-0">
                <Link
                  href={series.href}
                  className="inline-flex items-center gap-x-2 rounded-lg bg-[#1a365d] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1a365d]/90 transition-colors"
                >
                  start learning
                  <CodeBracketIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 