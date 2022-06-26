import fuzzy from "fuzzy";

export const isEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
  return event.key === "Enter";
};

export const fuzzyMatch = (attempt: string, artist: string) => {
  const regex = "/[^a-z]/i";
  const artistParts = artist.split(regex);
  return attempt.split(regex).map((part: string) => {
    fuzzy.filter(part, artistParts).map((element) => {
      console.log(element);
      return element.string;
    });
  });
};
