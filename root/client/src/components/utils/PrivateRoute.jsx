import React, { useState, useEffect, useContext } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { checkAuthentication } from "../../utils/authUtils";
import { PageContext } from "../../context/context";

const PrivateRoute = () => {
  const { page, setPage } = useContext(PageContext);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const userStatus = await checkAuthentication();
      const authStat = userStatus.isAuthenticated;
      console.log({ authStat });
      setIsAuthenticated(authStat);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setPage("private-route");
    const getAuth = async () => {
      await checkAuth();
    };

    getAuth();
  }, []);

  if (isAuthenticated === undefined) {
    return <Navigate to="/onboard1" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
