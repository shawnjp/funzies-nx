import React from 'react';
import { useAuth } from '../context/AuthContext';

interface RoleBadgeProps {
  username: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ username }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex items-center space-x-2">
      <span className="font-bold">{username}</span>
      <span className={`px-2 py-1 rounded-full text-white text-sm font-medium ${isAdmin ? 'bg-purple-600' : 'bg-gray-400'}`}>
        {isAdmin ? 'Admin' : 'Member'}
      </span>
    </div>
  );
};

export default RoleBadge;