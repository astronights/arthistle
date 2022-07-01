import { isAnswer, severities } from "../../utils/matchUtil";
import "../../assets/css/gameParts/ArtGuess.sass";
import { Alert, Stack } from "@mui/material";

interface ArtGuessProps {
  name: string;
  attempts: string[];
}

const ArtGuess = (props: ArtGuessProps) => {
  return (
    <div className="art-guess">
      <Stack className="guess-stack" spacing={1}>
        {props.attempts.map((attempt, index) => {
          const match = isAnswer(attempt, props.name);
          return (
            <Alert
              className="guess-alert"
              sx={{ display: "flex" }}
              key={index}
              severity={severities[match]}
            >
              {attempt}
            </Alert>
          );
        })}
      </Stack>
    </div>
  );
};

export default ArtGuess;
