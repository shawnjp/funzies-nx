import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import RoleBadge from '../components/RoleBadge';
// Define the context shape
interface AuthContextType {
  isAdmin: boolean;
  user: ReturnType<typeof useUser>['user'];
  fetchUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAdminStatus(user.id);
    }
  }, [user]);

  const fetchAdminStatus = async (clerkId: string) => {
    try {
      const response = await fetch(`/api/users?clerkId=${clerkId}`);
      const data = await response.json();
      if (data.user) {
        setIsAdmin(data.user.isAdmin);  // Assuming `isAdmin` is a property of the user object in your database
      }
    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  };

  const fetchUsers = async () => {
    if (!user) {
      console.error('No user logged in');
      return;
    }

    try {
      const response = await fetch(`/api/users?clerkId=${user.id}`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Users:', data);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, user, fetchUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};