import "../assets/css/App.sass";
import Layer from "./Layer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
