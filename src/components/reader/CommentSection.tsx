import { useState, useRef } from 'react'
import { Trash2, Loader2, MessageSquare } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChapterComments, postComment, deleteComment } from '@/services/chapters'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'

interface Props {
  chapterId: string
}

export default function CommentSection({ chapterId }: Props) {
  const user = useAuthStore((s) => s.user)
  const profile = useAuthStore((s) => s.profile)
  const openAuthModal = useUiStore((s) => s.openAuthModal)
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const queryClient = useQueryClient()

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', chapterId],
    queryFn: () => getChapterComments(chapterId),
  })

  const postMutation = useMutation({
    mutationFn: (content: string) => postComment(chapterId, user!.id, content),
    onSuccess: () => {
      setText('')
      queryClient.invalidateQueries({ queryKey: ['comments', chapterId] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', chapterId] }),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    postMutation.mutate(text.trim())
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-16">
      <div className="border-t border-[#3a2e1e] pt-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare size={14} className="text-[#c9a96e]" />
          <h3 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase">
            Comentarios {comments.length > 0 && `(${comments.length})`}
          </h3>
        </div>

        {/* Form */}
        {user ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3a2e1e] to-[#2a1f10] flex-shrink-0 border border-[#3a2e1e] flex items-center justify-center">
                <span className="text-[10px] text-[#c9a96e] font-medium">
                  {profile?.username?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escribe un comentario..."
                  rows={3}
                  className="w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!text.trim() || postMutation.isPending}
                    className="flex items-center gap-2 px-4 py-1.5 bg-[#c9a96e] text-[#0d0b08] text-[10px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {postMutation.isPending && <Loader2 size={11} className="animate-spin" />}
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="w-full mb-8 py-3 border border-[#3a2e1e] text-[11px] tracking-widest text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e] uppercase transition-all"
          >
            Inicia sesión para comentar
          </button>
        )}

        {/* Comments list */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={16} className="animate-spin text-[#8a7a60]" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-[#6a5a40] text-[13px] py-8">
            Sé el primero en comentar este capítulo.
          </p>
        ) : (
          <div className="space-y-5">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3a2e1e] to-[#2a1f10] flex-shrink-0 border border-[#3a2e1e] flex items-center justify-center">
                  <span className="text-[10px] text-[#c9a96e] font-medium">
                    {c.user?.username?.[0]?.toUpperCase() ?? '?'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[12px] font-medium text-[#c9a96e]">{c.user?.username}</span>
                      <span className="text-[10px] text-[#6a5a40]">{formatDate(c.created_at)}</span>
                    </div>
                    {user?.id === c.user_id && (
                      <button
                        onClick={() => deleteMutation.mutate(c.id)}
                        disabled={deleteMutation.isPending}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6a5a40] hover:text-red-400"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                  <p className="text-[13px] text-[#8a7a60] mt-1 leading-relaxed">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
