import React from "react";
import "./styling/css/MediaContentDetailPage.css";
import ContentDetails from "./ContentDetails";
import Credits from "./Credits";
import ImageList from "./ImageList";
import SimilarContent from "./SimilarContent";
import Providers from "./Providers";
import VideoCarousel from "./VideoCarousel";

const MediaContentDetailPage: React.FC = () => {
  // TODO: Implement rating system here

  return (
    <div className="MediaContentDetailPage">
      <ContentDetails />
      <ImageList />
      <VideoCarousel />
      <Providers />
      <Credits />
      <SimilarContent />
    </div>
  );
};

export default MediaContentDetailPage;
