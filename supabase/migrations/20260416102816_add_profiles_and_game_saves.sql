/*
  # Add Profiles and Game Saves

  1. New Tables
    - `profiles`
      - `id` (uuid, PK, references auth.users)
      - `username` (text, unique, 2-20 chars)
      - `created_at` (timestamptz)
    - `game_saves`
      - `user_id` (uuid, PK, references auth.users)
      - `game_data` (jsonb) — full serialized game state
      - `updated_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Profiles: anyone can SELECT (needed for username availability check), only owner can INSERT/UPDATE
    - Game saves: only owner can SELECT/INSERT/UPDATE

  3. Notes
    - Username uniqueness enforced at DB level
    - game_data stores crumbs, upgrades, skins, codes, etc. — excludes ephemeral fields
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL CHECK (char_length(username) BETWEEN 2 AND 20),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS game_saves (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  game_data jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "User can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "User can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "User can read own save"
  ON game_saves FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "User can insert own save"
  ON game_saves FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own save"
  ON game_saves FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
