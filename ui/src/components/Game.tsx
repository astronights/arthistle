import { useCallback, useState } from "react";
import "../assets/css/game.sass";
import "../assets/css/page.sass";
import { getDailyArt } from "../api/art";
import { useEffect } from "react";
import { artist } from "../types/artist";
import { nameParts, fuzzyMatch } from "../utils/matchUtil";
import ArtImage from "./gameParts/ArtImage";
import { Toast } from "./gameParts/Toast";
import ArtList from "./gameParts/ArtList";
import ArtName from "./gameParts/ArtName";
import ArtInput from "./gameParts/ArtInput";
import ArtGuess from "./gameParts/ArtGuess";
import { toClipboard } from "../utils/exportUtil";
import { storeLocal } from "../utils/storageUtil";
import { stateType } from "../types/state";
import _ from "lodash";
import { getLocalDate } from "../utils/dateUtil";

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

  const loadState = (state: stateType) => {
    setCompleted(state.completed);
    setActiveStep(state.activeStep);
    setNames(state.names);
    setLoss(state.loss);
    setWin(state.win);
    setDone(state.done);
    setGuesses(state.guesses);
  };

  // A clue is reachable once the guess for the previous one has been used up.
  // Everything opens up once the game is over.
  const isUnlocked = useCallback(
    (step: number) =>
      step >= 0 &&
      step < gameSize &&
      (done || step === 0 || completed[step - 1] === true),
    [completed, done]
  );

  const handleStep = useCallback(
    (step: number) => {
      if (isUnlocked(step)) setActiveStep(step);
    },
    [isUnlocked]
  );

  const validateArtist = (attempt: string) => {
    if (done || attempt === "") return;

    const results = fuzzyMatch(attempt, artist.name);

    if (results.length === 0) {
      // A guess that reveals nothing costs a clue.
      const nextStep = completed.findIndex((c: boolean) => !c);
      if (nextStep !== -1) {
        const updated = [...completed];
        updated[nextStep] = true;
        setCompleted(updated);
        if (nextStep < gameSize - 1) setActiveStep(nextStep + 1);
      }
    }

    setNames(names.filter((name) => !results.includes(name.toLowerCase())));
    setGuesses({
      attempts: [...guesses.attempts, attempt],
    });
  };

  useEffect(() => {
    getDailyArt(getLocalDate())
      .then((data: artist) => {
        let prevState = JSON.parse(
          window.localStorage.getItem("arthistle") || "{}"
        );
        setArtist(data);
        if (!_.isEmpty(prevState) && prevState.artist?._id === data._id) {
          loadState(prevState);
        } else {
          setNames(nameParts(data.name));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Nothing left to settle once the game is over, and bailing out here also
    // stops the reveal below from re-triggering this effect.
    if (done || artist._id === "") return;

    let done_attempts = completed.every((elem) => elem === true);
    let found_answer = names.length === 0;
    if (found_answer) {
      setWin(true);
      setDone(true);
    } else if (done_attempts) {
      setLoss(true);
      setDone(true);
      setNames([""]);
    }
  }, [guesses, completed, names, done, artist]);

  // Keep the browser copy in step with the game, including which clue is open.
  useEffect(() => {
    if (artist._id === "") return;
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
  }, [completed, activeStep, artist, names, loss, win, done, guesses]);

  // Arrow keys move between the clues, as long as the guess box is not in use.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (event.key === "ArrowLeft") handleStep(activeStep - 1);
      else if (event.key === "ArrowRight") handleStep(activeStep + 1);
      else return;
      event.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeStep, handleStep]);

  const share = () => {
    return toClipboard(
      completed,
      guesses.attempts,
      artist.name.toLowerCase(),
      gameSize
    );
  };

  return (
    <div className="page">
      <Toast
        flag={loss}
        update={setLoss}
        text={"Oops. You have run out of guesses."}
        code={"error"}
        share={share}
      />
      <Toast
        flag={win}
        update={setWin}
        text={"Congratulations! Right Answer!"}
        code={"success"}
        share={share}
      />

      <div className="content">
        <div className="image-stuff">
          <ArtImage artist={artist} activeStep={activeStep} names={names} />
          <ArtList
            size={gameSize}
            steps={completed}
            unlocked={Array.from(Array(gameSize).keys()).map(isUnlocked)}
            update={handleStep}
            curr={activeStep}
          />
        </div>
        <div className="text-stuff">
          <ArtName name={artist.name} names={names} />
          <ArtInput disabled={done} checkArtist={validateArtist} />
          <ArtGuess name={artist.name} attempts={guesses.attempts} />
        </div>
      </div>
    </div>
  );
};
export default Game;
