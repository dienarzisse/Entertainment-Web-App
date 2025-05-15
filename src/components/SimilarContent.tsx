import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import Content from "./Content";
import "./styling/css/SimilarContent.css";
import Loading from "./Loading";

// Define the type for one content item
interface SimilarItem {
  id: number;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  media_type?: string;
  adult?: boolean;
  vote_average: number;
}

// Define the state shape expected from API response
interface SimilarList {
  results: SimilarItem[];
}

function SimilarContent() {
  const { mediaType, id } = useParams<{ mediaType?: string; id?: string }>();
  const [similarList, setSimilarList] = useState<SimilarList>({ results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mediaType || !id) return;

    const optionsSimilar = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    setLoading(true);
    FetchData(optionsSimilar, setSimilarList).finally(() => setLoading(false));
  }, [mediaType, id]);

  if (loading) return <Loading />;

  // Filter out items without backdrop_path and map to Content components
  const mappedSimilarList = similarList.results
    .filter((item) => item.backdrop_path !== null)
    .map((item) => (
      <Content
        key={item.id}
        id={item.id}
        imgSrc={item.backdrop_path || ""}
        year={
          item.release_date
            ? new Date(item.release_date).getFullYear()
            : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : "N/A"
        }
        name={item.title ?? item.name ?? "Unknown"}
        mediaType={item.media_type ?? mediaType}
        adult={item.adult ?? false}
        rating={item.vote_average / 2}
      />
    ));

  return (
    <div className="SimilarContent">
      <h1>Similar</h1>
      <div className="SimilarContentMap">{mappedSimilarList}</div>
    </div>
  );
}

export default SimilarContent;
