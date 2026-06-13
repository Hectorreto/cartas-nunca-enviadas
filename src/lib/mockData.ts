import type { Chapter, Character, Fragment } from '@/types'

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

export const MOCK_FRAGMENTS: Fragment[] = [
  { id: '1', title: 'El piano',             description: 'La primera vez que ella tocó para él.',           image_url: '', chapter_number: 4,  chapter_title: 'La noche del piano',      aspect: 'tall'   },
  { id: '2', title: 'Debajo del escritorio', description: 'Un escondite. Una conversación que no esperaban.', image_url: '', chapter_number: 3,  chapter_title: 'Debajo del escritorio',   aspect: 'wide'   },
  { id: '3', title: 'Café en Venecia',       description: 'El silencio más ruidoso de la historia.',          image_url: '', chapter_number: 5,  chapter_title: 'Cartas desde Milán',      aspect: 'square' },
  { id: '4', title: 'La primera carta',      description: 'Las palabras que nunca envió.',                   image_url: '', chapter_number: 1,  chapter_title: 'El hombre que no tenía nada que enseñar', aspect: 'tall' },
  { id: '5', title: 'Tres de la mañana',     description: 'Cuando la guardia baja y la verdad sale sola.',   image_url: '', chapter_number: 9,  chapter_title: 'Tres palabras demasiado tarde', aspect: 'wide' },
  { id: '6', title: 'La tormenta de Milán',  description: 'Atrapados. Sin excusas. Sin salida.',             image_url: '', chapter_number: 5,  chapter_title: 'Cartas desde Milán',      aspect: 'tall'   },
  { id: '7', title: 'El espejo roto',        description: 'Lo que se ve cuando ya no hay máscaras.',          image_url: '', chapter_number: 7,  chapter_title: 'Lo que el silencio no pudo guardar', aspect: 'square' },
  { id: '8', title: 'La última llamada',     description: 'Una decisión. Dos destinos posibles.',             image_url: '', chapter_number: 10, chapter_title: 'La última carta',         aspect: 'wide'   },
]
