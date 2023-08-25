
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { checkAuthentication } from '../../utils/authUtils';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const checkAuth = async () => {

    try {

      const userStatus = await checkAuthentication();
      const authStat = userStatus.isAuthenticated;
      console.log({ authStat });
      setIsAuthenticated(authStat);

    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const getAuth = async () => {
      await checkAuth();
    };

    getAuth();

  }, []);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

