import { useParams } from 'react-router-dom'

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>()

  return (
    <main className="min-h-screen flex flex-col items-center bg-black">
      <p className="text-[var(--color-text-muted)] mt-8">Capítulo: {chapterId}</p>
    </main>
  )
}
