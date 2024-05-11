'use server';

import { signIn, signOut as authSignOut } from '@/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/data/user';

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
    return {
      ...error.format(),
      general: null
    };
  }

  const user = await getUser(data.email);

  if (!user) {
    return {
      general: {
        _errors: ['Invalid Credentials']
      },
      email: null,
      password: null,
    };
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password);

  if (passwordsMatch) {
    await signIn('credentials', user);
    revalidatePath('/dashboard/home');
    return redirect('/dashboard/home');
  } 

  return {
    general: {
      _errors: ['Invalid Credentials']
    },
    email: null,
    password: null,
  };
}

const SignUpFormSchema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid Email').min(5, 'Invalid Email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function signUp(prevState: any, formData: FormData) {
  const defaultErrors = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    general: null,
  }

  const { data, error } = SignUpFormSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error) {
    return {
      ...defaultErrors,
      ...error.format(),
    }
  }

  const user = await getUser(data.email);

  if (user) return {
    ...defaultErrors,
    general: {
      _errors: ['User with this email already exists.']
    },
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${hashedPassword})
    `;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }

  await signIn_(null, formData);
}

export async function signOut() {
  await authSignOut();
}