'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/outline'

const navigation = [
  {
    section: 'Fundamentals and Setup',
    chapters: [
      { title: 'Introduction to Mobile Development', href: '/tutorials/react-native-fundamentals/introduction' },
      { title: 'Setting Up Your Development Environment', href: '/tutorials/react-native-fundamentals/setup' },
      { title: 'Your First React Native App', href: '/tutorials/react-native-fundamentals/first-app' },
    ]
  },
  {
    section: "Core Concepts",
    chapters: [
      { title: "JavaScript/TypeScript Fundamentals", href: "/tutorials/react-native-fundamentals/js-ts-fundamentals" },
      { title: "React Native Components", href: "/tutorials/react-native-fundamentals/components" },
      { title: "Styling and Layout", href: "/tutorials/react-native-fundamentals/styling" },
    ]
  },
  {
    section: "User Interface",
    chapters: [
      { title: "Advanced User Interface", href: "/tutorials/react-native-fundamentals/advanced-ui" },
      { title: "Navigation and Routing", href: "/tutorials/react-native-fundamentals/navigation" },
      { title: "Forms and User Input", href: "/tutorials/react-native-fundamentals/forms" },
    ]
  },
  {
    section: "Data Management",
    chapters: [
      { title: "State Management", href: "/tutorials/react-native-fundamentals/state" },
      { title: "API Integration", href: "/tutorials/react-native-fundamentals/api" },
      { title: "Data Persistence", href: "/tutorials/react-native-fundamentals/persistence" },
    ]
  },
  {
    section: "Testing and Quality",
    chapters: [
      { title: "Testing and Debugging", href: "/tutorials/react-native-fundamentals/testing" },
      { title: "Performance Optimization", href: "/tutorials/react-native-fundamentals/performance" },
      { title: "Code Quality and Best Practices", href: "/tutorials/react-native-fundamentals/code-quality" },
    ]
  },
  {
    section: "Platform Integration",
    chapters: [
      { title: "Native Modules", href: "/tutorials/react-native-fundamentals/native-modules" },
      { title: "Device Features", href: "/tutorials/react-native-fundamentals/device-features" },
      { title: "Platform Specific Features", href: "/tutorials/react-native-fundamentals/platform-features" },
    ]
  },
  {
    section: "Deployment and Production",
    chapters: [
      { title: "App Security", href: "/tutorials/react-native-fundamentals/security" },
      { title: "Build and Release", href: "/tutorials/react-native-fundamentals/build-release" },
      { title: "Production Considerations", href: "/tutorials/react-native-fundamentals/production" },
    ]
  },
  {
    section: "Advanced Topics",
    chapters: [
      { title: "Internationalization", href: "/tutorials/react-native-fundamentals/i18n" },
      { title: "Accessibility", href: "/tutorials/react-native-fundamentals/accessibility" },
      { title: "Architecture Patterns", href: "/tutorials/react-native-fundamentals/architecture" },
    ]
  },
]

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900">
            React Native Fundamentals
          </h1>
          <div className="w-10" /> {/* Spacer to center the title */}
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <aside className={`
          fixed top-14 left-0 
          w-64 h-[calc(100vh-3.5rem)]
          bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto
          z-40
        `}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Tutorial Contents</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-4rem)] p-6">
            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.section}>
                  <h2 className="font-semibold text-gray-900 mb-4">{section.section}</h2>
                  <ul className="space-y-3">
                    {section.chapters.map((chapter) => (
                      <li key={chapter.href}>
                        <Link
                          href={chapter.href}
                          className={`text-sm transition-colors duration-200 block ${
                            isActive(chapter.href)
                              ? 'text-[#FF6B2B] font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setIsSidebarOpen(false)
                            }
                          }}
                        >
                          {chapter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-white min-h-[calc(100vh-3.5rem)] w-full">
          {children}
        </main>
      </div>
    </div>
  )
} 