import { createTheme } from "@mui/material";

export type Mode = "light" | "dark";

// These mirror assets/css/colors.sass. MUI needs real hex values to derive
// hover, disabled and contrast shades, so it cannot read the Sass variables or
// CSS custom properties directly - keep the two lists in step.
const palettes = {
  dark: {
    bg: "#1d353e",
    surface: "#16282f",
    text: "#fefae0",
    green: "#2a9d8f",
    yellow: "#e9c46a",
    orange: "#f4a261",
    red: "#e76f51",
    link: "#8ecae6",
    line: "rgba(254, 250, 224, 0.16)",
    muted: "rgba(254, 250, 224, 0.25)",
  },
  light: {
    bg: "#f4efe1",
    surface: "#fffdf5",
    text: "#16282f",
    green: "#1f7a6e",
    yellow: "#c98f2b",
    orange: "#b96f27",
    red: "#bd5138",
    link: "#1c6b8c",
    line: "rgba(22, 40, 47, 0.20)",
    muted: "rgba(22, 40, 47, 0.28)",
  },
} as const;

const fontBody =
  "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif";
const fontDisplay = "'EB Garamond', Georgia, 'Times New Roman', serif";

const storageKey = "arthistle-theme";

// Read the saved choice, else follow the operating system.
export const getInitialMode = (): Mode => {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Private browsing can refuse storage; fall through to the system setting.
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

// Point the stylesheet at the matching palette and remember the choice. Called
// once before the first render so the page never paints the wrong palette.
export const applyMode = (mode: Mode) => {
  document.documentElement.dataset.theme = mode;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", palettes[mode].bg);
  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {
    // Not being able to remember the choice is not worth failing over.
  }
};

// Without this the MUI defaults leak through: the app bar renders its own grey
// (#272727) against the page's teal, and the steppers and alerts come out in
// the default blues and reds instead of the palette.
export const createAppTheme = (mode: Mode) => {
  const palette = palettes[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.green, contrastText: palette.surface },
      secondary: { main: palette.link },
      success: { main: palette.green },
      info: { main: palette.link },
      warning: { main: palette.orange },
      error: { main: palette.red },
      background: { default: palette.bg, paper: palette.surface },
      text: { primary: palette.text },
      divider: palette.line,
    },
    typography: {
      fontFamily: fontBody,
      h1: { fontFamily: fontDisplay },
      h2: { fontFamily: fontDisplay },
      h3: { fontFamily: fontDisplay },
      button: { fontFamily: fontBody, fontWeight: 700, letterSpacing: "0.06em" },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.surface,
            backgroundImage: "none",
            color: palette.text,
            boxShadow: "none",
            borderBottom: `1px solid ${palette.line}`,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          // A neutral hairline reads as definition; the severity colour as a
          // border was too loud next to the artwork.
          root: { border: `1px solid ${palette.line}`, alignItems: "center" },
        },
      },
      // The clue markers double as navigation, so give the locked ones a clear
      // resting state and the reachable ones a proper hit area.
      MuiStepButton: {
        styleOverrides: {
          root: {
            borderRadius: "50%",
            // A 23x37 dot is an awkward thing to hit on a phone; 44px is the
            // usual floor for a touch target.
            minWidth: "2.75rem",
            minHeight: "2.75rem",
            padding: 0,
            "&.Mui-disabled": { opacity: 0.45 },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            fontSize: "1.75rem",
            color: palette.muted,
            "&.Mui-active": { color: palette.yellow },
            "&.Mui-completed": { color: palette.green },
          },
          // The numeral sits on the active and locked circles, so it
          // needs the ink that contrasts with them in this mode.
          text: {
            fill: mode === "light" ? palette.text : palette.surface,
            fontWeight: 700,
          },
        },
      },
    },
  });
};

export default createAppTheme;
