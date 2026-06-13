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

create policy "comic bucket: admin insert"
  on storage.objects for insert
  with check (
    bucket_id = 'comic'
    and (select role from public.profiles where id = auth.uid()) = 'admin'
  );

create policy "comic bucket: admin update"
  on storage.objects for update
  using (
    bucket_id = 'comic'
    and (select role from public.profiles where id = auth.uid()) = 'admin'
  );

create policy "comic bucket: admin delete"
  on storage.objects for delete
  using (
    bucket_id = 'comic'
    and (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- ================================================================
-- MIGRACIÓN 1: role en profiles
-- ================================================================
alter table public.profiles
  add column role text not null default 'reader'
  check (role in ('reader', 'admin'));

-- Impide que un usuario cambie su propio rol
create policy "profiles: no self role change"
  on public.profiles for update
  using (auth.uid() = id)
  with check (role = (select role from public.profiles where id = auth.uid()));

-- ================================================================
-- MIGRACIÓN 2: reading_progress
-- ================================================================
create table public.reading_progress (
  user_id     uuid not null references public.profiles on delete cascade,
  chapter_id  uuid not null references public.chapters on delete cascade,
  panel_index integer not null default 0,
  updated_at  timestamptz default now(),
  primary key (user_id, chapter_id)
);
alter table public.reading_progress enable row level security;
create policy "progress: own only"
  on public.reading_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ================================================================
-- MIGRACIÓN 3: tablas de contenido (blog, personajes, fragmentos, extras)
-- ================================================================
create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text not null,
  content      text[] not null default '{}',
  cover_url    text not null default '',
  published_at date not null,
  tag          text not null default '',
  featured     boolean not null default false
);
alter table public.blog_posts enable row level security;
create policy "blog_posts: public read" on public.blog_posts for select using (true);
create policy "blog_posts: admin write" on public.blog_posts for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

create table public.characters (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  label            text not null,
  tagline          text not null,
  description      text not null,
  portrait_url     text not null default '',
  role             text not null check (role in ('main', 'secondary')),
  traits           text[] not null default '{}',
  first_appearance text not null default ''
);
alter table public.characters enable row level security;
create policy "characters: public read" on public.characters for select using (true);
create policy "characters: admin write" on public.characters for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

create table public.fragments (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text not null,
  image_url      text not null default '',
  chapter_number integer not null,
  chapter_title  text not null,
  aspect         text not null default 'square' check (aspect in ('tall', 'wide', 'square'))
);
alter table public.fragments enable row level security;
create policy "fragments: public read" on public.fragments for select using (true);
create policy "fragments: admin write" on public.fragments for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

create table public.extras (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  category     text not null,
  image_url    text not null default '',
  download_url text,
  description  text not null default ''
);
alter table public.extras enable row level security;
create policy "extras: public read" on public.extras for select using (true);
create policy "extras: admin write" on public.extras for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

-- ================================================================
-- MIGRACIÓN 4: admin write en chapters y chapter_panels
-- ================================================================
create policy "chapters: admin write" on public.chapters for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

create policy "chapter_panels: admin write" on public.chapter_panels for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');
