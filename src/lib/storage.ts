import { supabase } from '@/lib/supabase'

export async function uploadFile(path: string, file: File): Promise<string> {
  const { error } = await supabase.storage.from('comic').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('comic').getPublicUrl(path)
  return data.publicUrl
}
