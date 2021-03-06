import fuzzy from "fuzzy";
import { AlertColor } from "@mui/material";

export const regex = /[^a-z]/i;

export const fuzzyMatch = (attempt: string, artist: string) => {
  if (attempt.length === 0 || artist.length === 0) return [];
  const artistParts = artist.toLowerCase().split(regex);
  return attempt
    .split(regex)
    .map((part: string) => {
      let words = fuzzy
        .filter(part.toLowerCase(), artistParts)
        .map((element: { string: any }) => {
          if (part.length < 3 && element.string.length > 2 * part.length)
            return null;
          return element.string;
        })
        .filter((element: any) => element !== null);
      return [...new Set(words)];
    })
    .flat();
};

export const isAnswer = (attempt: string, artist: string) => {
  let names = fuzzyMatch(attempt, artist).sort();
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

export const severities: AlertColor[] = ["warning", "error", "info", "success"];
