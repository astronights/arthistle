import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../assets/css/game.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";
import { fuzzyMatch, isAnswer, severities } from "../utils/util";

const daily_artist: artist = {
  _id: "",
  name: "Artist Loading...",
  url: "",
  date: "",
  art: [
    {
      _id: "",
      url: "",
    },
  ],
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

  const validateArtist = async (attempt: string) => {
    console.log(`Checking artist... ${attempt}`);
    setGuesses({
      attempts: [...guesses.attempts, attempt],
    });
    let results = await fuzzyMatch(
      attempt.toLowerCase(),
      artist.name.toLowerCase()
    );
    console.log(results);
  };

  useEffect(() => {
    getDailyArt()
      .then((data: artist) => {
        setArtist(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setCompleted(
      Object.fromEntries(Object.keys(completed).map((key) => [key, false]))
    );
  }, []);

  return (
    <div className="game">
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
      <div className="art-guess">
        <Stack sx={{ width: "50%" }} spacing={1}>
          {guesses.attempts.map((attempt) => {
            const match = isAnswer(attempt, artist.name);
            console.log(match);
            return (
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity={severities[match]}
              >
                {attempt}
              </Alert>
            );
          })}
        </Stack>
        {/* <List dense={false}>
          {guesses.attempts.map((attempt) => (
            <ListItem className="list-item" alignItems="flex-start">
              <ListItemIcon className="list-icon">
                {isAnswer(attempt, artist.name) ? (
                  <CheckIcon fontSize="medium" />
                ) : (
                  <ClearIcon fontSize="medium" />
                )}
              </ListItemIcon>
              <ListItemText primary={attempt} />
            </ListItem>
          ))}
        </List> */}
      </div>
    </div>
  );
};
export default Game;
