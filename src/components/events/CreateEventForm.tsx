'use client';

import NextLink from 'next/link';

import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useFormState, useFormStatus } from 'react-dom';

import { createEvent } from '@/actions/events';

const CreateEventForm = () => {
  const [errors, action] = useFormState(createEvent, undefined);

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <Typography mb={2} variant="h6" component="h2">Event Information</Typography>
      <Box component="form" action={action} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Event Name"
              name="event_name"
              autoComplete="event_name"
              error={!!errors?.event_name}
              helperText={errors?.event_name?._errors[0]}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="event_location"
              label="Event Location"
              type="event_location"
              autoComplete="event_location"
              error={!!errors?.event_location}
              helperText={errors?.event_location?._errors[0]}
              size="small"
            />
          </Grid>


          <Grid item xs={12} sm={6}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ width: '100%' }}
                label="Event Date"
                name="event_date"
                disablePast
                slotProps={{
                  textField: {
                    error: !!errors?.event_date,
                    helperText: errors?.event_date?._errors[0],
                    size: 'small',
                    fullWidth: true,
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>

          </Grid>
        </Grid>

        <Stack
          flexDirection={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="flex-end"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={{ xs: 1, sm: 2 }} 
          mt={3}
        >
          <Button component={NextLink} href="/dashboard/events">
            Cancel
          </Button>
          <SubmitButton />
        </Stack>
      </Box>

    </Paper>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      loading={pending}
      type="submit"
      variant="contained"
    >
      Create Event
    </LoadingButton>
  )
}

export default CreateEventForm;