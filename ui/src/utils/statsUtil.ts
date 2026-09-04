import { resultType, summaryType } from "../types/stats";

const historyKey = "arthistle-history";

// Reading is wrapped because private browsing can refuse storage outright, and
// a half written value should cost the player their stats view, not the game.
export const readHistory = (): resultType[] => {
  try {
    const raw = window.localStorage.getItem(historyKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && typeof r.date === "string");
  } catch {
    return [];
  }
};

// One record per puzzle date; replaying the same day replaces it rather than
// adding a second row.
export const recordResult = (result: resultType): resultType[] => {
  const history = readHistory()
    .filter((entry) => entry.date !== result.date)
    .concat(result)
    .sort((a, b) => a.date.localeCompare(b.date));

  try {
    window.localStorage.setItem(historyKey, JSON.stringify(history));
  } catch {
    // Nothing to do; the game itself carries on.
  }
  return history;
};

const dayNumber = (date: string) =>
  Math.round(Date.parse(`${date}T00:00:00Z`) / 86400000);

// Streaks run over consecutive puzzle days. A day that was played and lost
// breaks the run, and so does a day that was never played at all.
const streaks = (history: resultType[]) => {
  let best = 0;
  let running = 0;
  let previous: number | null = null;

  history.forEach((entry) => {
    const day = dayNumber(entry.date);
    running = entry.won && previous !== null && day === previous + 1 ? running + 1 : entry.won ? 1 : 0;
    previous = day;
    best = Math.max(best, running);
  });

  // The run only still counts if the last win was today or yesterday.
  const last = history[history.length - 1];
  const today = dayNumber(new Date().toLocaleDateString("en-CA"));
  const current =
    last && last.won && today - dayNumber(last.date) <= 1 ? running : 0;

  return { current, best };
};

const average = (values: number[]) =>
  values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : null;

export const summarise = (history: resultType[]): summaryType => {
  const wins = history.filter((entry) => entry.won);
  const timed = wins
    .map((entry) => entry.seconds)
    .filter((seconds): seconds is number => typeof seconds === "number");
  const { current, best } = streaks(history);

  return {
    played: history.length,
    won: wins.length,
    winRate: history.length
      ? Math.round((wins.length / history.length) * 100)
      : 0,
    currentStreak: current,
    bestStreak: best,
    averageClues: average(wins.map((entry) => entry.clues)),
    averageSeconds: average(timed),
    fastestSeconds: timed.length ? Math.min(...timed) : null,
  };
};

// "2m 05s" reads better than 125 in a stat tile; hours only appear if someone
// really did leave it that long.
export const formatDuration = (seconds: number | null): string => {
  if (seconds === null || !Number.isFinite(seconds)) return "-";
  const whole = Math.max(0, Math.round(seconds));
  const pad = (value: number) => String(value).padStart(2, "0");

  if (whole < 60) return `${whole}s`;
  if (whole < 3600) return `${Math.floor(whole / 60)}m ${pad(whole % 60)}s`;
  return `${Math.floor(whole / 3600)}h ${pad(Math.floor((whole % 3600) / 60))}m`;
};
