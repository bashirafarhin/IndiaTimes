import { useState, useEffect } from "react";
import { updateUserdetails, getUserDetails } from "../../service/api/user";
import "./Accountdetails.css";
import { useParams } from "react-router-dom";

const Accountdetails = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    subscription: false,
  });
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserDetails(id);
      if (res) {
        const { name, email, subscription } = res.data;
        setUser({ name, email, subscription });
      } else {
        alert("Error fetching details. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = async () => {
    if (isReadOnly) {
      setIsReadOnly(false);
    } else {
      let response = await updateUserdetails(id, user);
      response
        ? setIsReadOnly(true)
        : alert("Failed to update profile. Please try again later.");
    }
  };

  const handleClickLogout = async () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
  };

  return (
    <div className="details-container">
      <div className="detail">
        <label htmlFor="fullName">Full Name</label>
        <input
          name="name"
          className={isReadOnly ? "editable" : "not-editable"}
          type="text"
          value={user.name}
          readOnly={isReadOnly}
          onChange={handleInputChange}
        />
      </div>
      <div className="detail">
        <label htmlFor="email">Email</label>
        <input name="email" type="text" value={user.email} readOnly />
      </div>
      <div className="subscription">
        <p>Subscribed:</p>
        {user.subscription ? "Yes" : "No"}
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
