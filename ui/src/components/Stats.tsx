import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import "../assets/css/stats.sass";
import { resultType } from "../types/stats";
import { stateType } from "../types/state";
import {
  formatDuration,
  readHistory,
  summarise,
} from "../utils/statsUtil";
import { toClipboard } from "../utils/exportUtil";

interface StatsProps {
  open: boolean;
  onClose: () => void;
}

const gameSize = 5;
const recent = 30;

const readGame = (): stateType | null => {
  try {
    const raw = window.localStorage.getItem("arthistle");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && parsed.artist ? parsed : null;
  } catch {
    return null;
  }
};

const Stats = (props: StatsProps) => {
  const [history, setHistory] = useState<resultType[]>([]);
  const [game, setGame] = useState<stateType | null>(null);
  const [copied, setCopied] = useState(0);

  // Read on open rather than on mount, so the numbers are current after a
  // game finishes without the page having been reloaded.
  useEffect(() => {
    if (!props.open) return;
    setHistory(readHistory());
    setGame(readGame());
  }, [props.open]);

  const summary = useMemo(() => summarise(history), [history]);
  const shown = history.slice(-recent);

  // The day's own record is the outcome, not the game state's win flag: that
  // flag doubles as "show the win toast" and is set back to false the moment
  // the toast is dismissed, so a finished game persists it as false.
  const today = game
    ? history.find((entry) => entry.date === game.artist.date)
    : undefined;

  const share = () => {
    if (!game || !today) return;
    const ok = toClipboard(
      game.completed,
      game.guesses.attempts,
      game.artist.name.toLowerCase(),
      gameSize,
      today.won ? today.seconds : null
    );
    setCopied(ok ? 1 : -1);
  };

  const tiles = [
    { label: "Played", value: String(summary.played) },
    { label: "Win rate", value: `${summary.winRate}%` },
    { label: "Streak", value: String(summary.currentStreak) },
    { label: "Best streak", value: String(summary.bestStreak) },
    {
      label: "Avg clues",
      value:
        summary.averageClues === null ? "-" : summary.averageClues.toFixed(1),
    },
    { label: "Avg time", value: formatDuration(summary.averageSeconds) },
  ];

  // Geometry for the plot. One column per puzzle, capped so a column never
  // fills its slot; the leftover is the gap that separates neighbours.
  const plot = { w: 560, h: 150, top: 12, bottom: 26, left: 26, right: 8 };
  const inner = {
    w: plot.w - plot.left - plot.right,
    h: plot.h - plot.top - plot.bottom,
  };
  const band = shown.length ? inner.w / shown.length : inner.w;
  const barWidth = Math.max(3, Math.min(24, band - 4));
  const yFor = (clues: number) => plot.top + inner.h * (1 - clues / gameSize);

  // Rounded at the data end, square where it meets the baseline.
  const column = (x: number, y: number, w: number, h: number) => {
    const r = Math.min(4, w / 2, h);
    return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${
      x + w - r
    },${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="stats-title"
    >
      <DialogTitle id="stats-title" className="stats-title">
        Statistics
      </DialogTitle>
      <DialogContent className="stats-body">
        {today ? (
          <p className="stats-today">
            {today.won
              ? `Solved today's Arthistle on clue ${today.clues}`
              : "Missed today's Arthistle"}
            {today.won && today.seconds !== null
              ? ` in ${formatDuration(today.seconds)}`
              : ""}
            .
          </p>
        ) : (
          <p className="stats-today">Today's Arthistle is still open.</p>
        )}

        <dl className="stats-tiles">
          {tiles.map((tile) => (
            <div className="stats-tile" key={tile.label}>
              <dt>{tile.label}</dt>
              <dd>{tile.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="stats-heading">Clues needed, last {recent} puzzles</h3>

        {shown.length === 0 ? (
          <p className="stats-empty">
            No finished puzzles yet. Results are kept in this browser only, so
            the chart fills in from the next one you complete.
          </p>
        ) : (
          <>
            <figure className="stats-figure">
              <svg
                viewBox={`0 0 ${plot.w} ${plot.h}`}
                className="stats-chart"
                role="img"
                aria-label={`Clues needed for the last ${shown.length} puzzles`}
              >
                {[1, 2, 3, 4, 5].map((clue) => (
                  <g key={clue}>
                    <line
                      className="stats-grid"
                      x1={plot.left}
                      x2={plot.w - plot.right}
                      y1={yFor(clue)}
                      y2={yFor(clue)}
                    />
                    <text
                      className="stats-tick"
                      x={plot.left - 8}
                      y={yFor(clue) + 4}
                      textAnchor="end"
                    >
                      {clue}
                    </text>
                  </g>
                ))}
                <line
                  className="stats-axis"
                  x1={plot.left}
                  x2={plot.w - plot.right}
                  y1={plot.top + inner.h}
                  y2={plot.top + inner.h}
                />
                {shown.map((entry, index) => {
                  const top = yFor(entry.clues);
                  const x = plot.left + band * index + (band - barWidth) / 2;
                  return (
                    <path
                      key={entry.date}
                      className={entry.won ? "stats-bar-won" : "stats-bar-lost"}
                      d={column(x, top, barWidth, plot.top + inner.h - top)}
                    >
                      <title>
                        {`#${entry.number} ${entry.artist} — ${
                          entry.won
                            ? `solved on clue ${entry.clues}`
                            : "out of guesses"
                        }${
                          entry.seconds !== null
                            ? ` in ${formatDuration(entry.seconds)}`
                            : ""
                        }`}
                      </title>
                    </path>
                  );
                })}
                <text
                  className="stats-tick"
                  x={plot.left}
                  y={plot.h - 8}
                  textAnchor="start"
                >
                  {shown[0].date}
                </text>
                {shown.length > 1 ? (
                  <text
                    className="stats-tick"
                    x={plot.w - plot.right}
                    y={plot.h - 8}
                    textAnchor="end"
                  >
                    {shown[shown.length - 1].date}
                  </text>
                ) : null}
              </svg>
              <figcaption className="stats-legend">
                <span>
                  <i className="stats-key stats-key-won" aria-hidden="true" />
                  Solved
                </span>
                <span>
                  <i className="stats-key stats-key-lost" aria-hidden="true" />
                  Out of guesses
                </span>
              </figcaption>
            </figure>

            <details className="stats-table">
              <summary>See the numbers ({shown.length} shown)</summary>
              <div className="stats-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Puzzle</th>
                    <th>Artist</th>
                    <th>Clues</th>
                    <th>Guesses</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[...shown].reverse().map((entry) => (
                    <tr key={entry.date}>
                      <td>#{entry.number}</td>
                      <td>{entry.artist}</td>
                      <td>{entry.won ? entry.clues : "-"}</td>
                      <td>{entry.guesses}</td>
                      <td>{formatDuration(entry.seconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </details>
          </>
        )}
      </DialogContent>
      <DialogActions className="stats-actions">
        <Button onClick={props.onClose}>Close</Button>
        <Button variant="contained" onClick={share} disabled={!today}>
          Share
        </Button>
      </DialogActions>
      <Snackbar
        open={copied !== 0}
        autoHideDuration={2000}
        onClose={() => setCopied(0)}
        message={copied === 1 ? "Results copied!" : "Error (Use Https)"}
      />
    </Dialog>
  );
};

export default Stats;
