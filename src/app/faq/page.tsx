'use client'

import { useState } from 'react'
import ContactModal from '@/components/ContactModal'

const faqs = [
  {
    question: 'what is a nanushi mission?',
    answer: 'a nanushi mission is a 6-week structured program where you work with a team to build a production-ready mobile application. each mission has three phases: briefing (planning), development (building), and launch (deployment and presentation).',
  },
  {
    question: 'how often do new missions start?',
    answer: 'we launch new missions every quarter, with multiple teams starting simultaneously. this allows for cross-team collaboration and a vibrant community of developers working on different challenges.',
  },
  {
    question: 'what experience level do i need to join a mission?',
    answer: 'we welcome developers of all skill levels! missions are available for beginners, intermediate, and advanced developers. you\'ll be matched with a team of similar skill level to ensure everyone can contribute and grow.',
  },
  {
    question: 'how much time do i need to commit to a mission?',
    answer: 'missions require 10-15 hours per week, including team meetings, coding sessions, and individual work. this includes daily standups (15-30 mins), code reviews, and weekly team sync-ups.',
  },
  {
    question: 'what happens during each mission phase?',
    answer: 'phase 1 (briefing) involves team formation, project planning, and setup. phase 2 (development) focuses on building the app with regular code reviews and mentorship. phase 3 (launch) includes final testing, documentation, and presenting your work.',
  },
  {
    question: 'is there a cost to join missions?',
    answer: 'no, participating in nanushi missions is completely free! we believe in making mobile development education and experience accessible to everyone.',
  },
  {
    question: 'what support is provided during missions?',
    answer: 'each mission team has access to technical mentors, code reviews, architecture guidance, and career advice. we also provide project management tools and regular feedback to help you succeed.',
  },
  {
    question: 'can i add mission projects to my portfolio?',
    answer: 'absolutely! all mission projects can be included in your portfolio. you\'ll receive proper credit for your work and can showcase both the technical implementation and collaborative aspects of your contributions.',
  },
  {
    question: 'how do i join a mission?',
    answer: 'click the "accept mission" button on our missions page to view upcoming missions and apply. we\'ll help match you with a suitable team based on your experience level and interests.',
  },
  {
    question: 'what technologies do missions use?',
    answer: 'missions primarily focus on mobile development with react native and flutter. depending on the mission objectives, you might also work with typescript, node.js, graphql, and various backend technologies.',
  },
]

export default function FAQ() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <main className="relative pt-20">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: '#1a365d' }}>
              frequently asked questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              find answers to common questions about joining and participating in nanushi missions.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
            <dl className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="group">
                  <dt className="text-xl font-semibold" style={{ color: '#FF6B2B' }}>{faq.question}</dt>
                  <dd className="mt-4 text-base text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 text-center">
              <p className="text-base text-gray-600">
                still have questions? feel free to{' '}
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: '#FF6B2B' }}
                >
                  reach out to us
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  )
} 