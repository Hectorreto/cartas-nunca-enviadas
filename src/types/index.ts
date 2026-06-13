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
  description: string
  portrait_url: string
  role: 'main' | 'secondary'
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

export interface ReadingProgress {
  chapter_id: string
  panel_index: number
  updated_at: string
}
