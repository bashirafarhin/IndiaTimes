import { useLocation, useNavigate } from "react-router-dom";
import "./Paymentsuccess.css";

const Paymentsuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="payment-success">
      <h1>Payment Successful!</h1>
      {reference && <p>Your payment reference ID is: {reference}</p>}
      <div className="success-redirect" onClick={handleClick}>
        Back to Home
      </div>
    </div>
  );
};

export default Paymentsuccess;
