'use client'

import { useRouter } from 'next/navigation'

interface TagLinkProps {
  tag: string
}

export default function TagLink({ tag }: TagLinkProps) {
  const router = useRouter()
  
  const handleTagClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/blog?q=${encodeURIComponent(tag)}`)
  }
  
  return (
    <span
      onClick={handleTagClick}
      className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF6B2B15] to-[#FF6B2B25] px-3 py-1 text-sm font-medium shadow-sm cursor-pointer hover:from-[#FF6B2B25] hover:to-[#FF6B2B35] transition-colors duration-200"
      style={{ color: '#FF6B2B' }}
    >
      {tag.toLowerCase()}
    </span>
  )
} 