import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Database types (you can generate these from your Supabase dashboard)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          job_title: string | null
          team_name: string | null
          default_view: string | null
          timezone: string | null
          notifications_enabled: boolean | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          job_title?: string | null
          team_name?: string | null
          default_view?: string | null
          timezone?: string | null
          notifications_enabled?: boolean | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          job_title?: string | null
          team_name?: string | null
          default_view?: string | null
          timezone?: string | null
          notifications_enabled?: boolean | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 