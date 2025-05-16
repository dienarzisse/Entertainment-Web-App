import React from "react";
import "./styling/css/MediaContentDetailPage.css";
import Credits from "./Credits";
import SimilarContent from "./SimilarContent";
import Providers from "./Providers";
import VideoCarousel from "./VideoCarousel";
import ContentDetails from "./ContentDetails";

const MediaContentDetailPage: React.FC = () => {
  // TODO: Implement rating system here
  // Move data fetching here and load the page as a whole

  return (
    <div className="MediaContentDetailPage">
      <ContentDetails />
      {/* <VideoCarousel /> */}
      <Providers />
      <Credits />
      <SimilarContent />
    </div>
  );
};

export default MediaContentDetailPage;
