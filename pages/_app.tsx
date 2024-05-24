import { useEffect } from 'react';
import './globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';

const publicPages = ['/sign-in', '/sign-up'];

function UserComponent() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserAdminStatus(user.id);
    }
  }, [user]);

  const fetchUserAdminStatus = async (clerkId: string) => {
    try {
      const response = await fetch(`/api/users?clerkId=${clerkId}`);
      const data = await response.json();
      if (data.user) {
        console.log(`isAdmin: ${data.user.isAdmin}`);
      } else {
        console.log('User not found in custom database');
      }
    } catch (error) {
      console.error('Failed to fetch user admin status:', error);
    }
  };

  return null; // This component does not render anything
}

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default MyApp;