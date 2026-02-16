'use client'

import { useState } from 'react'
import Link from 'next/link'
import SignUpModal from '@/components/SignUpModal'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <>
      {children}
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              ready to start building real apps with a team of passionate developers? join nanushi today and level up your mobile development skills.
            </p>
            <div className="mt-6 flex justify-center gap-x-4">
              <button
                onClick={() => setIsSignUpOpen(true)}
                className="rounded-full px-6 py-3 text-lg font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#FF6B2B' }}
              >
                create free account
              </button>
              <Link
                href="/how-it-works"
                className="rounded-full px-6 py-3 text-lg font-semibold text-[#1a365d] hover:bg-gray-50 transition-colors inline-flex items-center gap-x-2"
              >
                learn more
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        initialMode="signup"
      />
    </>
  )
} 