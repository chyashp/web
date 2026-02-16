// This is a server component
import { getAllMissions } from '@/lib/missions'
import MissionCard from './MissionCard'
import Link from 'next/link'

export default async function FeaturedMissions() {
  const allMissions = await getAllMissions()
  const featuredMissions = allMissions
    .filter(mission => mission.status === 'Recruiting')
    .slice(0, 6) // Allow up to 6 missions to show 2 rows of 3

  if (featuredMissions.length === 0) {
    return null
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#1a365d' }}>
            featured missions
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            join our latest product teams and build something amazing
          </p>
        </div>
        <div className="mt-12">
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 320px))',
            gap: '1.5rem',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1024px',
            margin: '0 auto'
          }}>
            {featuredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} variant="compact" />
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/missions"
            className="text-sm font-semibold leading-6 text-[#FF6B2B] hover:text-orange-600"
          >
            view all missions <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 