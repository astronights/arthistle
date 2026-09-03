import { artist } from "../../types/artist";
import "../../assets/css/gameParts/ArtName.sass";
import { Box } from "@mui/material";
import { splitRegex } from "../../utils/matchUtil";

interface ArtNameProps {
  artist: artist;
  names: string[];
}

const ArtName = (props: ArtNameProps) => {
  // Split on the same separators the name was broken up with, keeping them so
  // the name renders exactly as written.
  const tokens = props.artist.name.split(splitRegex).filter(Boolean);
  const hidden = new Set(
    props.names.filter(Boolean).map((name) => name.toLowerCase())
  );

  return (
    <div className="art-name">
      <Box>
        {tokens.map((token: string, index: number) =>
          hidden.has(token.toLowerCase()) ? (
            <span key={index} className="name-mask">
              {"█".repeat(token.length)}
            </span>
          ) : (
            <span key={index} className="name-plain">
              {token}
            </span>
          )
        )}
      </Box>
    </div>
  );
};
export default ArtName;
