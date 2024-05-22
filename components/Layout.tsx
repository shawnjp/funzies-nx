import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useUser } from '@clerk/nextjs';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user } = useUser();
  const { id, username, imageUrl, emailAddresses } = user || {};
  const email = emailAddresses?.[0]?.emailAddress || 'No email';

  console.log('Clerk User Data:', { id, username, imageUrl, email });
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;