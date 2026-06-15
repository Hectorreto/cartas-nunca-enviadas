import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import { getBlogPosts } from '@/services/blog'
import { formatChapterDate } from '@/lib/utils'

export default function BlogPage() {
  const { data: posts = [] } = useQuery({ queryKey: ['blog_posts'], queryFn: getBlogPosts })
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <Layout>
      {/* Banner */}
      <div className="relative w-full h-36 rounded-sm overflow-hidden mb-10 bg-gradient-to-r from-[#2a1f10] via-[#1a1208] to-[#0d0b08] flex items-end p-6 border border-[#3a2e1e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-1">Noticias y reflexiones</p>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Blog</h1>
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="group flex flex-col sm:flex-row gap-6 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-6 mb-10 hover:border-[#c9a96e]/50 transition-all"
        >
          {/* Cover */}
          <div className="sm:w-64 flex-shrink-0 aspect-video bg-gradient-to-br from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e]" />

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Tag label={featured.tag} />
                <span className="text-[10px] text-[#6a5a40]">{formatChapterDate(featured.published_at)}</span>
              </div>
              <h2 className="font-serif text-xl text-[#f0e0c0] leading-snug mb-3 group-hover:text-[#c9a96e] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[13px] text-[#8a7a60] leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] tracking-widest text-[#c9a96e] uppercase">
              Leer entrada <ArrowRight size={12} />
            </div>
          </div>
        </Link>
      )}

      {/* Rest of posts */}
      <h3 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-6">Entradas anteriores</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group bg-[#1a1510] border border-[#3a2e1e] rounded-sm hover:border-[#c9a96e]/50 transition-all overflow-hidden"
          >
            {/* Cover */}
            <div className="w-full aspect-video bg-gradient-to-br from-[#2a1f10] to-[#1a1208] border-b border-[#3a2e1e]" />

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag label={post.tag} />
                <span className="text-[10px] text-[#6a5a40]">{formatChapterDate(post.published_at)}</span>
              </div>
              <h3 className="font-serif text-[15px] text-[#f0e0c0] leading-snug mb-2 group-hover:text-[#c9a96e] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[12px] text-[#8a7a60] leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-1 text-[10px] tracking-widest text-[#c9a96e] uppercase">
                Leer <ArrowRight size={10} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[9px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5">
      {label}
    </span>
  )
}
