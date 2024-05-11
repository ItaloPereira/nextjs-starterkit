import { Metadata } from 'next';

import PageHeader from "@/components/ui/PageHeader";
import CreateEventForm from '@/components/events/CreateEventForm';
import Stack from '@mui/material/Stack';


export const metadata: Metadata = {
  title: 'Create Event',
};

const CreateEventPage = async () => {
  return (
    <Stack gap={4}>
      <PageHeader title="New Event" breadcrumb={{ label: 'Events', href: '/dashboard/events' }} />
      <CreateEventForm />
    </Stack>
  );
}

export default CreateEventPage;