import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../service/api/user";
import { checkout, getKey } from "../../service/api/payment";
import "./Subscription.css";
import PricingBox from "./PricingBox/PricingBox";
import PaymentPolicy from "./PaymentPolicy/PaymentPolicy";

const Subscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    subscription: false,
  });

  const [fontSize, setFontSize] = useState("2rem");
  const amount = import.meta.env.VITE_PREMIUM_PRICE;
  const type = "premium";

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserDetails(id);
      if (res) {
        const { name, email, subscription } = res.data;
        setUser({ name, email, subscription });
      } else {
        alert("Error fetching details. please try again later");
      }
    };
    fetchData();
  }, []);

  const handleSubscriptionClick = async () => {
    if (user.subscription) {
      setFontSize("3rem");
      setTimeout(() => {
        setFontSize("2.5rem");
      }, 600);
    } else {
      try {
        const res = await getKey();
        if (res) {
          const {
            data: { key },
          } = res;
          const orderRes = await checkout(amount, type);
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
              }/api/paymentVerification`,
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
