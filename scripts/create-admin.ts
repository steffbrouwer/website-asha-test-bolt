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
    // Delete existing user if it exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminUser = existingUser?.users.find(u => u.email === 'admin@asha.nl');
    
    if (adminUser) {
      await supabase.auth.admin.deleteUser(adminUser.id);
    }

    // Sign up the admin user with email confirmation disabled
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@asha.nl',
      password: 'asha123',
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          email_confirmed: true
        }
      }
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