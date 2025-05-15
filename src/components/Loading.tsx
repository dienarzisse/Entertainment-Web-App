import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Loading: React.FC = () => {
  const placeholderImage =
    "https://media.istockphoto.com/id/1467339432/video/retro-buffering-circular-loading-bar-rotating-on-black-background.jpg?s=640x640&k=20&c=jOF3pEBv3EaXlgPHoa8CsOwOIg9gBNEPrXztQ_PXidQ=";
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <LazyLoadImage
        src={placeholderImage}
        alt={"Loading..."}
        effect="blur"
        placeholderSrc={placeholderImage}
        className="Background"
        draggable={false}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderImage;
        }}
      />
    </div>
  );
};

export default Loading;
