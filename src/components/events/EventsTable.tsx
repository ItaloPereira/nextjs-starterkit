'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import type { Event } from '@/types/events';

interface EventsTableProps {
  events: Event[];
}

const EventsTable = ({ events }: EventsTableProps) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const visibleEvents = useMemo(
    () =>
      events.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, events],
  );

  if (events.length === 0) {
    return (
      <Stack>
        <Typography variant="h6" component="h2">There are no events for now :(</Typography>
        <Typography variant="body1" component="p">Create one to start managing it!</Typography>
      </Stack>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Location</TableCell>
              <TableCell>Event Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleEvents.map((event) => (
              <TableRow
                key={event.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="event">
                  {event.name}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{format(event.date, "MM-dd-yyyy")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer >
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={events.length}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default EventsTable;