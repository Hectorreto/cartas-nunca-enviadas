-- ================================================================
-- PROFILES
-- Se crea automáticamente cuando un usuario se registra
-- ================================================================
create table public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  username   text unique not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- Trigger: crea un perfil al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ================================================================
-- CHAPTERS
-- ================================================================
create table public.chapters (
  id           uuid primary key default gen_random_uuid(),
  number       integer unique not null,
  title        text not null,
  cover_url    text not null,
  published_at timestamptz default now(),
  is_free      boolean default true,
  created_at   timestamptz default now()
);

-- ================================================================
-- CHAPTER PANELS
-- Imágenes verticales del webtoon, ordenadas por "order"
-- ================================================================
create table public.chapter_panels (
  id         uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters on delete cascade,
  "order"    integer not null,
  image_url  text not null,
  width      integer not null default 800,
  height     integer not null,
  unique (chapter_id, "order")
);

-- ================================================================
-- COMMENTS
-- ================================================================
create table public.comments (
  id         uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters on delete cascade,
  user_id    uuid not null references public.profiles on delete cascade,
  content    text not null,
  created_at timestamptz default now()
);

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
alter table public.profiles      enable row level security;
alter table public.chapters      enable row level security;
alter table public.chapter_panels enable row level security;
alter table public.comments      enable row level security;

-- Profiles: cualquiera puede leer, solo el dueño puede editar
create policy "profiles: public read"
  on public.profiles for select using (true);

create policy "profiles: own update"
  on public.profiles for update using (auth.uid() = id);

-- Chapters: los capítulos free son públicos, los premium requieren login
create policy "chapters: free are public"
  on public.chapters for select using (is_free = true);

create policy "chapters: premium requires auth"
  on public.chapters for select using (auth.role() = 'authenticated');

-- Panels: hereda la lógica del capítulo padre
create policy "panels: free are public"
  on public.chapter_panels for select
  using (
    exists (
      select 1 from public.chapters c
      where c.id = chapter_id and c.is_free = true
    )
  );

create policy "panels: premium requires auth"
  on public.chapter_panels for select
  using (auth.role() = 'authenticated');

-- Comments: public read, solo autenticados pueden escribir o borrar los suyos
create policy "comments: public read"
  on public.comments for select using (true);

create policy "comments: auth insert"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "comments: own delete"
  on public.comments for delete using (auth.uid() = user_id);

-- ================================================================
-- STORAGE BUCKET para imágenes del webtoon
-- ================================================================
insert into storage.buckets (id, name, public)
values ('comic', 'comic', true);

create policy "comic bucket: public read"
  on storage.objects for select
  using (bucket_id = 'comic');

create policy "comic bucket: auth upload"
  on storage.objects for insert
  with check (bucket_id = 'comic' and auth.role() = 'authenticated');
