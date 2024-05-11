import { Metadata } from 'next';

import Typography from '@mui/material/Typography';

import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Registro',
};

const SignUpPage = async () => {

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <SignUpForm />
    </>
  );
}


export default SignUpPage;