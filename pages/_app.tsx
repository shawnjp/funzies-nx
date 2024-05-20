import './globals.css'; // Adjust the path if your directory structure is different
import type { AppProps } from 'next/app';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const publicPages = ['/sign-in', '/sign-up']; // Add paths that don't require user to be signed in

function MyApp({ Component, pageProps }: AppProps) {
   const { pathname } = useRouter();
  return (
    
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <Layout>
      {publicPages.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
      </Layout>
    </ClerkProvider>
    
  );
}

export default MyApp;