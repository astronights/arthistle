import { createTheme, ThemeProvider } from "@mui/material";
import "../assets/css/App.sass";
import Layer from "./Layer";

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Layer />
      </div>
    </ThemeProvider>
  );
};

export default App;
