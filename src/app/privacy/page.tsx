'use client'

export default function PrivacyPolicy() {
  return (
    <main className="relative pt-20">
      <div className="relative">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8" style={{ color: '#1a365d' }}>
            privacy policy
          </h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-8">
              last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>1. introduction</h2>
              <p className="text-gray-600 mb-4">
                welcome to nanushi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). we respect your privacy and are committed to protecting your personal data. this privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>2. information we collect</h2>
              <p className="text-gray-600 mb-4">we collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>name and contact information</li>
                <li>account credentials</li>
                <li>profile information</li>
                <li>communication preferences</li>
                <li>project participation data</li>
                <li>learning progress and achievements</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>3. how we use your information</h2>
              <p className="text-gray-600 mb-4">we use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>provide and maintain our services</li>
                <li>match you with appropriate projects and teams</li>
                <li>track your learning progress</li>
                <li>communicate with you about our services</li>
                <li>improve our platform and user experience</li>
                <li>ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>4. information sharing</h2>
              <p className="text-gray-600 mb-4">
                we do not sell your personal information. we may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>team members and project collaborators</li>
                <li>service providers who assist in platform operations</li>
                <li>when required by law or to protect rights</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>5. data security</h2>
              <p className="text-gray-600 mb-4">
                we implement appropriate security measures to protect your personal information. however, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>6. your rights</h2>
              <p className="text-gray-600 mb-4">you have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>access your personal information</li>
                <li>correct inaccurate information</li>
                <li>request deletion of your information</li>
                <li>opt-out of marketing communications</li>
                <li>withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>7. cookies and tracking</h2>
              <p className="text-gray-600 mb-4">
                we use cookies and similar tracking technologies to improve your experience on our platform. you can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>8. changes to this policy</h2>
              <p className="text-gray-600 mb-4">
                we may update this privacy policy from time to time. we will notify you of any changes by posting the new policy on this page and updating the &quot;last updated&quot; date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>9. contact us</h2>
              <p className="text-gray-600">
                if you have questions about this privacy policy, please contact us at{' '}
                <a href="mailto:hello@nanushi.org" className="text-[#FF6B2B] hover:opacity-80">
                  hello@nanushi.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 