import React, { Suspense } from "react";
import "./styling/css/MediaContentDetailPage.css";

const LazyContentDetails = React.lazy(() => import("./ContentDetails"));
const LazyImageList = React.lazy(() => import("./ImageList"));
const LazyVideoCarousel = React.lazy(() => import("./VideoCarousel"));
const LazyProviders = React.lazy(() => import("./Providers"));
const LazyCredits = React.lazy(() => import("./Credits"));
const LazySimilarContent = React.lazy(() => import("./SimilarContent"));

const MediaContentDetailPage = () => {
  return (
    <div className="MediaContentDetailPage">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyContentDetails />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImageList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyVideoCarousel />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyProviders />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCredits />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySimilarContent />
      </Suspense>
    </div>
  );
};

export default MediaContentDetailPage;