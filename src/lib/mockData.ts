import type { Chapter } from '@/types'

export const MOCK_CHAPTERS: Chapter[] = [
  { id: '1',  number: 1,  title: 'El hombre que no tenía nada que enseñar', cover_url: '', published_at: '2024-05-12', is_free: true },
  { id: '2',  number: 2,  title: 'Los caracoles y las primeras reglas',      cover_url: '', published_at: '2024-05-19', is_free: true },
  { id: '3',  number: 3,  title: 'Debajo del escritorio',                    cover_url: '', published_at: '2024-05-26', is_free: true },
  { id: '4',  number: 4,  title: 'La noche del piano',                       cover_url: '', published_at: '2024-06-02', is_free: true },
  { id: '5',  number: 5,  title: 'Cartas desde Milán',                       cover_url: '', published_at: '2024-06-09', is_free: true },
  { id: '6',  number: 6,  title: 'Nuestra vida. Nuestra familia.',            cover_url: '', published_at: '2024-06-16', is_free: true },
  { id: '7',  number: 7,  title: 'Lo que el silencio no pudo guardar',       cover_url: '', published_at: '2024-06-23', is_free: true },
  { id: '8',  number: 8,  title: 'El regreso que nadie esperaba',            cover_url: '', published_at: '2024-06-30', is_free: true },
  { id: '9',  number: 9,  title: 'Tres palabras demasiado tarde',            cover_url: '', published_at: '2024-07-07', is_free: false },
  { id: '10', number: 10, title: 'La última carta',                          cover_url: '', published_at: '2024-07-14', is_free: false },
  { id: '11', number: 11, title: 'Un domingo en Florencia',                  cover_url: '', published_at: '2024-07-21', is_free: false },
  { id: '12', number: 12, title: 'Lo que quedó sin decir',                   cover_url: '', published_at: '2024-07-28', is_free: false },
]

export function formatChapterDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()
}
