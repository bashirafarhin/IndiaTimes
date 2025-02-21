import { useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {

  const [isSubmitted, setisSubmitted] = useState(false);

  const [feedback, setFeedback] = useState("");
  const handleChange = (event) => {
    setisSubmitted(false);
    setFeedback(event.target.value);
  };

  const handleClick = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feedback`, { feedback },{ withCredentials: true });
      setisSubmitted(true);
    } catch (error) {
      alert("An error occurred while submitting feedback. Please try again later.");
    }
  };

  return (
    <div className="feedback-container">
      <div>
        <form>
          <textarea
            onChange={handleChange}
            value={feedback}
            placeholder="Enter your feedback or any Query you have"
            rows={5}
          />
        </form>
      </div>
      <div className="feedback-button" onClick={handleClick}>
        Submit
      </div>
      {isSubmitted && <p>Your feedback is submitted.</p>}
    </div>
  );
};

export default Feedback;
