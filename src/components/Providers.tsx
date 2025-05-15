import { useEffect, useState, ChangeEvent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios, { AxiosRequestConfig } from "axios";
import { useParams } from "react-router-dom";
import "./styling/css/Providers.css";

interface Provider {
  logo_path: string;
  provider_name?: string;
  provider_id?: number;
}

interface ProviderDetails {
  link: string;
  buy: Provider[];
  flatrate: Provider[];
  rent: Provider[];
  ads: Provider[];
}

interface ProvidersResults {
  [countryCode: string]: ProviderDetails;
}

interface ProvidersList {
  results: ProvidersResults;
}

interface Params {
  mediaType?: string;
  id?: string;
}

function Providers() {
  const { mediaType, id } = useParams() as Params;
  const [providersList, setProvidersList] = useState<ProvidersList>({
    results: {},
  });
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const selectedProviders: ProviderDetails = providersList.results[
    selectedCountry
  ] || {
    link: "",
    buy: [],
    flatrate: [],
    rent: [],
    ads: [],
  };

  const generateMappedProviders = (
    providers: Provider[] | undefined,
    type: string
  ) => {
    if (!providers || providers.length === 0) return null;

    return (
      <div className={type}>
        <h1 className={type}>{type}</h1>
        <div className="Map">
          {providers.map((provider, index) => (
            <a
              key={index}
              href={selectedProviders.link}
              target="_blank"
              rel="noreferrer"
            >
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name || "provider"}
                effect="blur"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>
    );
  };

  const mappedBuyProviders = generateMappedProviders(
    selectedProviders.buy,
    "Buy"
  );
  const mappedStreamProvider = generateMappedProviders(
    selectedProviders.flatrate,
    "Stream"
  );
  const mappedRentProviders = generateMappedProviders(
    selectedProviders.rent,
    "Rent"
  );
  const mappedAdsProviders = generateMappedProviders(
    selectedProviders.ads,
    "Ads"
  );

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  // Function to get flag emoji from country code
  const getFlagEmoji = (countryCode: string): string => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
      .reduce((flag, codePoint) => flag + String.fromCodePoint(codePoint), "");
  };

  const fetchData = async (options: AxiosRequestConfig) => {
    try {
      const response = await axios(options);
      const resultList: ProvidersList = response.data;
      setProvidersList(resultList);
      setAvailableCountries(Object.keys(resultList.results));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mediaType || !id) return;

    const optionsProviders: AxiosRequestConfig = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    fetchData(optionsProviders);
  }, [mediaType, id]);

  useEffect(() => {
    const preferredCountries = ["DE", "US", "CA", "GB", "AU", "FR", "ES", "IT"];
    for (const country of preferredCountries) {
      if (availableCountries.includes(country)) {
        setSelectedCountry(country);
        return;
      }
    }
    if (availableCountries.length > 0) {
      setSelectedCountry(availableCountries[0]);
    }
  }, [availableCountries]);

  if (Object.keys(providersList.results).length < 1) return null;

  return (
    <div className="Providers">
      <div className="Provider-Dropdown">
        <select
          onChange={handleCountryChange}
          value={selectedCountry}
          aria-label="Select country"
        >
          {availableCountries.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {getFlagEmoji(countryCode)} {countryCode}
            </option>
          ))}
        </select>
      </div>
      <div className="Providers-List">
        <div className="Stream-Map">{mappedStreamProvider}</div>
        <div className="Rent-Map">{mappedRentProviders}</div>
        <div className="Buy-Map">{mappedBuyProviders}</div>
        <div className="Ads-Map">{mappedAdsProviders}</div>
      </div>
      <h2>Powered by TMDB and JustWatch </h2>
    </div>
  );
}

export default Providers;
