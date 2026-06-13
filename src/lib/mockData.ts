import type { Chapter, Character } from '@/types'

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

export const MOCK_CHARACTERS: Character[] = [
  {
    id: 'el',
    name: 'Nikolai Voronov',
    label: 'ÉL',
    tagline: 'Empresario. Frío. Brillante.',
    description:
      'Un hombre que construyó su imperio sobre la certeza de que no necesitaba a nadie. Creció aprendiendo que el amor es una debilidad que otros explotan, y durante años se convenció de que tenía razón. Hasta que ella llegó a enseñarle lo contrario.',
    portrait_url: '',
    role: 'main',
    traits: ['Reservado', 'Inteligente', 'Orgulloso', 'Leal'],
    first_appearance: 'Capítulo 1',
  },
  {
    id: 'ella',
    name: 'Valentina Reyes',
    label: 'ELLA',
    tagline: 'Inteligente. Terca. Inquieta.',
    description:
      'Una mujer que llegó a su vida por accidente y se quedó por terquedad. No tiene miedo de decir lo que piensa, aunque eso la meta en problemas. Detrás de su fachada segura hay alguien que también carga heridas que no ha terminado de sanar.',
    portrait_url: '',
    role: 'main',
    traits: ['Directa', 'Empática', 'Impulsiva', 'Valiente'],
    first_appearance: 'Capítulo 1',
  },
  {
    id: 'marco',
    name: 'Marco Reyes',
    label: 'EL HERMANO',
    tagline: 'Protector. Gracioso. Entrometido.',
    description:
      'El hermano mayor de Valentina. Desconfía de Nikolai desde el principio, pero es incapaz de mantenerse al margen cuando su hermana lo necesita.',
    portrait_url: '',
    role: 'secondary',
    traits: ['Protector', 'Gracioso', 'Impulsivo'],
    first_appearance: 'Capítulo 3',
  },
  {
    id: 'irina',
    name: 'Irina Voronova',
    label: 'LA MADRE',
    tagline: 'Elegante. Calculadora. Impredecible.',
    description:
      'La madre de Nikolai. Una mujer que nunca dice lo que piensa ni piensa lo que dice. Su aparición en la historia lo cambia todo.',
    portrait_url: '',
    role: 'secondary',
    traits: ['Misteriosa', 'Elegante', 'Manipuladora'],
    first_appearance: 'Capítulo 6',
  },
  {
    id: 'sofia',
    name: 'Sofía Alcántara',
    label: 'LA AMIGA',
    tagline: 'Leal. Divertida. Demasiado honesta.',
    description:
      'La mejor amiga de Valentina. La única persona que se atreve a decirle la verdad aunque no quiera escucharla.',
    portrait_url: '',
    role: 'secondary',
    traits: ['Leal', 'Divertida', 'Directa'],
    first_appearance: 'Capítulo 2',
  },
]
