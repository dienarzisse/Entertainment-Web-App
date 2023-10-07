import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Providers() {
  const { mediaType, id } = useParams();
  const [providersList, setProvidersList] = useState({ results: {} });
  const [availableCountries, setAvailableCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const selectedProviders = providersList.results[selectedCountry] || {
    link: "",
    buy: [],
    flatrate: [],
    rent: [],
  };

  const generateMappedProviders = (providers, type) => {
    const mappedProviders =
      providers && providers.length > 0
        ? providers.map((provider, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt="provider"
            ></img>
          ))
        : null;
    return providers ? (
      <div className={`${type}`}>
        <h1>{`${type}`}</h1>
        {mappedProviders}
      </div>
    ) : null;
  };

  const mappedBuyProviders = generateMappedProviders(
    selectedProviders.buy,
    "Buy"
  );
  const mappedFlatrateProviders = generateMappedProviders(
    selectedProviders.flatrate,
    "Flatrate"
  );
  const mappedRentProviders = generateMappedProviders(
    selectedProviders.rent,
    "Rent"
  );

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    // Set the chosen country
    setSelectedCountry(selectedCountry);
  };

  // Function to get flag emoji from country code
  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  // Fetch data
  const fetchData = async (options) => {
    try {
      const response = await axios(options);
      const resultList = response.data;
      setProvidersList(resultList);
      setAvailableCountries(Object.keys(resultList.results)); // Fixed this line
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const optionsProviders = {
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
    if (availableCountries.includes("DE")) {
      setSelectedCountry("DE"); // Set default to DE if available
    } else if (availableCountries.includes("US")) {
      setSelectedCountry("US"); // Set default to US if available
    } else if (availableCountries.includes("CA")) {
      setSelectedCountry("CA"); // Set default to CA if available
    } else if (availableCountries.includes("GB")) {
      setSelectedCountry("GB"); // Set default to GB if available
    } else if (availableCountries.includes("AU")) {
      setSelectedCountry("AU"); // Set default to AU if available
    } else if (availableCountries.includes("FR")) {
      setSelectedCountry("FR"); // Set default to FR if available
    } else if (availableCountries.includes("ES")) {
      setSelectedCountry("ES"); // Set default to ES if available
    } else if (availableCountries.includes("IT")) {
      setSelectedCountry("IT"); // Set default to IT if available
    } else if (availableCountries.length > 0) {
      setSelectedCountry(availableCountries[0]); // Set default to the first available country
    }
  }, [availableCountries]);

  return (
    <>
      {Object.keys(providersList.results).length > 0 ? (
        <div className="Providers">
          <h1>You can watch it here</h1>
          <h2>Powered by JustWatch</h2>
          <div className="Provider-Dropdown">
            <h2>Select Country</h2>
            <select onChange={handleCountryChange} value={selectedCountry}>
              {availableCountries &&
                availableCountries.map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {getFlagEmoji(countryCode)} {countryCode}
                  </option>
                ))}
            </select>
          </div>
          <div className="Providers-List">
            {mappedBuyProviders}
            {mappedFlatrateProviders}
            {mappedRentProviders}
            <div className="More-Details">
              <a href={selectedProviders.link} target="_blank" rel="noreferrer">
                More Informations
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="No-Providers">
          <p>No providers available </p>
        </div>
      )}
    </>
  );
}

export default Providers;
