'use client'

export default function TermsOfService() {
  return (
    <main className="relative pt-20">
      <div className="relative">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8" style={{ color: '#1a365d' }}>
            terms of service
          </h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-8">
              last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>1. acceptance of terms</h2>
              <p className="text-gray-600 mb-4">
                by accessing or using nanushi (&quot;platform&quot;), you agree to be bound by these terms of service. if you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>2. eligibility</h2>
              <p className="text-gray-600 mb-4">
                you must be at least 13 years old to use our platform. if you are under 18, you represent that you have your parent or guardian&apos;s permission to use the platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>3. user accounts</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>you are responsible for maintaining the confidentiality of your account credentials</li>
                <li>you agree to provide accurate and complete information when creating an account</li>
                <li>you are solely responsible for all activities that occur under your account</li>
                <li>you must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>4. platform rules</h2>
              <p className="text-gray-600 mb-4">you agree not to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>violate any applicable laws or regulations</li>
                <li>impersonate others or provide false information</li>
                <li>interfere with or disrupt the platform&apos;s operation</li>
                <li>engage in harassment or abusive behavior</li>
                <li>share inappropriate or harmful content</li>
                <li>attempt to gain unauthorized access to the platform</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>5. intellectual property</h2>
              <p className="text-gray-600 mb-4">
                all content and materials available on the platform, including but not limited to text, graphics, logos, images, and software, are the property of nanushi or its licensors and are protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>6. user content</h2>
              <p className="text-gray-600 mb-4">
                by submitting content to the platform, you grant us a worldwide, non-exclusive, royalty-free license to use, modify, and distribute your content for the purpose of operating and improving the platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>7. termination</h2>
              <p className="text-gray-600 mb-4">
                we reserve the right to suspend or terminate your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>8. disclaimer of warranties</h2>
              <p className="text-gray-600 mb-4">
                the platform is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. we do not warrant that the platform will be uninterrupted or error-free.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>9. limitation of liability</h2>
              <p className="text-gray-600 mb-4">
                to the maximum extent permitted by law, nanushi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>10. changes to terms</h2>
              <p className="text-gray-600 mb-4">
                we reserve the right to modify these terms at any time. we will notify users of any material changes by posting the new terms on the platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a365d' }}>11. contact information</h2>
              <p className="text-gray-600">
                for questions about these terms, please contact us at{' '}
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