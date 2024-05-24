import './globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

const publicPages = ['/sign-in', '/sign-up']; // Add paths that don't require user to be signed in

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <AuthProvider> {/* Wrap everything inside ClerkProvider with AuthProvider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default MyApp;