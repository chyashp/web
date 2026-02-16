import { UserGroupIcon, ClipboardDocumentCheckIcon, CodeBracketIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

const steps = [
  {
    name: 'join the community',
    description: 'sign up and become part of our growing community of mobile developers.',
    icon: UserGroupIcon,
  },
  {
    name: 'accept a mission',
    description: 'join a 6-week mission with a dedicated team to build a production-ready mobile app.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'collaborate & build',
    description: 'work with your mission team through planning, development, and launch phases.',
    icon: CodeBracketIcon,
  },
  {
    name: 'showcase & grow',
    description: 'present your completed mission, add it to your portfolio, and advance your career.',
    icon: PresentationChartBarIcon,
  },
]

const missionPhases = [
  {
    name: 'Phase 1: Briefing',
    description: 'Meet your mission team, choose your objective, and plan your development strategy. Set up your tech stack and project infrastructure.',
    duration: 'Week 1-2',
  },
  {
    name: 'Phase 2: Development',
    description: 'Execute your mission with daily standups, code reviews, and weekly team sync-ups. Master mobile development through real-world challenges.',
    duration: 'Week 3-5',
  },
  {
    name: 'Phase 3: Launch',
    description: 'Complete your mission by launching your app, preparing documentation, and showcasing your achievement to the community.',
    duration: 'Week 6',
  },
]

export default function HowItWorks() {
  return (
    <main className="relative pt-20">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: '#1a365d' }}>
              how it works
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              join our community and embark on mobile development missions through hands-on experience and team collaboration.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
            <div className="grid gap-12 lg:grid-cols-2">
              {steps.map((step) => (
                <div key={step.name} className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" 
                      style={{ 
                        backgroundColor: 'rgba(255, 107, 43, 0.1)',
                        borderColor: 'rgba(255, 107, 43, 0.2)'
                      }}>
                      <step.icon className="h-6 w-6" style={{ color: '#FF6B2B' }} aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: '#FF6B2B' }}>{step.name}</h2>
                  </div>
                  <p className="mt-4 text-lg text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 lg:mt-24">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#FF6B2B' }}>mission structure</h2>
              <div className="mt-8 space-y-8">
                {missionPhases.map((phase) => (
                  <div key={phase.name}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold" style={{ color: '#1a365d' }}>{phase.name}</h3>
                      <span className="text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 lg:mt-24">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#FF6B2B' }}>what you&apos;ll achieve</h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#1a365d' }}>technical mastery</h3>
                  <p className="mt-2 text-gray-600">
                    build production-grade mobile applications using modern frameworks and best practices. master the tools and workflows used in professional development.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#1a365d' }}>team collaboration</h3>
                  <p className="mt-2 text-gray-600">
                    work effectively in remote teams using industry-standard tools. participate in code reviews, daily standups, and team planning sessions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#1a365d' }}>career growth</h3>
                  <p className="mt-2 text-gray-600">
                    build a portfolio of completed missions, gain real-world experience, and develop the skills employers are looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 