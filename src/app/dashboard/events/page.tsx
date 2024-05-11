import { Metadata } from 'next';
import NextLink from 'next/link';
import { Suspense } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

import PageHeader from "@/components/ui/PageHeader";
import EventsTableWrapper from "@/components/events/EventsTableWrapper";
import EventsTableSkeleton from "@/components/events/EventsTableSkeleton";

export const metadata: Metadata = {
  title: 'Events',
};

const EventsPage = async () => {
  return (
    <Stack gap={4}>
      <PageHeader title="Events">
        <Box>
          <Button startIcon={<AddIcon />} variant="contained" component={NextLink} href="/dashboard/events/create">
            New Event
          </Button>
        </Box>
      </PageHeader>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Suspense fallback={<EventsTableSkeleton />}>
            <EventsTableWrapper />
          </Suspense>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default EventsPage;