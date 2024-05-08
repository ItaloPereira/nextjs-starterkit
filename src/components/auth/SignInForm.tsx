'use client';

import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions/auth';


const SignInForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entrar
      </Typography>
      <Box component="form" action={dispatch} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <SignInButton />

        {errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </Box>
    </>
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
      Entrar
    </LoadingButton>
  )
}

export default SignInForm;