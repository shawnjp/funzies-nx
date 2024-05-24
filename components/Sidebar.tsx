import { useState } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useClerk, SignInButton,useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';// Import useAuth
import { useAuth } from '../context/AuthContext'; // Import useAuth from AuthContext

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { isAdmin } = useAuth();

  return (
    <div className={`sidebar w-84 h-full shadow-md bg-white absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative transition duration-200 ease-in-out`}>
      <div className="sidebar-header p-5 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton ><a className="sidebar-signin">Sign In</a></SignInButton>                 
        </SignedOut>
      </div>
      <ul className="sidebar-links flex flex-col items-center">
        {['/', '/about', '/services', '/contact', '/inventory'].map((path) => (
          <li key={path} className={`sidebar-links-a p-4 hover:bg-gray-100 ${router.pathname === path ? 'text-yellow-500 bg-yellow-200' : ''}`}>
            <Link href={path} className={`block p-2 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow ${router.pathname === path ? 'text-yellow-500 bg-yellow-200' :'text-white' }`}>
                {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          </li>
        ))}
        <SignedIn>
        {isAdmin && (
            <li className={`sidebar-links-a p-4 hover:bg-gray-100 ${router.pathname === '/inventory' ? 'text-yellow-500 bg-yellow-200' : ''}`}>
              <Link href="/inventory" className={`block p-2 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow ${router.pathname === '/inventory' ? 'text-yellow-500 bg-yellow-200' : 'text-white'}`}>
                Inventory Management
              </Link>
            </li>
          )}
        </SignedIn>
      </ul>
    </div>
  );
};

export default Sidebar;