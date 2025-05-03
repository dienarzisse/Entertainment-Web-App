import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import Content from "./Content";
import "./styling/css/SimilarContent.css";
import Loading from "./Loading";

function SimilarContent() {
  const { mediaType, id } = useParams();
  const [similarList, setSimilarList] = useState(null); // Initial state set to null to show Loading initially
  const [loading, setLoading] = useState(true); // State to track loading

  // Handle data mapping and filtering to avoid unnecessary re-renders
  const mappedSimilarList = similarList
    ? similarList.results
        .filter((item) => item.backdrop_path) // Directly filter out items without backdrop_path
        .map((item) => (
          <Content
            key={item.id}
            id={item.id}
            imgSrc={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            year={new Date(
              item.release_date || item.first_air_date
            ).getFullYear()}
            name={item.title || item.name}
            mediaType={item.media_type || mediaType}
            adult={item.adult}
            rating={item.vote_average / 2}
          />
        ))
    : null; // Ensure it returns null if similarList is not yet available

  useEffect(() => {
    const optionsSimilar = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_API_KEY_HERE",
      },
    };

    // Start loading when fetching data
    setLoading(true);

    FetchData(optionsSimilar, (data) => {
      setSimilarList(data); // Set data after fetching
      setLoading(false); // Set loading to false once the data is fetched
    });
  }, [mediaType, id]);

  // Show Loading component until data is fetched
  if (loading) return <Loading />;

  return (
    <div className="SimilarContent">
      <h1>Similar</h1>
      <div className="SimilarContentMap">
        {mappedSimilarList && mappedSimilarList.length > 0 ? (
          mappedSimilarList
        ) : (
          <p>No similar content found</p>
        )}
      </div>
    </div>
  );
}

export default SimilarContent;
