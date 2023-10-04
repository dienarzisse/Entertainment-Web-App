import Content from "./Content";
import "./styling/css/Recommended.css";
// Icon Imports
import { nanoid } from "nanoid";
function ContentCategorySection({ trendingList, categoryTitle }) {
  console.log(trendingList);
  let list = null;
  if (trendingList) {
    list = trendingList.map((item) => {
      return (
        <Content
          key={nanoid()}
          imgSrc={`https://image.tmdb.org/t/p/original` + item.poster_path}
          year={new Date(item.release_date).getFullYear()}
          name={item.title}
          type={item.media_type}
          adult={item.adult}
        />
      );
    });
  }

  return (
    <div className="Recommended">
      <h1>{categoryTitle}</h1>
      <div className="ContentGrid">{list}</div>
    </div>
  );
}

export default ContentCategorySection;
