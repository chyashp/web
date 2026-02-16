import { supabase } from './supabase'

export interface Mission {
  id: string
  title: string
  description: string
  content: string
  status: 'Recruiting' | 'In Progress' | 'Completed'
  techstack: string[]
  duration: string
  teamsize: number
  spots: {
    filled: number
    total: number
  }
  startdate: string
  difficulty: string
}

export async function getAllMissions(): Promise<Mission[]> {
  try {
    console.log('Starting mission fetch...')
    
    // Log Supabase URL to verify connection (don't log in production)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .order('startdate', { ascending: true })

    // Log the raw response
    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    if (!data || data.length === 0) {
      console.log('No missions found in database')
      return []
    }

    // Log the data before transformation
    console.log('Raw missions data:', data)

    const missions = data.map(mission => ({
      ...mission,
      techStack: mission.techstack,
      teamSize: mission.teamsize,
      startDate: mission.startdate,
    }))

    // Log the transformed data
    console.log('Transformed missions:', missions)

    return missions
  } catch (error) {
    console.error('Error in getAllMissions:', error)
    return []
  }
}

export async function getMissionById(id: string): Promise<Mission | undefined> {
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching mission:', error)
    return undefined
  }

  return {
    ...data,
    techStack: data.techstack,
    teamSize: data.teamsize,
    startDate: data.startdate,
  } as Mission
} 