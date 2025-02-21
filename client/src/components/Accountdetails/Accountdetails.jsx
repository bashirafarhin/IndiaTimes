import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Accountdetails.css";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const Accountdetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    subscription: user.subscription,
  });
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = async () => {
    if (isReadOnly) {
      setIsReadOnly(false);
    } else {
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-user`, updatedUser, { withCredentials: true });
        setIsReadOnly(true)
      } catch(err) {
        console.log(err, "Error during Updatation of details of user");
      }
    }
  };

  const handleClickLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.log(err, "Error during logout");
    }
  };

  return (
    <div className="details-container">
      <div className="detail">
        <label htmlFor="fullName">Full Name</label>
        <input
          name="name"
          className={isReadOnly ? "editable" : "not-editable"}
          type="text"
          value={updatedUser.name}
          readOnly={isReadOnly}
          onChange={handleInputChange}
        />
      </div>
      <div className="detail">
        <label htmlFor="email">Email</label>
        <input name="email" type="text" value={updatedUser.email} readOnly />
      </div>
      <div className="subscription">
        <p>Subscribed:</p>
        {updatedUser.subscription ? "Yes" : "No"}
      </div>
      <div onClick={handleButtonClick} className="button">
        {isReadOnly ? "Update" : "Save"}
      </div>
      <div onClick={handleClickLogout} className="logout-button button">
        Logout
      </div>
    </div>
  );
};

export default Accountdetails;
