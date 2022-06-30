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
import { useCookies } from "react-cookie";

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
const nameset: string[] = [""];
const completed: boolean[] = Array(gameSize).fill(false);

const Game = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [artist, setArtist] = useState(daily_artist);
  const [names, setNames] = useState(nameset);
  const [loss, setLoss] = useState(false);
  const [win, setWin] = useState(false);
  const [done, setDone] = useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [guesses, setGuesses] = useState<{ attempts: string[] }>({
    attempts: [],
  });

  const handleStep = (step: number) => () => {
    if (step > 4) {
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
      if (activeStep < 4) {
        setActiveStep(activeStep + 1);
      }
    } else {
      setNames(names.filter((name) => !results.includes(name.toLowerCase())));
    }
    if (!(loss || win)) {
      setGuesses({
        attempts: [...guesses.attempts, attempt],
      });
    }
  };

  useEffect(() => {
    setCookie("user", "cookieVal", {
      path: "/",
    });
  }, [cookie]);

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

  useEffect(() => {
    let done_attempts = completed.every((elem) => elem === true);
    let found_answer = names.length === 0;
    if (found_answer) {
      setWin(true);
      setDone(true);
    } else if (done_attempts) {
      setLoss(true);
      setDone(true);
      setNames(nameset);
    }
  }, [guesses, names]);

  useEffect(() => {
    if (done) {
      toClipboard(completed, guesses.attempts);
    }
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
