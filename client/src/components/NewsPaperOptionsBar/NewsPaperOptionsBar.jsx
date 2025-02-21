import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./NewsPaperOptionsBar.css";

const NewsPaperOptionsBar = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState("ndtvnews");

  const handleClick = (channel) => {
    setIsSelected(channel);
    navigate(`/home/${channel}`);
  };

  const options = [
    { id: "ndtvnews", name: "NDTV" },
    { id: "bbcnews", name: "BBC" },
    { id: "timesnownews", name: "Times Now" },
    { id: "hindustantimesnews", name: "Hindustan Times" },
  ];

  if (user.subscription) {
    options.push({
      id: "newyorktimesnews",
      name: "NewYork Times",
      isPremium: true,
    });
  }

  return (
    <div className="options-bar">
      {options.map((channel) => (
        <div
          key={channel.id}
          onClick={() => handleClick(channel.id)}
          className={`${channel.isPremium ? "premium" : ""} ${
            isSelected === channel.id ? "underline" : ""
          }`}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
};

export default NewsPaperOptionsBar;
