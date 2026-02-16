'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ApplicationForm from './ApplicationForm'
import SignUpModal from './SignUpModal'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface ApplyButtonProps {
  missionId: string
  status: string
}

export default function ApplyButton({ missionId, status }: ApplyButtonProps) {
  const { user } = useAuth()
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup')

  const handleApplyClick = () => {
    if (user) {
      setIsApplicationOpen(true)
    } else {
      setIsOptionModalOpen(true)
    }
  }

  const handleGuestContinue = () => {
    setIsOptionModalOpen(false)
    setIsApplicationOpen(true)
  }

  const handleSignUpClick = () => {
    setAuthMode('signup')
    setIsOptionModalOpen(false)
    setIsSignUpOpen(true)
  }

  const handleSignInClick = () => {
    setAuthMode('signin')
    setIsOptionModalOpen(false)
    setIsSignUpOpen(true)
  }

  return (
    <>
      {status === 'Recruiting' && (
        <button
          onClick={handleApplyClick}
          className="w-full rounded-full bg-[#FF6B2B] text-white px-6 py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          apply for mission
        </button>
      )}

      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        initialMode={authMode}
        onSuccess={() => setIsApplicationOpen(true)}
      />

      <ApplicationForm 
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        missionId={missionId}
        email={user?.email}
      />

      {/* Options Modal */}
      <Dialog
        open={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gradient-to-b from-white to-orange-50/50 backdrop-blur-sm px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[95%] max-w-md mx-auto sm:my-8 sm:w-full sm:p-8">
                <div>
                  <Dialog.Title 
                    as="h3" 
                    className="text-2xl font-bold tracking-tight text-center"
                    style={{ color: '#1a365d' }}
                  >
                    how would you like to continue?
                  </Dialog.Title>
                  <p className="mt-2 text-center text-gray-600">
                    choose how you&apos;d like to apply for this mission
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleSignUpClick}
                    className="w-full rounded-full bg-[#FF6B2B] text-white px-6 py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    create an account
                  </button>
                  
                  <button
                    onClick={handleSignInClick}
                    className="w-full rounded-full border-2 border-[#FF6B2B] text-[#FF6B2B] px-6 py-3 text-lg font-semibold hover:bg-orange-50 transition-colors"
                  >
                    sign in
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-600">or</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGuestContinue}
                    className="w-full rounded-full bg-gray-100 text-gray-700 px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    continue as guest
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </>
  )
} 