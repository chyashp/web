'use client'

import { CodeBracketIcon, UserGroupIcon, RocketLaunchIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const features = [
  {
    name: 'real-world projects',
    description: 'work on production-grade mobile applications in teams, building a strong portfolio of react native projects.',
    icon: CodeBracketIcon,
  },
  {
    name: 'global community',
    description: 'connect with mobile developers worldwide, share knowledge, and grow together in a supportive environment.',
    icon: UserGroupIcon,
  },
  {
    name: 'career growth',
    description: 'accelerate your career through hands-on experience, mentorship, and networking opportunities.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'structured learning',
    description: 'follow a proven path from beginner to advanced mobile development through collaborative projects.',
    icon: AcademicCapIcon,
  },
]

export default function Features() {
  return (
    <div className="pt-4 pb-12 sm:pt-6 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7" style={{ color: '#FF6B2B' }}>
            accelerate your growth
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#1a365d' }}>
            everything you need to become a successful mobile apps developer
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            join nanushi to gain practical experience, build a strong portfolio, and connect with other passionate mobile developers.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg p-3 ring-1" 
                  style={{ 
                    backgroundColor: 'rgba(255, 107, 43, 0.1)',
                    borderColor: 'rgba(255, 107, 43, 0.2)'
                  }}>
                  <feature.icon className="h-8 w-8" style={{ color: '#FF6B2B' }} aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold" style={{ color: '#1a365d' }}>{feature.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 