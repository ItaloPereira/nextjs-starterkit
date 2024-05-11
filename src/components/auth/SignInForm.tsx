'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import Link from '@/components/ui/Link';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn_ } from '@/actions/auth';


const SignInForm = () => {
  const [errors, action] = useFormState(signIn_, undefined);

  return (
    <Box component="form" action={action} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        size='small'
        error={!!errors?.email}
        helperText={errors?.email?._errors[0]}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        size='small'
        error={!!errors?.password}
        helperText={errors?.password?._errors[0]}
      />

      <SignInButton />

      {errors?.general && (
        <Alert severity="error" sx={{ mb: 2 }}>{errors?.general?._errors[0]}</Alert>
      )}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/auth/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      loading={pending}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </LoadingButton>
  )
}

export default SignInForm;