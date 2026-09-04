import { createTheme } from "@mui/material";

// These mirror assets/css/colors.sass. MUI needs real hex values to derive
// hover, disabled and contrast shades, so it cannot read the Sass variables or
// CSS custom properties directly - keep the two lists in step.
const palette = {
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
    // Dark MUI lightens raised surfaces with a white overlay, which puts
    // dialogs on a colour that is not in the palette. The app is flat.
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
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
    // The markers carry no text, so MUI's gap between the icon and its label
    // is dead space that pushes every icon 4px left of its step's centre.
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: { paddingRight: 0 },
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
        text: { fill: palette.surface, fontWeight: 700 },
      },
    },
  },
});

export default theme;
