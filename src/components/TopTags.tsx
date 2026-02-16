import { getTopTags } from '@/lib/blog'
import TagLink from '@/components/TagLink'

export default function TopTags() {
  const topTags = getTopTags(10)
  
  if (topTags.length === 0) {
    return null
  }
  
  return (
    <div className="h-full">
      <div className="flex items-center space-x-2 text-sm mb-3" style={{ color: '#1a365d99' }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-4 h-4"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 6h.008v.008H6V6z" 
          />
        </svg>
        <span className="font-medium">Popular tags</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {topTags.map(({ tag, count }) => (
          <div key={tag} className="flex items-center">
            <TagLink tag={tag} />
            <span className="ml-1 text-xs" style={{ color: '#1a365d99' }}>({count})</span>
          </div>
        ))}
      </div>
    </div>
  )
} 