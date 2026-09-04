import { artist } from "./artist";

export type stateType = {
  completed: boolean[];
  names: string[];
  artist: artist;
  activeStep: number;
  loss: boolean;
  win: boolean;
  done: boolean;
  guesses: {
    attempts: string[];
  };
  // Milliseconds since the epoch, set on the first guess and on the last.
  startedAt?: number | null;
  finishedAt?: number | null;
};
