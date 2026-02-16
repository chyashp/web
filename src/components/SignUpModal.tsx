'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from '@/contexts/AuthContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

type SignUpModalProps = {
  isOpen: boolean
  onClose: () => void
  prefilledEmail?: string
  initialMode?: 'signup' | 'signin'
  onSuccess?: () => void
}

export default function SignUpModal({ isOpen, onClose, prefilledEmail = '', initialMode = 'signup', onSuccess }: SignUpModalProps) {
  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode)
  const { signUp, signIn } = useAuth()

  useEffect(() => {
    setEmail(prefilledEmail)
  }, [prefilledEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        await signUp(email, password)
        
        // Send welcome email
        await fetch('/api/auth/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        // Show success message in the green notification style
        setError('Welcome to nanushi! You can now sign in to your account.')
      } else {
        await signIn(email, password)
        if (onSuccess) {
          onSuccess()  // Call onSuccess after successful sign in
        }
        onClose()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Failed to ${mode === 'signup' ? 'create account' : 'sign in'}`)
    } finally {
      setLoading(false)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gradient-to-b from-white to-orange-50/50 backdrop-blur-sm px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[95%] max-w-md mx-auto sm:my-8 sm:w-full sm:p-8">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <Dialog.Title 
                    as="h2" 
                    className="text-center text-3xl font-bold tracking-tight mb-4"
                    style={{ color: '#1a365d' }}
                  >
                    {mode === 'signup' ? 'start your journey' : 'welcome back'}
                  </Dialog.Title>
                  <p className="text-center text-lg leading-8 text-gray-600 mb-8">
                    {mode === 'signup' ? (
                      <>
                        already have an account?{' '}
                        <button
                          onClick={() => setMode('signin')}
                          className="font-semibold hover:opacity-80 transition-opacity"
                          style={{ color: '#FF6B2B' }}
                        >
                          sign in
                        </button>
                      </>
                    ) : (
                      <>
                        don&apos;t have an account?{' '}
                        <button
                          onClick={() => setMode('signup')}
                          className="font-semibold hover:opacity-80 transition-opacity"
                          style={{ color: '#FF6B2B' }}
                        >
                          join the community
                        </button>
                      </>
                    )}
                  </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email-address" className="block text-sm font-semibold mb-1.5" style={{ color: '#1a365d' }}>
                        email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-xl px-4 py-2.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow sm:text-sm"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold mb-1.5" style={{ color: '#1a365d' }}>
                        password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        required
                        className="block w-full rounded-xl px-4 py-2.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow sm:text-sm"
                        placeholder={mode === 'signup' ? 'create a password' : 'enter your password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className={`rounded-xl p-4 border ${
                      error.includes('Welcome to nanushi') 
                        ? 'bg-green-50 border-green-100' 
                        : 'bg-orange-50 border-orange-100'
                    }`}>
                      <div className="flex">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium" style={{ 
                            color: error.includes('Welcome to nanushi') 
                              ? '#15803d'  // text-green-700
                              : '#991B1B'  // text-red-700
                          }}>
                            {error}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-3 px-6 rounded-full text-white text-lg font-semibold shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                      style={{ 
                        backgroundColor: '#FF6B2B',
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? (mode === 'signup' ? 'creating account...' : 'signing in...') : (mode === 'signup' ? 'join the community' : 'sign in')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 