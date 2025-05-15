import { useNavigate } from "react-router-dom";
import "./styling/css/GenreButton.css";
function GenreButton({ mediaType, genre_name, genre_id, parity }) {
    const navigate = useNavigate();
  const handleClick = () => {
      navigate(`/${mediaType}/genre/${genre_id}/${genre_name}/1`);
  };
  return <div className={`GenreButton ${parity}`}
  onClick={handleClick}
  >{genre_name}</div>;
}

export default GenreButton;
