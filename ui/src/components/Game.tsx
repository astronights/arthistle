import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../assets/css/game.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";
import { fuzzyMatch } from "../utils/util";

const daily_artist: artist = {
  _id: "",
  name: "",
  url: "",
  date: "",
  art: [{ _id: "", url: "" }],
};

const Game = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [artist, setArtist] = useState(daily_artist);
  const [gameValue, setGameValue] = useState("");
  const [guesses, setGuesses] = useState<{ attempts: string[] }>({
    attempts: [],
  });
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const handleStep = (step: number) => () => {
    if (completed[step] === true) {
      setActiveStep(step);
    }
  };

  const validateArtist = (attempt: string) => {
    console.log(`Checking artist... ${attempt}`);
    guesses.attempts.push(attempt);
    let results = fuzzyMatch(attempt.toLowerCase(), artist.name.toLowerCase());
    console.log(results);
  };

  useEffect(() => {
    getDailyArt().then((data: artist) => {
      setArtist(data);
    });
    setCompleted(
      Object.fromEntries(Object.keys(completed).map((key) => [key, false]))
    );
  }, []);

  return (
    <div className="game">
      <div className="art-image">
        <img
          src={artist.art[activeStep].url}
          alt={artist.art[activeStep]._id}
        />
      </div>
      <div className="art-list">
        <Box>
          <Stepper nonLinear activeStep={activeStep}>
            {Array.from(Array(5).keys()).map((index) => (
              <Step key={index} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="art-input">
        <form
          className="input-form"
          onSubmit={(valueEvent) => {
            valueEvent.preventDefault();
            validateArtist(gameValue);
          }}
        >
          <TextField
            className="form-text"
            fullWidth
            size="small"
            id="outlined-basic"
            label="Artist"
            name="artist"
            variant="outlined"
            onChange={(e) => {
              setGameValue(e.target.value);
            }}
          />
          <Button className="form-button" type={"submit"} variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Game;
