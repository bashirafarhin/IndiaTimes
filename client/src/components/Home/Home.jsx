import { useContext, useEffect, useState } from "react";
import "./Home.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimations";
import { getNews } from "../../service/api/user";
import { useParams } from "react-router-dom";
import { NewsContext } from "../../context/newsContext";
import Card from "../Card/Card";

const Home = () => {
  const { news, setNews } = useContext(NewsContext);
  const [isLoading, setIsLoading] = useState(true);

  const { id, channel } = useParams();
  const selectedChannel = channel || "ndtvnews";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getNews(id, selectedChannel);
      if (response) {
        setNews((prevNews) => ({
          ...prevNews,
          [selectedChannel]: response.data.result,
        }));
        setIsLoading(false);
      } else {
        alert("Error fetching data. Please try again later.");
      }
    };
    news[selectedChannel].length === 0 ? fetchData() : setIsLoading(false);
  }, [selectedChannel]);

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <div className="container">
            {news[selectedChannel].map(
              (headline, index) =>
                headline.text && (
                  <Card
                    key={index}
                    headline={headline.text || ""}
                    description={headline.description || ""}
                    href={headline.href || ""}
                  />
                )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
