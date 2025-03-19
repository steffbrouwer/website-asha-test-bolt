/*
  # Initial Schema Setup

  1. New Tables
    - `users`: Stores user account information
    - `roles`: Defines available roles (admin, user, etc.)
    - `roles_per_user`: Links users to their roles
    - `calendars`: Stores calendar information
    - `activities`: Stores activity information
    - `contactpersons`: Stores contact person information
    - `volunteers`: Stores volunteer applications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Roles per user table
CREATE TABLE IF NOT EXISTS roles_per_user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

ALTER TABLE roles_per_user ENABLE ROW LEVEL SECURITY;

-- Calendars table
CREATE TABLE IF NOT EXISTS calendars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  time TIME,
  place TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  calendar_id UUID REFERENCES calendars(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Contact persons table
CREATE TABLE IF NOT EXISTS contactpersons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  function TEXT,
  email TEXT UNIQUE,
  phone_number TEXT,
  picture_url TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contactpersons ENABLE ROW LEVEL SECURITY;

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins can read all roles
CREATE POLICY "Admins can read roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles_per_user
      WHERE user_id = auth.uid()
      AND role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Users can read their own roles
CREATE POLICY "Users can read own roles"
  ON roles_per_user
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can read their own calendars
CREATE POLICY "Users can read own calendars"
  ON calendars
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Everyone can read activities
CREATE POLICY "Everyone can read activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

-- Admins can manage activities
CREATE POLICY "Admins can manage activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles_per_user
      WHERE user_id = auth.uid()
      AND role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Everyone can read contact persons
CREATE POLICY "Everyone can read contact persons"
  ON contactpersons
  FOR SELECT
  TO authenticated
  USING (true);

-- Admins can manage contact persons
CREATE POLICY "Admins can manage contact persons"
  ON contactpersons
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles_per_user
      WHERE user_id = auth.uid()
      AND role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Everyone can create volunteer applications
CREATE POLICY "Everyone can create volunteer applications"
  ON volunteers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins can manage volunteer applications
CREATE POLICY "Admins can manage volunteer applications"
  ON volunteers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles_per_user
      WHERE user_id = auth.uid()
      AND role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );