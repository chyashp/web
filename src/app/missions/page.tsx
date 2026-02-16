import { getAllMissions } from '@/lib/missions'
import MissionCard from '@/components/MissionCard'

export default async function MissionsPage() {
  const missions = await getAllMissions()

  return (
    <main className="flex-1 py-20">
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: '#1a365d' }}>
              upcoming missions
            </h1>
            <div className="mt-6 mx-auto max-w-2xl">
              <p className="text-xl font-semibold leading-7" style={{ color: '#FF6B2B' }}>
                join our next product team
              </p>
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="mx-auto max-w-7xl pb-20">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}