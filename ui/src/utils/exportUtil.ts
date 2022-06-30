export const toClipboard = (completed: boolean[], guesses: string[]) => {
  let stats = "Arthistle #TBD\n ";
  navigator.clipboard.writeText(stats);
};
