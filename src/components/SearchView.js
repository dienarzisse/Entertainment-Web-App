import { useParams } from "react-router-dom";
import DetailedView from "./DetailedView";
function SearchView() {
  const { keyword, page } = useParams();

  return (
    <div className="SearchView">
      <DetailedView page={page} keyword={keyword} />
    </div>
  );
}

export default SearchView;
