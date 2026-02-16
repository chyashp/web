import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserStatus = 'waitlist' | 'active' | 'inactive'

export interface User {
  id: string
  email: string
  status: UserStatus
  created_at: string
  updated_at: string
} 