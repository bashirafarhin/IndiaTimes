import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="notfound-container">
      <h1>OOPS! 404</h1>
      <h5>Page not Found</h5>
      <img src="/notFound.jpg" />
      <div className="redirect-button" onClick={handleClick}>
        Back to Home
      </div>
    </div>
  );
};

export default NotFound;
