import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function createAdminUser() {
  try {
    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@asha.nl',
      password: 'asha123',
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }

    console.log('Admin user created successfully:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createAdminUser();