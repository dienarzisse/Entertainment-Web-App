// Styles
import "@styling/Credits.css"; 

// React & Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Api
import { ApiClient } from "@api/ApiClient";

// Assets
import UnknownIcon from "@assets/icon-unknown.svg";

interface CastMember {
  cast_id: number;
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
}

interface CreditsData {
  cast: CastMember[];
}

function Credits() {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const [credits, setCredits] = useState<CreditsData>({ cast: [] });

  const openNewTab = (item: CastMember) => {
    const url = `https://www.themoviedb.org/person/${
      item.id
    }-${item.original_name
      .split(" ")
      .map((name) => name.toLowerCase())
      .join("-")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!mediaType || !id) return;
    ApiClient.fetchAndSet(ApiClient.getCreditsOptions(mediaType, id), setCredits);
  }, [mediaType, id]);

  if (!credits.cast.length) return null;

  return (
    <div className="Credits">
      <h1>Top Casts</h1>
      <div className="Casts">
        {credits.cast.slice(0, 6).map((item) => (
          <div
            className="Profile-Card"
            key={item.cast_id}
            onClick={() => openNewTab(item)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") openNewTab(item);
            }}
            aria-label={`View profile of ${item.name}`}
          >
            {item.profile_path ? (
              <LazyLoadImage
                effect="blur"
                wrapperProps={{
                  style: { transitionDelay: "0.5s" },
                }}
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`}
                alt={`${item.name} profile`}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <LazyLoadImage
                src={UnknownIcon}
                effect="blur"
                wrapperProps={{
                  style: { transitionDelay: "0.5s" },
                }}
                alt="Unknown profile"
                loading="lazy"
                draggable={false}
              />
            )}
            <div className="Actor-Details">
              <div className="Name">{item.name}</div>
              <div className="Caracter">
                <span>Playing: </span>
                {item.character}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credits;
