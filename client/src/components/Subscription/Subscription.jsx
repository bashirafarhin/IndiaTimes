import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Subscription.css";
import PricingBox from "./PricingBox/PricingBox";
import PaymentPolicy from "./PaymentPolicy/PaymentPolicy";
import { UserContext } from "../../context/userContext";

const Subscription = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState("2rem");
  const amount = import.meta.env.VITE_PREMIUM_PRICE;
  const type = "premium";

  const handleSubscriptionClick = async () => {
    if (user.subscription) {
      setFontSize("3rem");
      setTimeout(() => {
        setFontSize("2.5rem");
      }, 600);
    } else {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/payment/getkey`,{ withCredentials: true});
        if (res) {
          const {
            data: { key },
          } = res;
          const orderRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/checkout`,{ amount, type },{ withCredentials: true,});
          if (orderRes) {
            const {
              data: { order },
            } = orderRes;
            const options = {
              key: key,
              amount: order.amount,
              currency: "INR",
              name: "India Times",
              description: "Test Transaction",
              image: "/news.svg",
              order_id: order.id,
              callback_url: `${
                import.meta.env.VITE_BACKEND_URL
              }/payment/paymentVerification`,
              prefill: {
                name: user.name,
                email: user.email,
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#000000",
              },
            };
            const razor = new window.Razorpay(options);
            razor.open();
            navigate(-1);
          } else {
            alert("Failed to create the order. Please try again later.");
          }
        } else {
          alert("We are facing some issue. Please try again later.");
        }
      } catch (error) {
        alert("Payment failed. Try again later.");
      }
    }
  };

  return (
    <div className="page-background">
      <div className="subscription-container">
        {user.subscription && (
          <div
            style={{
              fontSize: fontSize,
              transition: "font-size 0.5s ease",
            }}
            className="already-a-member"
          >
            You are a premium member !
          </div>
        )}
        <PricingBox amount={amount} handleClick={handleSubscriptionClick} />
      </div>

      <div className="non-premium-members">
        <h2>Upgrade to Premium for an Enhanced Experience</h2>
        <p>
          <strong>Access Limitations:</strong> As a non-premium member, you can
          view up to 10 articles.
        </p>
        <br />
        <p>
          <strong>Exclusive Categories:</strong> Premium membership provides
          access to exclusive categories and content.
        </p>
      </div>
      <PaymentPolicy />
    </div>
  );
};

export default Subscription;
