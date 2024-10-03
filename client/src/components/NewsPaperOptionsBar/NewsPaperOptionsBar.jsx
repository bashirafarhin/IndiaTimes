import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { isUserSubscribed } from "../../service/api/user";
import "./NewsPaperOptionsBar.css";

const NewsPaperOptionsBar = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState("ndtvnews");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClick = (channel) => {
    setIsSelected(channel);
    navigate(`/home/${id}/${channel}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await isUserSubscribed(id);
      if (response) {
        setIsSubscribed(response.data.subscription);
      }
    };
    fetchData();
  }, []);

  const options = [
    { id: "ndtvnews", name: "NDTV" },
    { id: "bbcnews", name: "BBC" },
    { id: "timesnownews", name: "Times Now" },
    { id: "hindustantimesnews", name: "Hindustan Times" },
  ];

  if (isSubscribed) {
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
