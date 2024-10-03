import { useNavigate } from "react-router-dom";
import "./Paymentfailure.css";

const Paymentfailure = () => {
  const navigate = useNavigate();
  return (
    <div className="payment-failure">
      <h1>Payment Failed</h1>
      <p>We encountered an error processing your payment. Please try again.</p>
      <button onClick={() => navigate(-1)}>Retry Payment</button>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Paymentfailure;
