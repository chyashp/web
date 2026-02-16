'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mission } from '@/lib/types'
import SignUpModal from '@/components/SignUpModal'
import ApplicationForm from '@/components/ApplicationForm'
import { useAuth } from '@/contexts/AuthContext'

interface MissionCardProps {
  mission: Mission
  variant?: 'default' | 'compact'
}

export default function MissionCard({ mission, variant = 'default' }: MissionCardProps) {
  const isCompact = variant === 'compact'
  const { user } = useAuth()
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the Link navigation
    if (!user) {
      setIsSignUpOpen(true)
    } else {
      setIsApplicationOpen(true)
    }
  }

  return (
    <>
      <Link 
        href={`/missions/${mission.id}`}
        className={`
          group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col h-full
          ${isCompact ? 'text-sm' : ''}
        `}
      >
        <div className={`flex flex-col flex-1 ${isCompact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
          {/* Status Badge */}
          <span className={`
            inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium self-start
            ${mission.status === 'Recruiting' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'}
          `}>
            {mission.status.toLowerCase()}
          </span>

          {/* Title and Description */}
          <h3 className={`
            mt-4 font-bold group-hover:text-[#FF6B2B] transition-colors duration-200
            ${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}
          `} 
          style={{ color: '#1a365d' }}
          >
            {mission.title.toLowerCase()}
          </h3>
          <p className={`
            mt-3 text-gray-600 line-clamp-3
            ${isCompact ? 'text-sm' : 'text-base sm:text-lg'}
          `}>
            {mission.description.toLowerCase()}
          </p>

          {/* Tech Stack */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-1.5">
              {mission.techstack.slice(0, isCompact ? 3 : undefined).map((tech) => (
                <span
                  key={tech}
                  className={`
                    inline-flex items-center rounded-full bg-gray-100 text-gray-800
                    ${isCompact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs font-medium'}
                  `}
                >
                  {tech.toLowerCase()}
                </span>
              ))}
              {isCompact && mission.techstack.length > 3 && (
                <span className="text-xs text-gray-500">+{mission.techstack.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Mission Info */}
          <div className={`mt-4 grid grid-cols-2 gap-4 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            <div>
              <span className="block font-medium text-gray-500">duration</span>
              <span className="mt-0.5 block text-gray-900">{mission.duration.toLowerCase()}</span>
            </div>
            <div>
              <span className="block font-medium text-gray-500">team size</span>
              <span className="mt-0.5 block text-gray-900">{mission.teamsize} developers</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`mt-4 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            <div className="flex justify-between text-gray-500">
              <span>{mission.spots.filled} of {mission.spots.total} spots filled</span>
              <span>{mission.spots.total - mission.spots.filled} remaining</span>
            </div>
            <div className="mt-1.5 relative">
              <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${(mission.spots.filled / mission.spots.total) * 100}%` }}
                  className="bg-[#FF6B2B] rounded"
                />
              </div>
            </div>
          </div>

          {/* Apply Button */}
          {mission.status === 'Recruiting' && (
            <button
              onClick={handleApplyClick}
              className="mt-6 w-full rounded-full bg-[#FF6B2B] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              apply for mission
            </button>
          )}
        </div>
      </Link>

      {/* Modals */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        initialMode="signup"
      />
      
      <ApplicationForm 
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        missionId={mission.id}
      />
    </>
  )
} 