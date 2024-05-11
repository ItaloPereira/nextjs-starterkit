import { sql } from '@vercel/postgres';
import { auth } from "@/auth"

import type { Event } from '@/types/events';

const sleep = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms));

export async function getEvents() {
  const session = await auth();

  const userId = session?.user.id;

  try {
    const user = await sql`SELECT * FROM events WHERE user_id=${userId}`;
    // await sleep(500);
    return user.rows as Event[];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}