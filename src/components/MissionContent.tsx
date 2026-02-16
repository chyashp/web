'use client'

import { useState } from 'react'
import ApplicationForm from './ApplicationForm'
import SignUpModal from './SignUpModal'
import type { Mission } from '@/lib/types'

interface MissionContentProps {
  mission: Mission
}

export default function MissionContent({ mission }: MissionContentProps) {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <div className="mt-8">
      <div dangerouslySetInnerHTML={{ __html: mission.content }} />
      
      <ApplicationForm 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)}
        missionId={mission.id}
      />
      
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
      />
    </div>
  )
} 