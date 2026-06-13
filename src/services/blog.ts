import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/types'

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function getBlogPostById(id: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createBlogPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const { data: post, error } = await supabase.from('blog_posts').insert(data).select().single()
  if (error) throw error
  return post
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, 'id'>>): Promise<void> {
  const { error } = await supabase.from('blog_posts').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}
