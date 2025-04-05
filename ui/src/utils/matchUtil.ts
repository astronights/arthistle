import fuzzy from "fuzzy";
import { AlertColor } from "@mui/material";

export const regex = /[\s,.-]+/;

export const fuzzyMatch = (attempt: string, artist: string) => {
  if (!attempt || !artist) return [];

  const artistParts = artist.toLowerCase().split(regex).filter(Boolean);

  return attempt
    .toLowerCase()
    .split(regex)
    .filter(Boolean)
    .map(part => {
      const matches = fuzzy.filter(part, artistParts).map(el => el.string);
      return [...new Set(matches)];
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
