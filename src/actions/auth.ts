'use server';

import { signIn, signOut as authSignOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import type { User } from '@/types/user';
import { revalidatePath } from 'next/cache';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid Credentials';
        default:
          return 'Internal Error';
      }
    }
    throw error;
  }
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const SignInFormSchema = z.object({
  email: z.string().email('Invalid Email').min(5, 'Invalid Email'),
  password: z.string().min(1, 'Password is required'),
});

export async function signIn_(prevState: any, formData: FormData) {
  const { data, error } = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error) {
    return error.format();
  }

  const user = await getUser(data.email);

  if (!user) return null;

  const passwordsMatch = await bcrypt.compare(data.password, user.password);

  if (passwordsMatch) await signIn('credentials', user);
}

const SignUpFormSchema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid Email').min(5, 'Invalid Email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function signUp(prevState: any, formData: FormData) {
  const { data, error } = SignUpFormSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error) {
    return error.format();
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${hashedPassword})
    `;
  } catch (error) {
    throw new Error('Database Error: Error creating event');
  }

  await signIn_(null, formData);
  
}

export async function signOut() {
  await authSignOut();
}