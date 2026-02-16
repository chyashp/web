import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'
import { getChapterContent } from '@/lib/tutorials'

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 {...props} className="text-4xl font-bold mt-12 mb-6" style={{ color: '#1a365d' }}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#1a365d' }}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="text-xl font-semibold mt-8 mb-3" style={{ color: '#1a365d' }}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} className="text-lg font-semibold mt-6 mb-2" style={{ color: '#1a365d' }}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="mt-4 mb-6 text-lg leading-relaxed" style={{ color: '#1a365d99' }}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a 
      {...props}
      href={href} 
      className="font-medium border-b border-[#FF6B2B] hover:bg-[#FF6B2B15] transition-colors duration-200" 
      style={{ color: '#FF6B2B' }}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="mt-4 mb-6 ml-6 space-y-2 list-disc list-outside" style={{ color: '#1a365d99' }}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="text-lg leading-relaxed pl-2" style={{ color: '#1a365d99' }}>
      {children}
    </li>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <div className="my-4 sm:my-6 -mx-4 sm:mx-0 overflow-hidden">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={match[1]}
            style={tomorrow}
            PreTag="div"
            className="rounded-none sm:rounded-xl !bg-[#1a365d] !p-4 sm:!p-6 min-w-full text-sm sm:text-base"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    ) : (
      <code {...props} className="rounded bg-[#1a365d15] px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono text-sm" style={{ color: '#1a365d' }}>
        {children}
      </code>
    )
  }
}

const chapterFileMap: Record<string, string> = {
  'introduction': '01-introduction.md',
  'setup': '02-setup.md',
  'first-app': '03-first-app.md',
  'js-ts-fundamentals': '04-js-ts-fundamentals.md',
  'components': '05-components.md',
  'styling': '06-styling.md',
  'advanced-ui': '07-advanced-ui.md',
  'navigation': '08-navigation.md',
  'forms': '09-forms.md',
  'state': '10-state.md',
  'api': '11-api.md',
  'persistence': '12-persistence.md',
  'testing': '13-testing.md',
  'performance': '14-performance.md',
  'code-quality': '15-code-quality.md',
  'native-modules': '16-native-modules.md',
  'device-features': '17-device-features.md',
  'platform-features': '18-platform-features.md',
  'security': '19-security.md',
  'build-release': '20-build-release.md',
  'production': '21-production.md',
  'i18n': '22-i18n.md',
  'accessibility': '23-accessibility.md',
  'architecture': '24-architecture.md'
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fileName = chapterFileMap[slug];
  if (!fileName) {
    return {
      title: 'Not Found - React Native Fundamentals',
      description: 'The requested tutorial page could not be found.'
    }
  }

  const { frontmatter } = await getChapterContent('react-native-fundamentals', fileName);
  
  return {
    title: `${frontmatter.title} - React Native Fundamentals`,
    description: frontmatter.description,
    keywords: frontmatter.tags.join(', ')
  }
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const fileName = chapterFileMap[slug];
  if (!fileName) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold" style={{ color: '#1a365d' }}>Page Not Found</h1>
            <p className="mt-4 text-lg" style={{ color: '#1a365d99' }}>
              The tutorial page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const { content, frontmatter } = await getChapterContent('react-native-fundamentals', fileName);
  
  return (
    <main className="flex-1 w-full overflow-x-hidden bg-white">
      <article className="w-full pt-6 lg:pt-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-x-4 text-sm">
            <time dateTime={frontmatter.date} className="font-medium" style={{ color: '#1a365d99' }}>
              {frontmatter.date.toLowerCase()}
            </time>
            <span className="font-medium" style={{ color: '#1a365d99' }}>·</span>
            <span className="font-medium" style={{ color: '#1a365d99' }}>Chapter {frontmatter.chapter}</span>
          </div>
          <div className="prose prose-base sm:prose-lg mt-8 sm:mt-12 max-w-none pb-16">
            <ReactMarkdown components={components}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  )
} 