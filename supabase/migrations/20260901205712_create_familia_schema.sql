/*
# Familia AI — Core Database Schema

Creates the complete database schema for the Familia AI parenting app.

## New Tables
1. households — family unit with financial tier, trial, subscription
2. household_members — links auth users to household with role (parent/child)
3. children_profiles — extended child data (XP, level, screen time, etc.)
4. hobbies — child sports/activities with schedules
5. guardians — secondary parent contacts
6. routine_tasks — daily routine template (morning/afternoon/night)
7. task_completions — per-child per-date task completion tracking
8. grades — academic grades per child
9. wishlist_items — reward goals with AI-calculated XP cost
10. chat_messages — AI coach conversation history
11. app_settings — per-user preferences (language, theme, etc.)

## Security
- RLS enabled on ALL tables
- Parents: full CRUD on household data
- Children: read-only on tasks/grades, can create completions and chat messages
- All ownership checks via helper functions using auth.uid()
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- Create all tables first (no policies yet)
-- ============================================================

CREATE TABLE IF NOT EXISTS households (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  financial_tier text DEFAULT 'average',
  trial_start_date date DEFAULT CURRENT_DATE,
  is_subscribed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS household_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'child' CHECK (role IN ('parent', 'child')),
  display_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS children_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  member_id uuid REFERENCES household_members(id) ON DELETE SET NULL,
  name text NOT NULL DEFAULT '',
  arabic_name text DEFAULT '',
  gender text DEFAULT 'boy' CHECK (gender IN ('boy', 'girl')),
  avatar text DEFAULT '👦',
  phone text DEFAULT '',
  email text DEFAULT '',
  ambition text DEFAULT '',
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  streak integer DEFAULT 0,
  financial_tier text DEFAULT 'average',
  screen_time_used_mins integer DEFAULT 0,
  screen_time_limit_mins integer DEFAULT 135,
  screen_time_unlimited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children_profiles(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  days text[] DEFAULT '{}',
  time text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS guardians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS routine_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  time_of_day text NOT NULL DEFAULT 'morning' CHECK (time_of_day IN ('morning', 'afternoon', 'night')),
  title text NOT NULL DEFAULT '',
  title_ar text DEFAULT '',
  xp integer DEFAULT 50,
  requires_vision boolean DEFAULT false,
  scheduled_time text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS task_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children_profiles(id) ON DELETE CASCADE,
  task_id uuid NOT NULL REFERENCES routine_tasks(id) ON DELETE CASCADE,
  completion_date date NOT NULL DEFAULT CURRENT_DATE,
  completed boolean DEFAULT false,
  parent_approved boolean DEFAULT false,
  proof_image text DEFAULT '',
  missed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE (child_id, task_id, completion_date)
);

CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children_profiles(id) ON DELETE CASCADE,
  subject text NOT NULL DEFAULT '',
  score numeric NOT NULL DEFAULT 0,
  max_score numeric NOT NULL DEFAULT 100,
  date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'Good' CHECK (status IN ('Excellent', 'Good', 'Needs Support')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children_profiles(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  xp_cost integer NOT NULL DEFAULT 500,
  image text DEFAULT '',
  status text DEFAULT 'active' CHECK (status IN ('active', 'claimed')),
  ai_generated boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children_profiles(id) ON DELETE CASCADE,
  sender text NOT NULL DEFAULT 'ai' CHECK (sender IN ('ai', 'user')),
  text text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language text DEFAULT 'ar',
  theme_id text DEFAULT 'indigo',
  is_dark boolean DEFAULT true,
  notifications_enabled boolean DEFAULT false,
  protection_enabled boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- Enable RLS on all tables
-- ============================================================
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE household_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE children_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper functions (after tables exist)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_user_household_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT household_id FROM household_members WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_parent()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM household_members
    WHERE user_id = auth.uid() AND role = 'parent'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_child()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM household_members
    WHERE user_id = auth.uid() AND role = 'child'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_my_child_profile_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT cp.id FROM children_profiles cp
  JOIN household_members hm ON cp.member_id = hm.id
  WHERE hm.user_id = auth.uid() AND hm.role = 'child'
  LIMIT 1;
$$;

-- ============================================================
-- Policies: households
-- ============================================================
DROP POLICY IF EXISTS "read_own_household" ON households;
CREATE POLICY "read_own_household" ON households FOR SELECT
  TO authenticated USING (id = public.get_user_household_id());

DROP POLICY IF EXISTS "update_own_household" ON households;
CREATE POLICY "update_own_household" ON households FOR UPDATE
  TO authenticated USING (id = public.get_user_household_id() AND public.is_parent())
  WITH CHECK (id = public.get_user_household_id() AND public.is_parent());

-- ============================================================
-- Policies: household_members
-- ============================================================
DROP POLICY IF EXISTS "read_household_members" ON household_members;
CREATE POLICY "read_household_members" ON household_members FOR SELECT
  TO authenticated USING (household_id = public.get_user_household_id());

DROP POLICY IF EXISTS "insert_household_members" ON household_members;
CREATE POLICY "insert_household_members" ON household_members FOR INSERT
  TO authenticated WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "update_household_members" ON household_members;
CREATE POLICY "update_household_members" ON household_members FOR UPDATE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  )
  WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "delete_household_members" ON household_members;
CREATE POLICY "delete_household_members" ON household_members FOR DELETE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

-- ============================================================
-- Policies: children_profiles
-- ============================================================
DROP POLICY IF EXISTS "read_children_profiles" ON children_profiles;
CREATE POLICY "read_children_profiles" ON children_profiles FOR SELECT
  TO authenticated USING (
    household_id = public.get_user_household_id()
    OR id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_children_profiles" ON children_profiles;
CREATE POLICY "insert_children_profiles" ON children_profiles FOR INSERT
  TO authenticated WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "update_children_profiles" ON children_profiles;
CREATE POLICY "update_children_profiles" ON children_profiles FOR UPDATE
  TO authenticated USING (
    (household_id = public.get_user_household_id() AND public.is_parent())
    OR id = public.get_my_child_profile_id()
  )
  WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "delete_children_profiles" ON children_profiles;
CREATE POLICY "delete_children_profiles" ON children_profiles FOR DELETE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

-- ============================================================
-- Policies: hobbies
-- ============================================================
DROP POLICY IF EXISTS "read_hobbies" ON hobbies;
CREATE POLICY "read_hobbies" ON hobbies FOR SELECT
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_hobbies" ON hobbies;
CREATE POLICY "insert_hobbies" ON hobbies FOR INSERT
  TO authenticated WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "update_hobbies" ON hobbies;
CREATE POLICY "update_hobbies" ON hobbies FOR UPDATE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  )
  WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "delete_hobbies" ON hobbies;
CREATE POLICY "delete_hobbies" ON hobbies FOR DELETE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

-- ============================================================
-- Policies: guardians
-- ============================================================
DROP POLICY IF EXISTS "read_guardians" ON guardians;
CREATE POLICY "read_guardians" ON guardians FOR SELECT
  TO authenticated USING (household_id = public.get_user_household_id());

DROP POLICY IF EXISTS "insert_guardians" ON guardians;
CREATE POLICY "insert_guardians" ON guardians FOR INSERT
  TO authenticated WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "update_guardians" ON guardians;
CREATE POLICY "update_guardians" ON guardians FOR UPDATE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  )
  WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "delete_guardians" ON guardians;
CREATE POLICY "delete_guardians" ON guardians FOR DELETE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

-- ============================================================
-- Policies: routine_tasks
-- ============================================================
DROP POLICY IF EXISTS "read_routine_tasks" ON routine_tasks;
CREATE POLICY "read_routine_tasks" ON routine_tasks FOR SELECT
  TO authenticated USING (household_id = public.get_user_household_id());

DROP POLICY IF EXISTS "insert_routine_tasks" ON routine_tasks;
CREATE POLICY "insert_routine_tasks" ON routine_tasks FOR INSERT
  TO authenticated WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "update_routine_tasks" ON routine_tasks;
CREATE POLICY "update_routine_tasks" ON routine_tasks FOR UPDATE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  )
  WITH CHECK (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

DROP POLICY IF EXISTS "delete_routine_tasks" ON routine_tasks;
CREATE POLICY "delete_routine_tasks" ON routine_tasks FOR DELETE
  TO authenticated USING (
    household_id = public.get_user_household_id() AND public.is_parent()
  );

-- ============================================================
-- Policies: task_completions
-- ============================================================
DROP POLICY IF EXISTS "read_task_completions" ON task_completions;
CREATE POLICY "read_task_completions" ON task_completions FOR SELECT
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_task_completions" ON task_completions;
CREATE POLICY "insert_task_completions" ON task_completions FOR INSERT
  TO authenticated WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "update_task_completions" ON task_completions;
CREATE POLICY "update_task_completions" ON task_completions FOR UPDATE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  )
  WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "delete_task_completions" ON task_completions;
CREATE POLICY "delete_task_completions" ON task_completions FOR DELETE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

-- ============================================================
-- Policies: grades
-- ============================================================
DROP POLICY IF EXISTS "read_grades" ON grades;
CREATE POLICY "read_grades" ON grades FOR SELECT
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_grades" ON grades;
CREATE POLICY "insert_grades" ON grades FOR INSERT
  TO authenticated WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "update_grades" ON grades;
CREATE POLICY "update_grades" ON grades FOR UPDATE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  )
  WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "delete_grades" ON grades;
CREATE POLICY "delete_grades" ON grades FOR DELETE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

-- ============================================================
-- Policies: wishlist_items
-- ============================================================
DROP POLICY IF EXISTS "read_wishlist_items" ON wishlist_items;
CREATE POLICY "read_wishlist_items" ON wishlist_items FOR SELECT
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_wishlist_items" ON wishlist_items;
CREATE POLICY "insert_wishlist_items" ON wishlist_items FOR INSERT
  TO authenticated WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "update_wishlist_items" ON wishlist_items;
CREATE POLICY "update_wishlist_items" ON wishlist_items FOR UPDATE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  )
  WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

DROP POLICY IF EXISTS "delete_wishlist_items" ON wishlist_items;
CREATE POLICY "delete_wishlist_items" ON wishlist_items FOR DELETE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

-- ============================================================
-- Policies: chat_messages
-- ============================================================
DROP POLICY IF EXISTS "read_chat_messages" ON chat_messages;
CREATE POLICY "read_chat_messages" ON chat_messages FOR SELECT
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "insert_chat_messages" ON chat_messages;
CREATE POLICY "insert_chat_messages" ON chat_messages FOR INSERT
  TO authenticated WITH CHECK (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id()
    )
    OR child_id = public.get_my_child_profile_id()
  );

DROP POLICY IF EXISTS "delete_chat_messages" ON chat_messages;
CREATE POLICY "delete_chat_messages" ON chat_messages FOR DELETE
  TO authenticated USING (
    child_id IN (
      SELECT id FROM children_profiles
      WHERE household_id = public.get_user_household_id() AND public.is_parent()
    )
  );

-- ============================================================
-- Policies: app_settings
-- ============================================================
DROP POLICY IF EXISTS "read_own_app_settings" ON app_settings;
CREATE POLICY "read_own_app_settings" ON app_settings FOR SELECT
  TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "insert_own_app_settings" ON app_settings;
CREATE POLICY "insert_own_app_settings" ON app_settings FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "update_own_app_settings" ON app_settings;
CREATE POLICY "update_own_app_settings" ON app_settings FOR UPDATE
  TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "delete_own_app_settings" ON app_settings;
CREATE POLICY "delete_own_app_settings" ON app_settings FOR DELETE
  TO authenticated USING (user_id = auth.uid());

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_household_members_user_id ON household_members(user_id);
CREATE INDEX IF NOT EXISTS idx_household_members_household_id ON household_members(household_id);
CREATE INDEX IF NOT EXISTS idx_children_profiles_household_id ON children_profiles(household_id);
CREATE INDEX IF NOT EXISTS idx_children_profiles_member_id ON children_profiles(member_id);
CREATE INDEX IF NOT EXISTS idx_hobbies_child_id ON hobbies(child_id);
CREATE INDEX IF NOT EXISTS idx_routine_tasks_household_id ON routine_tasks(household_id);
CREATE INDEX IF NOT EXISTS idx_task_completions_child_id ON task_completions(child_id);
CREATE INDEX IF NOT EXISTS idx_task_completions_task_id ON task_completions(task_id);
CREATE INDEX IF NOT EXISTS idx_task_completions_date ON task_completions(completion_date);
CREATE INDEX IF NOT EXISTS idx_grades_child_id ON grades(child_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_child_id ON wishlist_items(child_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_child_id ON chat_messages(child_id);
CREATE INDEX IF NOT EXISTS idx_app_settings_user_id ON app_settings(user_id);