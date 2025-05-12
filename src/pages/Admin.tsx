
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import PreAccessPanel from '@/components/admin/PreAccessPanel';

const Admin = () => {
  const { isAuthenticated } = useAuth();
  const [hasPreAccess, setHasPreAccess] = useState(false);
  
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  if (!hasPreAccess) {
    return <PreAccessPanel onAccess={() => setHasPreAccess(true)} />;
  }
  
  return <AdminLogin />;
};

export default Admin;
