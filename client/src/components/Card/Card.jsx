import "./Card.css";
import CallMadeIcon from "@mui/icons-material/CallMade";

const Card = ({ headline, description, href }) => {
  return (
    <div className="card child">
      <div className="headline">
        <h1>{headline}</h1>
      </div>
      {description != "" && (
        <div className="description">
          <h3>{description}</h3>
        </div>
      )}
      {href != "" && (
        <div className="button">
          <a href={href} target="_blank" rel="noopener noreferrer">
            Read More
            <CallMadeIcon className="arrow" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Card;
