import { createTheme } from "@mui/material";

// These mirror assets/css/colors.sass. MUI needs real hex values to derive
// hover, disabled and contrast shades, so it cannot read the Sass variables or
// CSS custom properties directly - keep the two lists in step.
export const palette = {
  black: "#1d353e",
  slate: "#16282f",
  green: "#2a9d8f",
  yellow: "#e9c46a",
  orange: "#f4a261",
  red: "#e76f51",
  white: "#fefae0",
  skyblue: "#8ecae6",
};

const fontBody =
  "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif";
const fontDisplay = "'EB Garamond', Georgia, 'Times New Roman', serif";

// Without this the MUI defaults leak through: the app bar renders its own grey
// (#272727) against the page's teal, and the steppers and alerts come out in
// the default blues and reds instead of the palette.
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: palette.green, contrastText: palette.white },
    secondary: { main: palette.skyblue, contrastText: palette.black },
    success: { main: palette.green },
    info: { main: palette.skyblue },
    warning: { main: palette.orange },
    error: { main: palette.red },
    background: { default: palette.black, paper: palette.slate },
    text: { primary: palette.white, secondary: palette.skyblue },
    divider: "rgba(254, 250, 224, 0.18)",
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
          backgroundColor: palette.slate,
          backgroundImage: "none",
          color: palette.white,
          boxShadow: "none",
          borderBottom: `1px solid rgba(254, 250, 224, 0.12)`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        // A neutral hairline reads as definition; the severity colour as a
        // border was too loud next to the artwork.
        root: {
          border: "1px solid rgba(254, 250, 224, 0.16)",
          alignItems: "center",
        },
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
          color: "rgba(254, 250, 224, 0.25)",
          "&.Mui-active": { color: palette.yellow },
          "&.Mui-completed": { color: palette.green },
        },
        text: { fill: palette.black, fontWeight: 700 },
      },
    },
  },
});

export default theme;
