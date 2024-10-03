import "./PaymentPolicy.css";

const PaymentPolicy = () => {
  return (
    <>
      <div className="important-points">
        <h2>No Refunds and Cancellation Policy</h2>
        <p>
          We appreciate your interest in our premium subscription service.
          Please note the following terms regarding refunds and cancellations:
        </p>
        <p>
          <strong>No Refunds</strong>: All sales are final. Once a premium
          subscription is purchased, we do not offer refunds, whether in part or
          in full.
        </p>
        <p>
          <strong>No Cancellations</strong>: Premium subscriptions cannot be
          cancelled after purchase. Your subscription will remain active until
          the end of the billing cycle.
        </p>
        <br />
        <p>
          By subscribing to our premium service, you agree to these terms and
          conditions.
        </p>
        <br />
        <p>
          If you have any questions or need further assistance, please contact
          our support team at{" "}
          <a href={`mailto:${import.meta.env.VITE_ADMIN_EMAIL}`}>
            Contact Support
          </a>
          .
        </p>
        <p>Thank you for your understanding and support.</p>
      </div>

      <div className="contact">
        For any queries, please visit us at{" "}
        <h6>{import.meta.env.VITE_ADMIN_ADDRESS}.</h6>
        contact our helpline at <h6>{import.meta.env.VITE_ADMIN_PHONE}</h6>
      </div>
    </>
  );
};

export default PaymentPolicy;
