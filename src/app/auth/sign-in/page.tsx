import { Metadata } from 'next';

import Typography from '@mui/material/Typography';

import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <SignInForm />
    </>
  );
}

export default SignInPage;