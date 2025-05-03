import { useParams } from "react-router-dom";
import DetailedView from "./DetailedView";
function GenresList(){
    const {
      mediaType,
      genre_id,
      category="popular",
      page,
    } = useParams();
    return (
      <div className="GenresList">
        <DetailedView mediaType={mediaType} category={category} genre_id={genre_id} page={page} />
      </div>
    );
}

export default GenresList;