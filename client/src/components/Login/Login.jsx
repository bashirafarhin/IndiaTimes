import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/login/success`,{ withCredentials: true });
        navigate("/home/ndtvnews");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleLoginUsingGoogle = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className="login-container">
      <div className="typewriter">
        <h1>Welcome! to India Times.</h1>
      </div>
      <img src="/news.svg" />
      <div
        onClick={handleLoginUsingGoogle}
        className="social-button"
        id="google-connect"
      >
        <span>Connect with Google</span>
      </div>
    </div>
  );
};

export default Login;
