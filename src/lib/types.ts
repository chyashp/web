export interface Mission {
  id: string
  title: string
  description: string
  content: string
  techstack: string[]
  duration: string
  teamsize: number
  status: string
  spots: {
    total: number
    filled: number
  }
} 