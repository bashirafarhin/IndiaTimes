import { useNavigate } from "react-router-dom";
import FeedbackIcon from "@mui/icons-material/Feedback";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handlePremiumClick = () => {
    navigate(`/pricing`);
  };

  const handleAccountClick = () => {
    navigate(`account`);
  };

  const handleFeedbackClick = () => {
    navigate(`Feedback`);
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <h1 onClick={handleLogoClick}>India Times</h1>
        </div>
        <div className="user-options">
          <div onClick={handleAccountClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <path
                fill="#1C1C1C"
                fillRule="evenodd"
                d="M20.654 16.692C23.256 15.115 25 12.265 25 9c0-4.971-4.029-9-9-9S7 4.029 7 9c0 3.265 1.744 6.115 4.346 7.692C4.78 18.686 0 24.783 0 32h32c0-7.217-4.78-13.314-11.346-15.308zM8 9a8 8 0 0 1 16 0 7.998 7.998 0 0 1-4.786 7.323 8.024 8.024 0 0 1-1.514.492l-.036.009a8.05 8.05 0 0 1-.717.115c-.036.004-.07.012-.106.016a7.814 7.814 0 0 1-1.68 0c-.036-.004-.07-.012-.106-.016a8.05 8.05 0 0 1-.717-.115l-.036-.009A7.996 7.996 0 0 1 8 9zm4.719 8.374c1.018.399 2.122.626 3.281.626s2.263-.227 3.281-.626C25.664 18.803 30.506 24.295 30.95 31H1.05c.444-6.705 5.286-12.197 11.669-13.626z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div onClick={handlePremiumClick}>
            <svg
              className="premium-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              enableBackground="new 0 0 128 128"
              viewBox="0 0 128 128"
              id="crown"
            >
              <path
                fill="#3c4652"
                d="M115.1,35.8c-5.9,0.1-10.8,5.3-10.5,11.2c0.1,3.3,1.7,6.1,4.1,8c-12.4,16.6-25,17.9-39.6-9.6
	c5.2-2.6,8.1-9.2,4.3-15.8c-1.8-3.2-5.5-4.8-9.2-4.6c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.2,0c-3.7-0.1-7.3,1.4-9.2,4.6
	c-3.8,6.6-0.9,13.2,4.3,15.8C44.3,72.9,31.7,71.6,19.3,55c2.4-1.9,4-4.8,4.1-8c0.2-5.9-4.6-11.1-10.5-11.2c-6.1-0.1-11,4.7-11,10.8
	c0,5.9,4.8,10.8,10.8,10.8c0.4,0,0.9,0,1.3-0.1l4.1,40.2c0.3,3.2,3,5.6,6.2,5.6H64h39.7c3.2,0,5.9-2.4,6.2-5.6l4.1-40.2
	c0.4,0.1,0.8,0.1,1.3,0.1c5.9,0,10.8-4.8,10.8-10.8C126.1,40.5,121.1,35.7,115.1,35.8z"
              ></path>
            </svg>
          </div>
          <div>
            <FeedbackIcon
              sx={{ width: "35px", height: "45px", color: "#3c4652" }}
              onClick={handleFeedbackClick}
            />
          </div>
        </div>
      </div>
      <div className="tagline">
        <h3>
          Busy schedule? India Times curates the top headlines for you, saving
          you hours each week.
        </h3>
      </div>
    </>
  );
};

export default Header;
