import { Box } from "@mui/material";
import { artist } from "../../types/artist";
import { RealisticTyper } from "react-realistic-typer";
import "../../assets/css/gameParts/ArtName.sass";

interface ArtNameProps {
  artist: artist;
  names: string[];
}

const ArtName = (props: ArtNameProps) => {
  return (
    <div className="art-name">
      <Box>
        {props.artist.name.split(/([^a-z])/i).map((word: string) => {
          let word_key = Math.random().toString(36).slice(2, 7);
          if (props.names.includes(word)) {
            return (
              <span key={word_key} className="name-mask">
                {"█".repeat(word.length)}
              </span>
            );
          } else {
            return (
              <span key={word_key} className="name-plain">
                {
                  <RealisticTyper
                    message={word}
                    wpm={160}
                    maxVariance={0.5}
                    maxPause={500}
                  />
                }
              </span>
            );
          }
        })}
      </Box>
    </div>
  );
};
export default ArtName;
