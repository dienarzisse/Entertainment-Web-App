import iso6391 from "iso-639-1";
import axios from "axios";

export const GetLanguageName = (languageCode) => {
  const languageName = iso6391.getName(languageCode);
  return languageName || "Unknown Language";
};

export const StringToTitle = (category) => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const FetchData = async (options, setter) => {
  try {
    const response = await axios(options);
    const resultList = response.data;
    setter(resultList);
  } catch (error) {
    console.error(error);
  }
};

export const RoundStars = (value) => {
  if (parseInt(value) === value) return value;
  return parseInt(value) + 0.5;
};
