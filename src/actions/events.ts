'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from "@/auth"
import { format } from 'date-fns';

const CreateEventFormSchema = z.object({
  user_id: z.string(),
  event_name: z.string().min(1, 'Event Name is required'),
  event_location: z.string().min(1, 'Event Location is required'),
  event_date: z.string().min(1, 'Event Date is required'),
});

const CreateEvent = CreateEventFormSchema.omit({ user_id: true });
  
export async function createEvent(prevState: any, formData: FormData) {
  const session = await auth();

  const { data, error } = CreateEvent.safeParse({
    event_name: formData.get('event_name'),
    event_location: formData.get('event_location'),
    event_date: formData.get('event_date'),
  });
  
  if (error) {
    return error.format();
  }

  const userId = session?.user.id;
  const formatedEventDate = format(data.event_date, "yyyy-MM-dd");

  try {
    await sql`
      INSERT INTO events (user_id, name, location, date)
      VALUES (${userId}, ${data.event_name}, ${data.event_location}, ${formatedEventDate})
    `;
  } catch (error) {
    throw new Error('Database Error: Error creating event');
  }

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}