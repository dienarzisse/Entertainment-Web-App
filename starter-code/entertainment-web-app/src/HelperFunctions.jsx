import iso6391 from "iso-639-1";

export const GetLanguageName = (languageCode) => {
  const languageName = iso6391.getName(languageCode);
  return languageName || "Unknown Language";
}

export const StringToTitle = (category) => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
