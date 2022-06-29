import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../assets/css/game.sass";
import "../assets/css/page.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";
import { regex, fuzzyMatch, isAnswer, severities } from "../utils/util";

const daily_artist: artist = {
  _id: "",
  name: "Artist Loading",
  url: "",
  date: "",
  art: [
    {
      _id: "",
      url: "",
    },
  ],
};

const nameset: string[] = [""];

const completed: boolean[] = [false, false, false, false, false];

const Game = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [artist, setArtist] = useState(daily_artist);
  const [names, setNames] = useState(nameset);
  const [gameValue, setGameValue] = useState("");
  const [guesses, setGuesses] = useState<{ attempts: string[] }>({
    attempts: [],
  });

  const handleStep = (step: number) => () => {
    if (step === 0 || completed[step - 1] === true) {
      setActiveStep(step);
    }
  };

  const validateArtist = async (attempt: string) => {
    setGuesses({
      attempts: [...guesses.attempts, attempt],
    });
    let results = await fuzzyMatch(
      attempt.toLowerCase(),
      artist.name.toLowerCase()
    );
    if (results.length === 0) {
      completed[activeStep] = true;
      setActiveStep(activeStep + 1);
    } else {
      setNames(names.filter((name) => !results.includes(name.toLowerCase())));
    }
  };

  useEffect(() => {
    getDailyArt()
      .then((data: artist) => {
        setArtist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setNames(artist.name.split(regex));
  }, [artist]);

  return (
    <div className="page">
      <div className="content">
        <div className="image-stuff">
          <div className="art-image">
            {artist._id ? (
              <img
                src={artist.art[activeStep].url}
                alt={artist.art[activeStep]._id}
              />
            ) : (
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={300} height={118} />
              </Stack>
            )}
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
        </div>
        <div className="text-stuff">
          <div className="art-name">
            <Box>
              {artist.name.split(/([^a-z])/i).map((word: string) => {
                console.log(artist.name, word);
                let word_key = Math.random().toString(36).slice(2, 7);
                if (names.includes(word)) {
                  return (
                    <span key={word_key} className="name-mask">
                      {word}
                    </span>
                  );
                } else {
                  return (
                    <span key={word_key} className="name-plain">
                      {word}
                    </span>
                  );
                }
              })}
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
              <Button
                className="form-button"
                type={"submit"}
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </div>
          <div className="art-guess">
            <Stack sx={{ width: "inherit" }} spacing={1}>
              {guesses.attempts.map((attempt) => {
                const match = isAnswer(attempt, artist.name);
                return (
                  <Alert key={attempt} severity={severities[match]}>
                    {attempt}
                  </Alert>
                );
              })}
            </Stack>
          </div>
        </div>
      </div>
      <div className="art-rest"></div>
    </div>
  );
};
export default Game;
