import { artist } from "../../types/artist";
import "../../assets/css/gameParts/ArtName.sass";
import { Box } from "@mui/material";

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
                {word}
              </span>
            );
          }
        })}
      </Box>
    </div>
  );
};
export default ArtName;
