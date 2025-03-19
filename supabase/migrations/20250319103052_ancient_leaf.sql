/*
  # Initial database schema setup

  1. Tables
    - users (handled by Supabase Auth)
    - roles
      - id (integer, primary key)
      - name (varchar, unique)
      - description (text)
      - timestamps
    - roles_per_user
      - id (integer, primary key)
      - user_id (references auth.users)
      - role_id (references roles)
      - assigned_at (timestamp)
    - calendars
      - id (integer, primary key)
      - user_id (references auth.users)
      - name (varchar)
    - activities
      - id (integer, primary key)
      - title (varchar)
      - description (text)
      - start_date (date)
      - end_date (date)
      - time (time)
      - place (varchar)
      - user_id (references auth.users)
      - calendar_id (references calendars)
      - timestamps
    - contactpersons
      - id (integer, primary key)
      - name (varchar)
      - function (varchar)
      - email (varchar, unique)
      - phone_number (varchar)
      - picture_url (varchar)
      - user_id (references auth.users)
    - volunteers
      - id (integer, primary key)
      - first_name (varchar)
      - last_name (varchar)
      - email (varchar, unique)
      - phone_number (varchar)
      - comment (text)
      - status (varchar)
      - timestamps

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create roles_per_user table
CREATE TABLE IF NOT EXISTS roles_per_user (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id integer REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now()
);

-- Create calendars table
CREATE TABLE IF NOT EXISTS calendars (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  time time,
  place varchar(255),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  calendar_id integer REFERENCES calendars(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create contactpersons table
CREATE TABLE IF NOT EXISTS contactpersons (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  function varchar(255),
  email varchar(255) UNIQUE,
  phone_number varchar(255),
  picture_url varchar(255),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id serial PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  phone_number varchar(255),
  comment text,
  status varchar(255) DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles_per_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactpersons ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view roles" ON roles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view their roles" ON roles_per_user FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their calendars" ON calendars FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their calendars" ON calendars FOR ALL TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view activities" ON activities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their activities" ON activities FOR ALL TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view contactpersons" ON contactpersons FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage contactpersons if admin" ON contactpersons FOR ALL TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM roles_per_user rpu
    JOIN roles r ON r.id = rpu.role_id
    WHERE rpu.user_id = auth.uid() AND r.name = 'admin'
  )
);

CREATE POLICY "Users can view volunteers" ON volunteers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create volunteer applications" ON volunteers FOR INSERT TO anon USING (true);

CREATE POLICY "Admins can manage volunteers" ON volunteers FOR ALL TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM roles_per_user rpu
    JOIN roles r ON r.id = rpu.role_id
    WHERE rpu.user_id = auth.uid() AND r.name = 'admin'
  )
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('user', 'Regular user with limited access')
ON CONFLICT (name) DO NOTHING;