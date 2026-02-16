'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'overview', href: '/tutorials' },
  { name: 'react native fundamentals', href: '/tutorials/react-native-fundamentals' },
  { name: 'advanced concepts', href: '/tutorials/advanced-concepts' },
  { name: 'resources', href: '/tutorials/resources' },
]

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold tracking-tight" style={{ color: '#FF6B2B' }}>nanushi.</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              style={{ color: '#1a365d' }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold leading-6 hover:text-primary-500"
                style={{ color: '#1a365d' }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user && (
              <Link
                href="/missions"
                className="text-base font-semibold leading-6 hover:text-primary-500"
                style={{ color: '#1a365d' }}
              >
                back to missions
              </Link>
            )}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold tracking-tight" style={{ color: '#FF6B2B' }}>nanushi.</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                style={{ color: '#1a365d' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                      style={{ color: '#1a365d' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {user && (
                  <div className="py-6">
                    <Link
                      href="/missions"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                      style={{ color: '#1a365d' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      back to missions
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Main content */}
      <div className="pt-20">
        {children}
      </div>
    </div>
  )
} 