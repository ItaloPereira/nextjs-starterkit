'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import Link from '@/components/ui/Link';

import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/actions/auth';


const SignUpForm = () => {
  const [errors, action] = useFormState(signUp, undefined);

  return (
    <Box component="form" action={action} noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="first_name"
            required
            fullWidth
            id="first_name"
            label="First Name"
            size="small"
            autoFocus
            error={!!errors?.first_name}
            helperText={errors?.first_name?._errors[0]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
            size="small"
            error={!!errors?.last_name}
            helperText={errors?.last_name?._errors[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            size="small"
            error={!!errors?.email}
            helperText={errors?.email?._errors[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            size="small"
            error={!!errors?.password}
            helperText={errors?.password?._errors[0]}
          />
        </Grid>
      </Grid>

      <SignUpButton />

      {errors?.general && (
        <Alert severity="error" sx={{ mb: 2 }}>{errors?.general?._errors[0]}</Alert>
      )}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link variant="body2" href="/auth/sign-in">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      loading={pending}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign Up
    </LoadingButton>
  )
}

export default SignUpForm;