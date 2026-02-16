'use client'

export default function WaitlistPage() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            join our next product team
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            experience building mobile apps in a complete product team. work with developers, designers, and product managers in a professional environment that mirrors real-world tech companies.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="mailto:hello@nanushi.org"
              className="rounded-full bg-gradient-to-r from-[#1a365d] to-[#2d4a7c] px-8 py-3 text-base font-semibold text-white shadow-lg hover:shadow-[#1a365d]/30 hover:scale-105 transition-all"
            >
              join the waitlist
            </a>
            <a href="/how-it-works" className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors">
              learn more <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            we&apos;ll notify you when the next mission is starting
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                complete product teams
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">work in cross-functional teams with developers, designers, product managers, and scrum masters to build production-ready mobile apps.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                professional workflow
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">experience real agile practices, design reviews, product planning, and development sprints while building your mobile app.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                career-ready skills
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">learn to collaborate effectively in product teams, communicate across disciplines, and ship production-quality features.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}