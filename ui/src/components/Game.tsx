import { useState } from "react";
import "../assets/css/Game.sass";
import "../assets/css/page.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";
import { regex, fuzzyMatch } from "../utils/matchUtil";
import ArtImage from "./gameParts/ArtImage";
import Toast from "./gameParts/Toast";
import ArtList from "./gameParts/ArtList";
import ArtName from "./gameParts/ArtName";
import ArtInput from "./gameParts/ArtInput";
import ArtGuess from "./gameParts/ArtGuess";
import { toClipboard } from "../utils/exportUtil";
import { storeLocal } from "../utils/storageUtil";
import { stateType } from "../types/state";
import _ from "lodash";

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

const gameSize: number = 5;

const Game = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [artist, setArtist] = useState(daily_artist);
  const [names, setNames] = useState([""]);
  const [loss, setLoss] = useState(false);
  const [win, setWin] = useState(false);
  const [done, setDone] = useState(false);
  const [completed, setCompleted] = useState(Array(gameSize).fill(false));
  const [guesses, setGuesses] = useState<{ attempts: string[] }>({
    attempts: [],
  });

  const saveState = () => {
    storeLocal({
      completed,
      activeStep,
      artist,
      names,
      loss,
      win,
      done,
      guesses,
    });
  };

  const loadState = (state: stateType) => {
    setCompleted(state.completed);
    setActiveStep(state.activeStep);
    setArtist(state.artist);
    setNames(state.names);
    setLoss(state.loss);
    setWin(state.win);
    setDone(state.done);
    setGuesses(state.guesses);
  };

  const handleStep = (step: number) => () => {
    if (step > gameSize - 1) {
      setActiveStep(4);
    } else if (step === 0 || completed[step - 1] === true) {
      setActiveStep(step);
    }
  };

  const validateArtist = async (attempt: string) => {
    let results = await fuzzyMatch(
      attempt.toLowerCase(),
      artist.name.toLowerCase()
    );
    if (results.length === 0) {
      completed[activeStep] = true;
      if (activeStep < gameSize - 1) {
        setActiveStep(activeStep + 1);
      }
    }
    setNames(names.filter((name) => !results.includes(name.toLowerCase())));
    setGuesses({
      attempts: [...guesses.attempts, attempt],
    });
  };

  useEffect(() => {
    getDailyArt()
      .then((data: artist) => {
        setArtist(data);
        setNames(data.name.split(regex));
        let prevState = JSON.parse(
          window.localStorage.getItem("arthistle") || "{}"
        );
        if (!_.isEmpty(prevState)) {
          if (prevState.artist._id === data._id) {
            loadState(prevState);
          } else {
            saveState();
          }
        } else {
          saveState();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let done_attempts = completed.every((elem) => elem === true);
    let found_answer = names.length === 0;
    console.log(names, completed, found_answer, done_attempts);
    if (found_answer) {
      setWin(true);
      setDone(true);
    } else if (done_attempts) {
      setLoss(true);
      setDone(true);
      setNames([""]);
    }
    if (artist._id !== "") saveState();
  }, [guesses]);

  useEffect(() => {
    if (done) {
      toClipboard(completed, guesses.attempts);
    }
    if (artist._id !== "") saveState();
  }, [done]);

  return (
    <div className="page">
      <Toast
        flag={loss}
        update={setLoss}
        text={"Oops. You have run out of guesses."}
        code={"error"}
      />
      <Toast
        flag={win}
        update={setWin}
        text={"Congratulations! Right Answer!"}
        code={"success"}
      />

      <div className="image-stuff">
        <ArtImage artist={artist} activeStep={activeStep} />
        <ArtList
          size={gameSize}
          steps={completed}
          update={handleStep}
          curr={activeStep}
        />
      </div>
      <div className="text-stuff">
        <ArtName artist={artist} names={names} />
        <ArtInput disabled={done} checkArtist={validateArtist} />
        <ArtGuess name={artist.name} attempts={guesses.attempts} />
      </div>
    </div>
  );
};
export default Game;
