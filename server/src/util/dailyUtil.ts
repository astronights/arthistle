const DAY_MS = 24 * 60 * 60 * 1000;

// Whole days between two YYYY-MM-DD dates, read as UTC so the arithmetic does
// not depend on where the server happens to be running.
export const dayIndex = (date: string, inception: string): number => {
  const from = Date.parse(`${inception}T00:00:00Z`);
  const to = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(from) || Number.isNaN(to)) return 0;
  return Math.max(0, Math.round((to - from) / DAY_MS));
};

// A small seeded generator. Nothing here may use Math.random or the clock, or
// the same day would stop producing the same puzzle.
const seeded = (seed: number) => {
  let state = (seed + 0x9e3779b9) >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
};

// Each run of `ids.length` days gets its own shuffle, so an artist cannot come
// up twice until every other one has had a turn.
export const orderForCycle = (ids: string[], cycle: number): string[] => {
  const next = seeded(cycle);
  const order = [...ids];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

// The artist for a date, derived from the date alone: every request for a
// given day returns the same one, for every client, however many times it is
// asked. Ids are sorted first so the answer does not depend on the order the
// data file happens to list them in.
export const artistForDate = (
  ids: string[],
  date: string,
  inception: string
): string => {
  const sorted = [...ids].sort();
  const index = dayIndex(date, inception);
  const cycle = Math.floor(index / sorted.length);
  return orderForCycle(sorted, cycle)[index % sorted.length];
};
