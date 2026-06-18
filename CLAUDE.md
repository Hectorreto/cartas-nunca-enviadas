# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Type-check + production build
npm run lint      # ESLint only (tsc is covered by build)
npm run preview   # Preview production build locally
npm run schema:pull   # Sync supabase/schema.sql with the real remote schema
npx tsc --noEmit  # Type-check only (run before committing)
```

No test suite is configured.

## Architecture

**Cartas que nunca fueron enviadas** — a webtoon reading platform. Readers browse and read vertical-scroll comic chapters; an admin (the artist) manages all content via a private panel.

### Stack
- Vite + React 19 + TypeScript
- React Router v7 (client-side routing)
- TanStack Query (server state, Supabase queries)
- Zustand (client state)
- Tailwind CSS v4 with `@theme` (no config file — tokens live in `src/index.css`)
- Supabase (auth, database, storage)
- shadcn/ui base (Radix primitives + `src/lib/utils.ts` `cn()`)

### Key data flows

**Auth:** `App.tsx` calls `supabase.auth.getSession()` on mount, then fetches the user's profile (including `role`) from the `profiles` table. Both are stored in `useAuthStore`. `authReady: true` is set only after this completes — `RequireAdmin` and `RequireAuth` in `src/components/ProtectedRoute.tsx` wait for this flag before deciding to redirect, preventing a race condition.

**Reading progress:** Tracked in `useReadingStore` (Zustand + localStorage key `reading-progress`). Not yet synced to Supabase for logged-in users — that's a planned feature.

**Content:** All pages currently use mock data from `src/lib/mockData.ts`. Supabase tables exist for the real data (`chapters`, `chapter_panels`, `comments`, `profiles`) but queries are not yet wired up in the UI.

### User roles
- `reader` (default) — can comment, access premium chapters when logged in
- `admin` — access to `/admin/*`, can manage all content. Set manually in Supabase Table Editor on the `profiles` table.

### Route structure
- Public: `/`, `/capitulos`, `/personajes`, `/fragmentos`, `/extras`, `/blog`, `/blog/:slug`, `/leer/:chapterId`
- Protected (admin only): `/admin/*` — renders `AdminPage` which has its own nested `<Routes>` for dashboard, chapters, blog, characters, fragments, extras

### Styling conventions
All color tokens are CSS custom properties defined in `src/index.css` under `@theme`. Use them directly — e.g. `text-[#c9a96e]` for gold, `bg-[#1a1510]` for cards, `border-[#3a2e1e]` for borders. The standard card pattern is `bg-[#1a1510] border border-[#3a2e1e] rounded-sm`. Hover: `hover:border-[#c9a96e]/50 transition-all`. Active/selected state: `bg-[#c9a96e] text-[#0d0b08]`.

### Supabase
- Client: `src/lib/supabase.ts` — reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from env
- Schema: `supabase/schema.sql` — always reflects the real remote schema. After any change in the Supabase dashboard, run `npm run schema:pull` to regenerate this file and commit it.
- Storage bucket: `comic` (public) — intended path convention `panels/{chapter_id}/{order}.jpg`
- RLS is enabled on all tables. Premium chapters require auth; admin write policies check `profiles.role = 'admin'`

### Environment
Requires `.env.local` with:
```
VITE_SUPABASE_URL=https://xczxadapivphnhslgqhx.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>
```
