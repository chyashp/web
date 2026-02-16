import Link from 'next/link'
import { getAllPosts, searchPosts } from '@/lib/blog'
import ClearSearchButton from '@/components/ClearSearchButton'
import TagLink from '@/components/TagLink'
import TopTags from '@/components/TopTags'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params?.q || ''
  const posts = query ? searchPosts(query) : getAllPosts()

  return (
    <main className="flex-1 pt-20">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-6xl" style={{ color: '#1a365d' }}>
            mobile development insights
          </h1>
          <p className="mt-4 text-xl leading-7" style={{ color: '#1a365d' }}>
            articles and guides about mobile development, team collaboration, and shipping great apps.
          </p>
          
          <div className="mt-8">
            <TopTags />
          </div>
          
          {query && (
            <div className="mt-6">
              <p className="text-lg" style={{ color: '#1a365d99' }}>
                {posts.length === 0 
                  ? `No results found for "${query}"`
                  : `Found ${posts.length} result${posts.length === 1 ? '' : 's'} for "${query}"`
                }
              </p>
              {posts.length === 0 && <ClearSearchButton />}
            </div>
          )}
          
          <div className="mt-16 space-y-12 divide-y divide-gray-200">
            {posts.map((post) => (
              <article key={post.slug} className="group pt-12 first:pt-0">
                <div className="flex items-center gap-x-4 text-sm">
                  <time dateTime={post.date} className="text-gray-500 font-medium">
                    {(post.date || '').toLowerCase()}
                  </time>
                  <span className="text-gray-500 font-medium">{(post.readTime || '').toLowerCase()}</span>
                </div>
                <div className="relative">
                  <h3 className="mt-4 text-2xl font-semibold leading-7 group-hover:text-[#FF6B2B] transition-colors duration-200" style={{ color: '#1a365d' }}>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {(post.title || '').toLowerCase()}
                    </Link>
                  </h3>
                  <p className="mt-4 text-lg leading-8" style={{ color: '#1a365d99' }}>
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <TagLink key={tag} tag={tag} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 