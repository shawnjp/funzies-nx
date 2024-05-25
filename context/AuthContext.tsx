import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

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
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users?clerkId=${user.id}`, {
            method: 'GET'
          });
          const data = await response.json();
          if (response.ok && data.user) {
            setIsAdmin(data.user.isAdmin);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching admin status:', error);
          setIsAdmin(false);
        }
      }
    };

    fetchAdminStatus();
  }, [user]);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};