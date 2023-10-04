import Content from "./Content";
import "./styling/css/Trending.css";
import { nanoid } from "nanoid";
function Trending({ trendingList }) {
  console.log(trendingList);

  let list = null;
  if (trendingList) {
    list = trendingList.map((item) => {
      return (
        <Content
          key={nanoid()}
          imgSrc={
            `https://www.themoviedb.org/t/p/w220_and_h330_face` +
            item.poster_path
          }
          year={new Date(item.release_date).getFullYear()}
          name={item.original_title}
          type={item.media_type}
          adult={item.adult}
        />
      );
    });
  }

  return (
    <div className="Trending">
      <h1>Trending</h1>
      <div className="ScrollContainer">
        <div className="ContentContainer">
          { list }
        </div>
      </div>
    </div>
  );
}

export default Trending;
