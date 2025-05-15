import iso6391 from "iso-639-1";
import axios, { AxiosRequestConfig } from "axios";

// Get language name from code (e.g. "en" => "English")
export const GetLanguageName = (languageCode: string): string => {
  const languageName = iso6391.getName(languageCode);
  return languageName || "Unknown Language";
};

// Convert strings like "some_category_name" to "Some Category Name"
export const StringToTitle = (category: string): string => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Fetch data via axios and update state via setter function
export const FetchData = async <T,>(
  options: AxiosRequestConfig,
  setter: (data: T) => void
): Promise<void> => {
  try {
    const response = await axios<T>(options);
    setter(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Round star ratings to nearest 0.5, keeping integers unchanged
export const RoundStars = (value: number): number => {
  if (Math.floor(value) === value) return value;
  return Math.floor(value) + 0.5;
};
