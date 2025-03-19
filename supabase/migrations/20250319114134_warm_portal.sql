/*
  # Add admin user and role

  1. Changes
    - Insert default admin role
    - Insert admin user
    - Link admin user to admin role

  2. Security
    - Password will need to be set through the UI
*/

-- Insert admin role if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM roles WHERE name = 'admin') THEN
    INSERT INTO roles (name, description)
    VALUES ('admin', 'Administrator with full access');
  END IF;
END $$;