import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer-container">
      © copyright {year}. All rights reserved.
    </div>
  );
};

export default Footer;
