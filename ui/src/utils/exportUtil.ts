import { fuzzyMatch } from "./matchUtil";

const symbols = { red: "🟥", yellow: "🟨", green: "🟩", black: "⬛" };
export const toClipboard = (
  completed: boolean[],
  guesses: string[],
  done: boolean,
  artist: string
) => {
  let emojis = "";
  let stats = ["Arthistle #TBD", "Arthistle: https://arthistle.herokuapp.com/"];
  let i = 0;
  let c = 0;
  while (i < completed.length) {
    if (completed[i]) {
      let res = fuzzyMatch(guesses[i].toLowerCase(), artist);
      if (res.length > 0) {
        c++;
      }
    }
  }
  navigator.clipboard.writeText(stats.join("\n"));
};
