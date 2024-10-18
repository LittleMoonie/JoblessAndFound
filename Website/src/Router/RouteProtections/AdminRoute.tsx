import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

interface AdminRouteProps {
  children: ReactElement;
  requireduserTypeIds: number[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, requireduserTypeIds }) => {
  const { isAuthenticated, isLoading, checkAuthStatus, userTypeId } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    console.log(`User type ID: ${userTypeId}, Required type IDs: ${requireduserTypeIds}`);
  }, [userTypeId, requireduserTypeIds]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (userTypeId === null || userTypeId === undefined || !requireduserTypeIds.includes(userTypeId)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

export default AdminRoute;
