import { AlertColor } from "@mui/material";

// Characters that separate the individual parts of an artist's name.
export const regex = /[\s,.-]+/;
// Same as `regex`, but keeps the separators so a name can be rebuilt exactly
// as it is written when masking it.
export const splitRegex = /([\s,.-]+)/;

// Strip accents, punctuation and case so "O'Keeffe" and "okeeffe" compare equal.
export const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// The individual words of a name, without separators or empty entries.
export const nameParts = (name: string): string[] =>
  name.split(regex).filter(Boolean);

const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
};

// Longer words tolerate more typos, short ones have to be spelt correctly so
// that a stray letter or two cannot uncover a whole name.
const tolerance = (length: number): number => {
  if (length <= 4) return 0;
  if (length <= 7) return 1;
  return 2;
};

const isSimilar = (attempt: string, part: string): boolean => {
  if (!attempt || !part) return false;
  if (attempt === part) return true;
  return (
    levenshtein(attempt, part) <=
    tolerance(Math.max(attempt.length, part.length))
  );
};

// The parts of the artist's name (lower cased) that the attempt uncovers.
export const fuzzyMatch = (attempt: string, artist: string): string[] => {
  if (!attempt || !artist) return [];

  const artistParts = nameParts(artist.toLowerCase());

  // Typing the full name in one go, with or without punctuation and spacing,
  // uncovers all of it.
  if (normalize(attempt) === normalize(artist)) {
    return [...new Set(artistParts)];
  }

  const matched = new Set<string>();
  nameParts(attempt.toLowerCase()).forEach((attemptPart) => {
    const guess = normalize(attemptPart);
    artistParts.forEach((artistPart) => {
      if (isSimilar(guess, normalize(artistPart))) matched.add(artistPart);
    });
  });

  return [...matched];
};

export const isAnswer = (attempt: string, artist: string): number => {
  const artistParts = new Set(nameParts(artist.toLowerCase()));
  const matched = fuzzyMatch(attempt, artist).length;

  if (matched === 0) return 1;
  if (matched >= artistParts.size) return 3;
  return 2;
};

// Indexed by the result of isAnswer, which is only ever 1, 2 or 3. The first
// slot is never read; it is kept so the indices line up.
export const severities: AlertColor[] = ["error", "error", "info", "success"];
