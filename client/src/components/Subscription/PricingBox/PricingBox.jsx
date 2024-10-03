import "./PricingBox.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PricingBox = ({ amount, handleClick }) => {
  return (
    <div className="premium-container">
      <div className="premium-container-title">
        <h1>Premium</h1>
      </div>
      <div className="premium-price">
        <h1>₹ {amount}</h1>
        <p>/mo.</p>
      </div>
      <div className="premium-features">
        <h3>Features</h3>
        <p>Unlimited Articles</p>
        <p>Exclusive Categories</p>
      </div>
      <div className="premium-button" onClick={() => handleClick()}>
        get premium <ArrowForwardIcon className="forward-arrow" />
      </div>
    </div>
  );
};

export default PricingBox;
