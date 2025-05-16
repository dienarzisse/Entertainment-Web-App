// Styles
import "@styling/MediaContentDetailPage.css";

// React
import React from "react";

// Components
import ContentDetails from "@components/media/ContentDetails";
import Credits from "@components/media/Credits";
import SimilarContent from "@components/media/SimilarContent";

const MediaContentDetailPage: React.FC = () => {
  // TODO: Implement rating system here
  // Move data fetching here and load the page as a whole

  return (
    <div className="MediaContentDetailPage">
      <ContentDetails />
      <Credits />
      <SimilarContent />
    </div>
  );
};

export default MediaContentDetailPage;
