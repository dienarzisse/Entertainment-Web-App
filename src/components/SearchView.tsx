// Hooks
import { useParams } from "react-router-dom";

// Components
import DetailedView from "@components/DetailedView";

function SearchView() {
  const { keyword, page } = useParams<{ keyword?: string; page?: string }>();

  return (
    <div className="SearchView">
      <DetailedView page={page} keyword={keyword ?? ""} />
    </div>
  );
}

export default SearchView;
