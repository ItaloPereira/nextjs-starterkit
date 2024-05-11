import type { NextAuthConfig, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      first_name: string;
      last_name: string;
    } & DefaultSession['user'];
  }
}
 
export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/home', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        }
      }
      
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;