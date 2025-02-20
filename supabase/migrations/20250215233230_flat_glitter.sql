/*
  # Initial schema setup for Audience Masters

  1. New Tables
    - users
      - Custom user data extending auth.users
    - shows
      - TV show information
    - predictions
      - User predictions for shows
    - user_settings
      - User preferences and settings

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Users table for additional user data
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Shows table
CREATE TABLE IF NOT EXISTS shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  channel TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  description TEXT,
  host TEXT,
  genre TEXT,
  image_url TEXT,
  expected_audience INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  prediction_value INTEGER NOT NULL,
  accuracy FLOAT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, show_id)
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark',
  email_notifications BOOLEAN DEFAULT true,
  public_profile BOOLEAN DEFAULT true,
  show_predictions BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Shows are readable by everyone
CREATE POLICY "Shows are publicly readable"
  ON shows
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can modify shows
CREATE POLICY "Admins can modify shows"
  ON shows
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND id IN (SELECT user_id FROM user_settings WHERE is_admin = true)
  ));

-- Users can read all predictions
CREATE POLICY "Predictions are publicly readable"
  ON predictions
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create their own predictions
CREATE POLICY "Users can create own predictions"
  ON predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own settings
CREATE POLICY "Users can read own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
