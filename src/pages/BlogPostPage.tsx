import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import { MOCK_POSTS, formatChapterDate } from '@/lib/mockData'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = MOCK_POSTS.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const currentIndex = MOCK_POSTS.indexOf(post)
  const prev = MOCK_POSTS[currentIndex + 1] ?? null
  const next = MOCK_POSTS[currentIndex - 1] ?? null

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[11px] tracking-widest text-[#8a7a60] hover:text-[#c9a96e] uppercase transition-colors mb-8"
        >
          <ArrowLeft size={13} /> Blog
        </Link>

        {/* Cover */}
        <div className="w-full aspect-video bg-gradient-to-br from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] mb-8" />

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[9px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5">
            {post.tag}
          </span>
          <span className="text-[11px] text-[#6a5a40]">{formatChapterDate(post.published_at)}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl text-[#f0e0c0] leading-snug mb-8">
          {post.title}
        </h1>

        {/* Content */}
        <div className="space-y-5 border-t border-[#3a2e1e] pt-8">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-[15px] text-[#8a7a60] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="mt-16 pt-8 border-t border-[#3a2e1e] grid grid-cols-2 gap-4">
          <div>
            {next && (
              <Link
                to={`/blog/${next.slug}`}
                className="group flex flex-col gap-1 hover:text-[#c9a96e] transition-colors"
              >
                <span className="text-[10px] tracking-widest text-[#6a5a40] uppercase">← Anterior</span>
                <span className="text-[13px] font-serif text-[#d4c4a0] group-hover:text-[#c9a96e] transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {prev && (
              <Link
                to={`/blog/${prev.slug}`}
                className="group flex flex-col gap-1 items-end hover:text-[#c9a96e] transition-colors"
              >
                <span className="text-[10px] tracking-widest text-[#6a5a40] uppercase">Siguiente →</span>
                <span className="text-[13px] font-serif text-[#d4c4a0] group-hover:text-[#c9a96e] transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
