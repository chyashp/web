'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

interface ApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  missionId: string
  email?: string
}

export default function ApplicationForm({ isOpen, onClose, missionId }: ApplicationFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: user?.email || '',
    githubProfile: '',
    
    // Experience
    yearsOfExperience: '',
    recentProject: '',
    
    // Availability & Commitment
    weeklyCommitment: '',
    preferredWorkingHours: '',
    timezone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/missions/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          missionId,
          application: formData,
          isGuest: true
        }),
      })

      const data = await response.json()
      if (data.success) {
        setShowSuccess(true)
        setTimeout(() => {
          onClose()
          setShowSuccess(false)
        }, 2000)
      } else {
        setError(data.error || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setError('An error occurred while submitting your application')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-6 pb-6 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8">
                {showSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="rounded-full bg-green-100 p-4 mb-6 transform scale-125 animate-bounce">
                      <CheckIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">
                      application submitted successfully!
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      we&apos;ll review your application and get back to you soon
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {error && (
                      <div className="mb-4 p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div>
                      <Dialog.Title 
                        as="h3" 
                        className="text-2xl font-bold tracking-tight"
                        style={{ color: '#1a365d' }}
                      >
                        mission application
                      </Dialog.Title>
                      <p className="mt-2 text-gray-600">
                        please fill out the following details to apply for this mission
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      {/* Personal Info */}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            full name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="githubProfile" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            github profile url
                          </label>
                          <input
                            type="url"
                            id="githubProfile"
                            value={formData.githubProfile}
                            onChange={(e) => setFormData({ ...formData, githubProfile: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            placeholder="https://github.com/yourusername"
                            required
                          />
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="yearsOfExperience" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            years of mobile development experience
                          </label>
                          <select
                            id="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            required
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-2">1-2 years</option>
                            <option value="2-4">2-4 years</option>
                            <option value="4+">4+ years</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="recentProject" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            link to your most recent mobile app project
                          </label>
                          <input
                            type="url"
                            id="recentProject"
                            value={formData.recentProject}
                            onChange={(e) => setFormData({ ...formData, recentProject: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            placeholder="GitHub repository or App Store link"
                            required
                          />
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="weeklyCommitment" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            weekly time commitment
                          </label>
                          <select
                            id="weeklyCommitment"
                            value={formData.weeklyCommitment}
                            onChange={(e) => setFormData({ ...formData, weeklyCommitment: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            required
                          >
                            <option value="">Select hours per week</option>
                            <option value="1-5">1-5 hours</option>
                            <option value="5-10">5-10 hours</option>
                            <option value="10-15">10-15 hours</option>
                            <option value="15-20">15-20 hours</option>
                            <option value="20+">20+ hours</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium" style={{ color: '#1a365d' }}>
                            your timezone
                          </label>
                          <select
                            id="timezone"
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                            required
                          >
                            <option value="">Select your timezone</option>
                            <option value="UTC-12">UTC-12</option>
                            <option value="UTC-11">UTC-11</option>
                            <option value="UTC-10">UTC-10</option>
                            <option value="UTC-9">UTC-9</option>
                            <option value="UTC-8">UTC-8 (PST)</option>
                            <option value="UTC-7">UTC-7 (MST)</option>
                            <option value="UTC-6">UTC-6 (CST)</option>
                            <option value="UTC-5">UTC-5 (EST)</option>
                            <option value="UTC-4">UTC-4</option>
                            <option value="UTC-3">UTC-3</option>
                            <option value="UTC-2">UTC-2</option>
                            <option value="UTC-1">UTC-1</option>
                            <option value="UTC+0">UTC+0</option>
                            <option value="UTC+1">UTC+1 (CET)</option>
                            <option value="UTC+2">UTC+2</option>
                            <option value="UTC+3">UTC+3</option>
                            <option value="UTC+4">UTC+4</option>
                            <option value="UTC+5">UTC+5</option>
                            <option value="UTC+6">UTC+6</option>
                            <option value="UTC+7">UTC+7</option>
                            <option value="UTC+8">UTC+8</option>
                            <option value="UTC+9">UTC+9 (JST)</option>
                            <option value="UTC+10">UTC+10</option>
                            <option value="UTC+11">UTC+11</option>
                            <option value="UTC+12">UTC+12</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          type="button"
                          onClick={onClose}
                          className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                          cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-full px-6 py-2 text-sm font-medium text-white disabled:opacity-50"
                          style={{ backgroundColor: '#FF6B2B' }}
                        >
                          {isSubmitting ? 'submitting...' : 'submit application'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 