export type resultType = {
  date: string;
  number: number;
  artist: string;
  won: boolean;
  // Clues that had been revealed when the game ended, 1 to the game size.
  clues: number;
  guesses: number;
  // Time from the first guess to the last, or null if it was never timed.
  seconds: number | null;
};

export type summaryType = {
  played: number;
  won: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  averageClues: number | null;
  averageSeconds: number | null;
  fastestSeconds: number | null;
};
