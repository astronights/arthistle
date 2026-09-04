import { getNumber } from "./dateUtil";
import { isAnswer } from "./matchUtil";
import { formatDuration } from "./statsUtil";

const symbols = ["⬛", "🟥", "🟨", "🟩"];
export const toClipboard = (
  completed: boolean[],
  guesses: string[],
  artist: string,
  gameSize: number,
  seconds: number | null = null
) => {
  let emojis = Array(gameSize).fill(symbols[0]);
  let c = 0;
  guesses.forEach((guess: string) => {
    if (c >= gameSize) return;
    let res = isAnswer(guess.toLowerCase(), artist);
    let prevEmoji = symbols.findIndex((e) => e === emojis[c]);
    if (prevEmoji < res) {
      emojis[c] = symbols[res];
    }
    if (res < 2) {
      c++;
    }
  });
  let firstFalse = completed.findIndex((c: boolean) => {
    return c === false;
  });
  if (firstFalse >= 0 && firstFalse < gameSize) {
    emojis[firstFalse] = symbols[3];
  }

  const stats = [
    `Arthistle #${getNumber()}`,
    emojis.join(""),
    ...(seconds !== null ? [`Solved in ${formatDuration(seconds)}`] : []),
    "Arthistle: https://arthistle.netlify.app/",
  ];
  if (navigator.clipboard) {
    navigator.clipboard.writeText(stats.join("\n"));
    return true;
  }
  return false;
};
