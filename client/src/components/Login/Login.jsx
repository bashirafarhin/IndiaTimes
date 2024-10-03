import { useEffect } from "react";
import { isUserAuthenticated } from "../../service/api/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let res = await isUserAuthenticated();
      if (res && res.data.authenticated) {
        navigate(`/home/${res.data.userId}/ndtvnews`);
      } else {
        navigate(`/`);
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
