import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {  // Only fetch user if not already in context
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/login/success`,{ withCredentials: true }
          );
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate, user, setUser]);

  // Wait for user state to be updated before rendering children
  if (!user) {
    return <p>Loading...</p>; // Show loading indicator instead of redirecting immediately
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
