/*
  # Create Toast Clicker Leaderboard

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `player_name` (text, required, max 20 chars)
      - `total_crumbs` (bigint, score)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `leaderboard` table
    - Allow anyone to read top scores (public leaderboard)
    - Allow authenticated or anonymous inserts (anyone can submit a score)
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL CHECK (char_length(player_name) BETWEEN 1 AND 20),
  total_crumbs bigint NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert score"
  ON leaderboard FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
