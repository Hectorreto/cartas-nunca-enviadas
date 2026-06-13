export interface Chapter {
  id: string
  number: number
  title: string
  cover_url: string
  published_at: string
  is_free: boolean
}

export interface ChapterPanel {
  id: string
  chapter_id: string
  order: number
  image_url: string
  width: number
  height: number
}

export interface Character {
  id: string
  name: string
  label: string
  tagline: string
  description: string
  portrait_url: string
  role: 'main' | 'secondary'
  traits: string[]
  first_appearance: string
}

export interface Comment {
  id: string
  chapter_id: string
  user_id: string
  content: string
  created_at: string
  user: {
    username: string
    avatar_url: string | null
  }
}

export interface Fragment {
  id: string
  title: string
  description: string
  image_url: string
  chapter_number: number
  chapter_title: string
  aspect: 'tall' | 'wide' | 'square'
}

export type ExtraCategory = 'Arte conceptual' | 'Wallpapers' | 'Bocetos' | 'Fan art'

export interface Extra {
  id: string
  title: string
  category: ExtraCategory
  image_url: string
  download_url?: string
  description?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string[]
  cover_url: string
  published_at: string
  tag: string
  featured: boolean
}

export interface ReadingProgress {
  chapter_id: string
  panel_index: number
  updated_at: string
}
