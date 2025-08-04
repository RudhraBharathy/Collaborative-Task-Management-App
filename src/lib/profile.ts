import { supabase } from './supabase'
import type { Database } from './supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export async function createProfile(profile: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  return { data, error }
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

export async function upsertProfile(profile: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile, {
      onConflict: 'id',
    })
    .select()
    .single()

  return { data, error }
} 