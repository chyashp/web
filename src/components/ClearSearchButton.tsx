'use client'

import { useRouter } from 'next/navigation'

export default function ClearSearchButton() {
  const router = useRouter()
  
  const handleClear = () => {
    router.push('/blog')
  }
  
  return (
    <button 
      onClick={handleClear}
      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF6B2B] hover:bg-[#FF6B2B]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B2B]"
    >
      Clear search
    </button>
  )
} 