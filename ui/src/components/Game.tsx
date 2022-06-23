import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import "../assets/css/game.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";

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
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    getDailyArt().then((data: artist) => {
      setArtist(data);
    });
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
    </div>
  );
};
export default Game;
