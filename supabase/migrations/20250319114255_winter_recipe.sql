/*
  # Add admin user credentials

  1. Changes
    - Insert admin user with specified email
    - Link admin user to admin role
*/

-- Insert admin user if it doesn't exist
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get or create user ID from auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@asha.nl';

  -- If user doesn't exist in auth.users, we can't proceed
  -- User needs to be created through auth.sign_up
  IF v_user_id IS NULL THEN
    -- Insert into users table
    INSERT INTO users (id, email)
    VALUES (auth.uid(), 'admin@asha.nl');
  END IF;

  -- Link user to admin role if not already linked
  IF NOT EXISTS (
    SELECT 1 FROM roles_per_user rpu
    JOIN roles r ON r.id = rpu.role_id
    WHERE r.name = 'admin'
    AND rpu.user_id = v_user_id
  ) THEN
    INSERT INTO roles_per_user (user_id, role_id)
    SELECT v_user_id, r.id
    FROM roles r
    WHERE r.name = 'admin';
  END IF;
END $$;