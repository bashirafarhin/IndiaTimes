import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Feedback.css";
import { submitFeedbackOrQuery } from "../../service/api/user";

const Feedback = () => {
  const { id } = useParams();

  const [isSubmitted, setisSubmitted] = useState(false);

  const [feedback, setFeedback] = useState("");
  const handleChange = (event) => {
    setisSubmitted(false);
    setFeedback(event.target.value);
  };

  const handleClick = async () => {
    let response = await submitFeedbackOrQuery(id, feedback);
    !response
      ? alert("Feedback not submitted. Please try again later.")
      : setisSubmitted(true);
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
