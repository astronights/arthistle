import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "../assets/css/App.sass";
import Layer from "./Layer";
import { applyMode, createAppTheme, getInitialMode, Mode } from "../config/theme";

const App = () => {
  const [mode, setMode] = useState<Mode>(getInitialMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((current) => (current === "dark" ? "light" : "dark"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Layer mode={mode} onToggleMode={toggleMode} />
      </div>
    </ThemeProvider>
  );
};

export default App;
