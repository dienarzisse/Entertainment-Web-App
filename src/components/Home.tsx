import React from "react";
import "./styling/css/Home.css";
import MediaComponent from "./MediaComponent";
import { MOVIECATEGORIES, TVCATEGORIES, MEDIA_TYPES } from "../Constants";

const Home: React.FC = () => {
  // Convert categories objects to arrays for iteration
  const movieCategories = Object.values(MOVIECATEGORIES);
  const tvCategories = Object.values(TVCATEGORIES);

  return (
    <div className="Home">
      <section className="Movies">
        {movieCategories.map((category) => (
          <MediaComponent
            key={category}
            mediaType={MEDIA_TYPES.MOVIE}
            category={category}
            seeMore={true}
          />
        ))}
      </section>

      <section className="TV-Shows">
        {tvCategories.map((category) => (
          <MediaComponent
            key={category}
            mediaType={MEDIA_TYPES.TV}
            category={category}
            seeMore={true}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
