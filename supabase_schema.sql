-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USER PROFILES TABLE
create table public.user_profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  display_name text,
  avatar_url text,
  reading_level text, -- beginner, intermediate, advanced
  base_wpm integer default 250,
  age integer,
  onboarding_completed boolean default false,
  preferred_mode text default 'word_flash',

  adaptive_difficulty boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.user_profiles enable row level security;

-- Policies
create policy "Users can view their own profile."
  on user_profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on user_profiles for update
  using ( auth.uid() = id );

-- Automatically create profile on user signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (id, display_name, avatar_url)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- READING SESSIONS (Analytics)
create table public.reading_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  article_title text,
  topic text,
  difficulty text,
  starting_wpm integer,
  ending_wpm integer,
  words_read integer,
  duration_seconds integer,
  comprehension_score integer, -- percentage 0-100
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reading_sessions enable row level security;

create policy "Users can view their own reading sessions."
  on public.reading_sessions for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own reading sessions."
  on public.reading_sessions for insert
  with check ( auth.uid() = user_id );


-- USER GOALS
create table public.user_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  goal_type text, -- 'wpm_target', 'total_words', 'daily_streak'
  target_value integer,
  current_value integer default 0,
  achieved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_goals enable row level security;

create policy "Users can manage their own goals."
  on public.user_goals for all
  using ( auth.uid() = user_id );

-- SET UP STORAGE FOR AVATARS (Optional)
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Users can upload their own avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1] );
