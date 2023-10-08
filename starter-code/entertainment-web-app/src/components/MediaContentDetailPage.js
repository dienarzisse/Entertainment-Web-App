import "./styling/css/MediaContentDetailPage.css";
import ContentDetails from "./ContentDetails";
import Credits from "./Credits";
import ImageList from "./ImageList";
import SimilarContent from "./SimilarContent";
import Providers from "./Providers";
import VideoCarousel from "./VideoCarousel";

const MediaContentDetailPage = () => {
  // add rating system
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
