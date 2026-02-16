import { getMissionById } from '@/lib/missions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MissionContent from '@/components/MissionContent'
import ApplyButton from '@/components/ApplyButton'

interface PageProps {
  params: Promise<{
    missionId: string
  }>
}

export default async function MissionDetailPage({ params }: PageProps) {
  const { missionId } = await params
  const mission = await getMissionById(missionId)

  if (!mission) {
    notFound()
  }

  return (
    <main className="flex-1 pt-20">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/missions"
              className="inline-flex items-center text-[#FF6B2B] hover:opacity-80"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to missions
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <span className={`
                  inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
                  ${mission.status === 'Recruiting' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'}
                `}>
                  {mission.status.toLowerCase()}
                </span>

                <h1 className="mt-4 text-4xl font-bold tracking-tight" style={{ color: '#1a365d' }}>
                  {mission.title.toLowerCase()}
                </h1>

                <p className="mt-6 text-xl leading-8 text-gray-600">
                  {mission.description.toLowerCase()}
                </p>

                <MissionContent mission={mission} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Mission Status */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-bold" style={{ color: '#1a365d' }}>
                  mission status
                </h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{mission.spots.filled} of {mission.spots.total} spots filled</span>
                      <span>{mission.spots.total - mission.spots.filled} remaining</span>
                    </div>
                    <div className="mt-2 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                        <div
                          style={{ width: `${(mission.spots.filled / mission.spots.total) * 100}%` }}
                          className="bg-[#FF6B2B] rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <ApplyButton missionId={mission.id} status={mission.status} />
                </div>
              </div>

              {/* Mission Details */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-bold" style={{ color: '#1a365d' }}>
                  mission details
                </h3>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">duration</dt>
                    <dd className="mt-1 text-sm text-gray-900">{mission.duration.toLowerCase()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">team size</dt>
                    <dd className="mt-1 text-sm text-gray-900">{mission.teamsize} developers</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">tech stack</dt>
                    <dd className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {mission.techstack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tech.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Add generateMetadata for better SEO
export async function generateMetadata({ params }: { params: Promise<{ missionId: string }> }) {
  const { missionId } = await params
  const mission = await getMissionById(missionId)

  if (!mission) {
    return {
      title: 'Mission Not Found - nanushi',
    }
  }

  return {
    title: `${mission.title} - nanushi`,
    description: mission.description,
  }
} 