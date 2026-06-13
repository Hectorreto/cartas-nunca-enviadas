import type { Chapter, Character, Fragment, Extra, BlogPost } from '@/types'

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

export const MOCK_EXTRAS: Extra[] = [
  { id: '1', title: 'Nikolai — diseño original',    category: 'Arte conceptual', image_url: '', description: 'El primer boceto del personaje antes de que encontrara su forma definitiva.' },
  { id: '2', title: 'Valentina — primeras versiones', category: 'Arte conceptual', image_url: '', description: 'Tres iteraciones del diseño de Valentina antes de la versión final.' },
  { id: '3', title: 'El apartamento de Nikolai',    category: 'Arte conceptual', image_url: '', description: 'Concept art del espacio donde transcurre buena parte de la historia.' },
  { id: '4', title: 'Wallpaper — El piano',          category: 'Wallpapers',      image_url: '', download_url: '#', description: '1920×1080 y 1080×1920 para móvil.' },
  { id: '5', title: 'Wallpaper — Cartas',            category: 'Wallpapers',      image_url: '', download_url: '#', description: '1920×1080 y 1080×1920 para móvil.' },
  { id: '6', title: 'Bocetos — Capítulo 3',          category: 'Bocetos',         image_url: '', description: 'Thumbnails y bocetos de la escena debajo del escritorio.' },
  { id: '7', title: 'Bocetos — Capítulo 4',          category: 'Bocetos',         image_url: '', description: 'El proceso de composición de la escena del piano.' },
  { id: '8', title: 'Fan art de @LectoraNocturna',   category: 'Fan art',         image_url: '', description: 'Compartido con permiso de la artista.' },
]

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'bienvenidos',
    title: 'Bienvenidos a Cartas que nunca fueron enviadas',
    excerpt: 'Una historia sobre lo que pasa cuando dos personas que no creen en el amor se encuentran en el momento equivocado.',
    content: [
      'Hola a todos. Hoy es un día raro. De esos en los que terminas publicando algo que llevas meses guardando en carpetas con nombres vergonzosos como "proyecto_final_v3_ESTE_SI".',
      'Cartas que nunca fueron enviadas nació de una pregunta sencilla: ¿qué pasa cuando dos personas que aprendieron a no necesitar a nadie se necesitan la una a la otra? No de forma poética. De forma incómoda, torpe y un poco ridícula.',
      'Nikolai y Valentina no son héroes. Son personas con heridas viejas que no han terminado de sanar y que, por alguna razón que ninguno de los dos entiende bien, terminan en la vida del otro.',
      'Espero que les guste. Yo ya los quiero demasiado como para ser objetiva.',
    ],
    cover_url: '',
    published_at: '2024-05-12',
    tag: 'Anuncio',
    featured: true,
  },
  {
    id: '2',
    slug: 'detras-del-capitulo-3',
    title: 'Detrás del capítulo 3: Debajo del escritorio',
    excerpt: 'El capítulo que más me costó dibujar y el que más me gusta de los que he publicado hasta ahora.',
    content: [
      'El capítulo 3 fue el más difícil de dibujar hasta ahora. No por la complejidad técnica, sino porque tenía que transmitir algo muy específico: la incomodidad de estar demasiado cerca de alguien que te pone nerviosa sin saber por qué.',
      'La escena debajo del escritorio la reescribí cuatro veces. En la primera versión era demasiado obvia. En la segunda, demasiado fría. La tercera ni la guardo. La cuarta fue la que quedó.',
      'Lo que más me gustó del resultado fue que varias personas me dijeron que se les hizo un nudo en el estómago leyéndolo. Eso era exactamente lo que quería.',
    ],
    cover_url: '',
    published_at: '2024-05-28',
    tag: 'Detrás de cámaras',
    featured: false,
  },
  {
    id: '3',
    slug: 'calendario-junio',
    title: 'Calendario de publicaciones — Junio',
    excerpt: 'Confirmado: los capítulos de junio salen los domingos. Aquí las fechas exactas.',
    content: [
      'Rápida actualización para que no se pierdan nada. Durante junio voy a publicar un capítulo por semana, los domingos.',
      'Capítulo 4 — 2 de junio. Capítulo 5 — 9 de junio. Capítulo 6 — 16 de junio. Capítulo 7 — 23 de junio.',
      'Si alguna semana me retraso, lo aviso antes. Gracias por la paciencia y por todos los mensajes. Los leo todos aunque no siempre puedo responder.',
    ],
    cover_url: '',
    published_at: '2024-05-31',
    tag: 'Actualización',
    featured: false,
  },
  {
    id: '4',
    slug: 'inspiraciones-musicales',
    title: 'La música que me inspiró mientras dibujaba',
    excerpt: 'La playlist que sonó en bucle durante los primeros seis capítulos. Con notas sobre qué escena acompañó cada canción.',
    content: [
      'Siempre dibujo con música. No puedo trabajar en silencio, me distrae el silencio más que el ruido.',
      'Para esta historia armé una playlist desde el principio, antes incluso de tener claro el guion completo. La música me ayuda a encontrar el tono de una escena antes de saber exactamente qué va a pasar en ella.',
      'Hay canciones de piano clásico para las escenas de Nikolai en su apartamento. Canciones en italiano para las escenas de Milán. Y mucho indie melancólico para todo lo demás.',
      'La playlist oficial ya está disponible en Spotify. La encuentran en la home.',
    ],
    cover_url: '',
    published_at: '2024-06-10',
    tag: 'Proceso',
    featured: false,
  },
]
