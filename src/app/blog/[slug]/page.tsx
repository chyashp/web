import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import TagLink from '@/components/TagLink'
import type { Components } from 'react-markdown'

interface ComponentsProps {
  title: string
}

const components = ({ title }: ComponentsProps): Components => ({
  h1: ({ children, ...props }) => {
    const headingText = Array.isArray(children) ? children.join('') : children?.toString() || ''
    if (headingText.toLowerCase() === title.toLowerCase()) {
      return null
    }
    return (
      <h1 {...props} className="text-4xl font-bold mt-12 mb-6" style={{ color: '#1a365d' }}>
        {children}
      </h1>
    )
  },
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
      <div className="my-6">
        <SyntaxHighlighter
          language={match[1]}
          style={tomorrow}
          PreTag="div"
          className="rounded-xl shadow-lg !bg-[#1a365d] !p-6"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code {...props} className="rounded bg-[#1a365d15] px-2 py-1 font-mono text-sm" style={{ color: '#1a365d' }}>
        {children}
      </code>
    )
  }
})

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface GenerateMetadataProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - nanushi',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} - nanushi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['nanushi'],
      tags: post.tags
    }
  }
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPage(props: PageProps) {
  const { params } = props
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex-1 pt-20">
      <article className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-x-4 text-sm">
            <time dateTime={post.date} className="font-medium" style={{ color: '#1a365d99' }}>
              {post.date.toLowerCase()}
            </time>
            <span className="font-medium" style={{ color: '#1a365d99' }}>·</span>
            <span className="font-medium" style={{ color: '#1a365d99' }}>{post.readTime.toLowerCase()}</span>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: '#1a365d' }}>
            {post.title.toLowerCase()}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>
          <div className="prose prose-lg mt-12 max-w-none [&>*:last-child]:mb-0">
            <ReactMarkdown components={components({ title: post.title })}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  )
} 