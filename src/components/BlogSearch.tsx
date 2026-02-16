'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // Update URL when search query changes
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams)
    
    // Set or remove the 'q' parameter based on search query
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    
    // Navigate to the new URL
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="block w-full rounded-md border-0 py-3 pl-4 pr-12 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6B2B] sm:text-sm sm:leading-6"
          style={{ color: '#1a365d' }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
            style={{ color: '#1a365d99' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
            />
          </svg>
        </button>
      </form>
    </div>
  )
} 