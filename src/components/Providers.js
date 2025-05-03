import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styling/css/Providers.css";

function Providers() {
  const { mediaType, id } = useParams();
  const [providersList, setProvidersList] = useState({ results: {} });
  const [availableCountries, setAvailableCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Function to map providers
  const generateMappedProviders = (providers, type) => {
    if (!providers || providers.length === 0) return null;

    return (
      <div className={`${type}`}>
        <h1>{type}</h1>
        <div className="Map">
          {providers.map((provider, index) => (
            <a
              key={index}
              href={providersList.results[selectedCountry].link}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt="provider"
              />
            </a>
          ))}
        </div>
      </div>
    );
  };

  const { buy, flatrate, rent, ads, link } =
    providersList.results[selectedCountry] || {};

  const mappedBuyProviders = generateMappedProviders(buy, "Buy");
  const mappedStreamProvider = generateMappedProviders(flatrate, "Stream");
  const mappedRentProviders = generateMappedProviders(rent, "Rent");
  const mappedAdsProviders = generateMappedProviders(ads, "Ads");

  // Handle country change
  const handleCountryChange = (event) => setSelectedCountry(event.target.value);

  // Get country flag emoji
  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  // Fetch provider data
  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`,
        headers: {
          accept: "application/json",
          Authorization: "Bearer YOUR_API_KEY_HERE",
        },
      });

      const resultList = response.data;
      setProvidersList(resultList);
      setAvailableCountries(Object.keys(resultList.results));
    } catch (error) {
      console.error(error);
    }
  };

  // On component mount, fetch data
  useEffect(() => {
    fetchData();
  }, [mediaType, id]);

  // Set default country based on available countries
  useEffect(() => {
    const defaultCountry =
      availableCountries.find((country) =>
        ["DE", "US", "CA", "GB", "AU", "FR", "ES", "IT"].includes(country)
      ) || availableCountries[0];

    setSelectedCountry(defaultCountry || "");
  }, [availableCountries]);

  if (Object.keys(providersList.results).length < 1) return null;

  return (
    <div className="Providers">
      <div className="Provider-Dropdown">
        <select onChange={handleCountryChange} value={selectedCountry}>
          {availableCountries.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {getFlagEmoji(countryCode)} {countryCode}
            </option>
          ))}
        </select>
      </div>
      <div className="Providers-List">
        {mappedStreamProvider}
        {mappedRentProviders}
        {mappedBuyProviders}
        {mappedAdsProviders}
      </div>
      <h2>Powered by TMDB and JustWatch</h2>
    </div>
  );
}

export default Providers;
