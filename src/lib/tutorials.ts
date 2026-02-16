import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface ChapterContent {
  content: string
  frontmatter: {
    title: string
    description: string
    date: string
    tags: string[]
    chapter: number
    section: number
  }
}

export async function getChapterContent(tutorialPath: string, fileName: string): Promise<ChapterContent> {
  const fullPath = path.join(process.cwd(), 'content/tutorials', tutorialPath, 'chapters', fileName)
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { content, data } = matter(fileContents)
    return {
      content,
      frontmatter: data as ChapterContent['frontmatter']
    }
  } catch (error) {
    console.error('Error loading tutorial content:', error)
    return {
      content: '# Error\nFailed to load tutorial content.',
      frontmatter: {
        title: 'Error',
        description: 'Failed to load tutorial content',
        date: new Date().toISOString(),
        tags: [],
        chapter: 0,
        section: 0
      }
    }
  }
} 