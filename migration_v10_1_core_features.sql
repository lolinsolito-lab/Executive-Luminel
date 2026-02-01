-- MIGRATION V10.1: CORE FEATURES (BLACK BOOK)

-- 1. Create Black Book Table
CREATE TABLE IF NOT EXISTS public.black_book (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  status text NOT NULL CHECK (status IN ('Ally', 'Enemy', 'Neutral', 'Target')),
  weakness text,
  leverage text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Security
ALTER TABLE public.black_book ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own book" ON public.black_book;

CREATE POLICY "Users manage own book" 
ON public.black_book 
FOR ALL 
USING (auth.uid() = user_id);

-- 3. Vault Items (Implicitly exists via WarRoom, but ensuring RLS)
-- ALTER TABLE public.vault_items ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public Read Vault" ON public.vault_items FOR SELECT USING (true);
-- CREATE POLICY "Admin Manage Vault" ON public.vault_items FOR ALL USING (auth.uid() IN (SELECT id FROM auth.users WHERE is_admin = true)); 
-- (Assuming simplified auth for now as per project state)
