import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const ProfilePage = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Redirect to Clerk profile page if the user is signed in
    if (isSignedIn) {
        window.location.href = `https://suitable-salmon-40.accounts.dev/user`;
    } else {
      // Redirect to sign-in page if not signed in
      window.location.href = 'https://suitable-salmon-40.accounts.dev/sign-in';
    }
  }, [isSignedIn, user, router]);

  return null; // Render nothing while redirecting
};

export default ProfilePage;