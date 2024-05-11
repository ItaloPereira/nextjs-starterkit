import EventsTable from './EventsTable';

import { getEvents } from '@/data/events';


const EventTableWrapper = async () => {
  const events = await getEvents();

  return (
    <EventsTable events={events} />
  )
}

export default EventTableWrapper;