import { CssBaseline, ThemeProvider } from "@mui/material";
import "../assets/css/App.sass";
import Layer from "./Layer";
import theme from "../config/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Layer />
      </div>
    </ThemeProvider>
  );
};

export default App;
