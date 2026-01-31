-- =============================================
-- LUMINEL EXECUTIVE V5.0 - SUPABASE SCHEMA
-- =============================================
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE
-- =============================================
create table if not exists public.profiles (
  id uuid references auth.users primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  email text not null,
  full_name text,
  subscription_tier text default 'GRINDER' check (subscription_tier in ('GRINDER', 'STRATEGIST', 'EXECUTIVE')),
  tier_level text default 'B1',
  performance_xp integer default 0,
  political_capital integer default 0,
  max_performance_xp integer default 100,
  max_political_capital integer default 100,
  streak_days integer default 0,
  total_sessions integer default 0,
  
  -- V5.1 Compliance & Admin
  is_admin boolean default false,
  marketing_consent boolean default false,
  tos_accepted_at timestamp with time zone,
  privacy_accepted_at timestamp with time zone,
  onboarding_completed boolean default false
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can only see their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    (select is_admin from public.profiles where id = auth.uid()) = true
  );

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
  
-- Admins can update any profile (God Mode)
create policy "Admins can update any profile"
  on public.profiles for update
  using (
    (select is_admin from public.profiles where id = auth.uid()) = true
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, marketing_consent, tos_accepted_at, privacy_accepted_at)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'marketing_consent')::boolean,
    now(), -- Assumes ToS accepted at signup
    now()  -- Assumes Privacy accepted at signup
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- 2. SUBSCRIPTIONS TABLE
-- =============================================
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  user_id uuid references auth.users not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier text default 'GRINDER' check (tier in ('GRINDER', 'STRATEGIST', 'EXECUTIVE')),
  status text default 'active' check (status in ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false
);

-- Enable RLS
alter table public.subscriptions enable row level security;

-- Users can view their own subscription
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service role can modify (for webhooks)
create policy "Service role can manage subscriptions"
  on public.subscriptions for all
  using (auth.role() = 'service_role');

-- =============================================
-- 3. NEURAL CODEX LOGS TABLE
-- =============================================
create table if not exists public.neural_codex_logs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users not null,
  card_id text not null,
  context text not null,
  notes text,
  impact_performance integer,
  impact_capital integer
);

-- Enable RLS
alter table public.neural_codex_logs enable row level security;

-- Users can view their own logs
create policy "Users can view own logs"
  on public.neural_codex_logs for select
  using (auth.uid() = user_id);

-- Users can insert their own logs
create policy "Users can insert own logs"
  on public.neural_codex_logs for insert
  with check (auth.uid() = user_id);

-- =============================================
-- 4. CHAT SESSIONS TABLE
-- =============================================
create table if not exists public.chat_sessions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users not null,
  title text,
  messages jsonb default '[]'::jsonb,
  is_archived boolean default false
);

-- Enable RLS
alter table public.chat_sessions enable row level security;

-- Users can manage their own sessions
create policy "Users can view own sessions"
  on public.chat_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on public.chat_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sessions"
  on public.chat_sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete own sessions"
  on public.chat_sessions for delete
  using (auth.uid() = user_id);

-- =============================================
-- 5. INDEXES FOR PERFORMANCE
-- =============================================
create index if not exists idx_profiles_subscription_tier on public.profiles(subscription_tier);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_customer on public.subscriptions(stripe_customer_id);
create index if not exists idx_neural_logs_user_id on public.neural_codex_logs(user_id);
create index if not exists idx_chat_sessions_user_id on public.chat_sessions(user_id);

-- =============================================
-- 6. UPDATED_AT TRIGGER
-- =============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at();

-- =============================================
-- DONE! Schema created successfully.
-- =============================================
