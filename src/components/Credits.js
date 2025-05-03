import { useState, useEffect } from "react";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
import UnknownIcon from "../assets/icon-unknown.svg";
import "./styling/css/Credits.css";

function Credits() {
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState({ cast: [] });
  const [loading, setLoading] = useState(true); // Added loading state

  const openNewTab = (item) => {
    const url = `https://www.themoviedb.org/person/${
      item.id
    }-${item.original_name
      .split(" ")
      .map((name) => name.toLowerCase())
      .join("-")}`;
    window.open(url, "_blank");
  };

  // Mapping credits to display
  const mappedCredits = credits.cast.slice(0, 6).map((item) => (
    <div
      className="Profile-Card"
      key={item.cast_id}
      onClick={() => openNewTab(item)}
    >
      <img
        src={
          item.profile_path
            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`
            : UnknownIcon
        }
        alt={item.name}
        loading="lazy" // Lazy load images
      />
      <div className="Actor-Details">
        <div className="Name">{item.name}</div>
        <div className="Character">
          <span>Playing: </span>
          {item.character}
        </div>
      </div>
    </div>
  ));

  // Fetch credits data
  useEffect(() => {
    const optionsCredits = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_API_KEY_HERE", // Make sure to use a secure API key management approach
      },
    };

    setLoading(true); // Set loading to true before fetching

    FetchData(optionsCredits, (data) => {
      setCredits(data); // Set fetched data
      setLoading(false); // Set loading to false after data is fetched
    }).catch((error) => {
      console.error(error);
      setLoading(false); // Set loading to false if there's an error
    });
  }, [mediaType, id]);

  // Show loading or fallback if no credits are available
  if (loading) return <div>Loading...</div>;
  if (credits.cast.length < 1) return <div>No Cast Information Available</div>;

  return (
    <div className="Credits">
      <h1>Top Casts</h1>
      <div className="Casts">{mappedCredits}</div>
    </div>
  );
}

export default Credits;
