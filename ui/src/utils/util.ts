import _ from "lodash";
import fuzzy from "fuzzy";

const regex = /[^a-z]/i;

export const fuzzyMatch = (attempt: string, artist: string) => {
  const artistParts = artist.split(regex);
  return attempt.split(regex).map((part: string) => {
    return fuzzy.filter(part, artistParts).map((element) => {
      return element.string;
    });
  });
};

export const isAnswer = (attempt: string, artist: string) => {
  return _.isEqual(
    fuzzyMatch(attempt, artist).sort(),
    artist.split(regex).sort()
  );
};
