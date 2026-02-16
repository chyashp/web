import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: string
}

interface TagCount {
  tag: string
  count: number
}

const postsDirectory = path.join(process.cwd(), 'content/blog/posts')

export function getAllPosts(): BlogPost[] {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug)
    })
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    readTime: calculateReadTime(content),
    tags: (data.tags as string[]) || [],
    content
  }
}

/**
 * Search through blog posts based on a query string
 * @param query The search term to look for
 * @returns Array of matching blog posts
 */
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase().trim()
  
  if (!lowercaseQuery) {
    return getAllPosts()
  }
  
  const allPosts = getAllPosts()
  
  return allPosts.filter(post => {
    // Search in title
    if (post.title.toLowerCase().includes(lowercaseQuery)) {
      return true
    }
    
    // Search in excerpt
    if (post.excerpt.toLowerCase().includes(lowercaseQuery)) {
      return true
    }
    
    // Search in content
    if (post.content.toLowerCase().includes(lowercaseQuery)) {
      return true
    }
    
    // Search in tags
    if (post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) {
      return true
    }
    
    return false
  })
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Get the most frequently used tags across all blog posts
 * @param limit Maximum number of tags to return
 * @returns Array of tags sorted by frequency
 */
export function getTopTags(limit: number = 5): TagCount[] {
  const allPosts = getAllPosts()
  const tagCounts: Record<string, number> = {}
  
  // Count frequency of each tag
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  // Convert to array and sort by count (descending)
  const sortedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    
  // Return the top tags limited by the specified number
  return sortedTags.slice(0, limit)
} 