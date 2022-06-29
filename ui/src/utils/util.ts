import fuzzy from "fuzzy";
import { AlertColor } from "@mui/material";

export const regex = /[^a-z]/i;

export const fuzzyMatch = (attempt: string, artist: string) => {
  const artistParts = artist.split(regex);
  return attempt
    .split(regex)
    .map((part: string) => {
      let words = fuzzy.filter(part, artistParts).map((element) => {
        return element.string;
      });
      return [...new Set(words)];
    })
    .flat();
};

export const isAnswer = (attempt: string, artist: string) => {
  let names = fuzzyMatch(attempt, artist).sort();
  console.log(names);
  if (names.length === artist.split(regex).length) {
    return 3;
  } else if (names.length < artist.split(regex).length && names.length > 0) {
    return 2;
  } else if (names.length === 0) {
    return 1;
  } else {
    return 0;
  }
};

export const severities: AlertColor[] = ["error", "warning", "info", "success"];
