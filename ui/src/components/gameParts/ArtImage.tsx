import { artist } from "../../types/artist";
import "../../assets/css/gameParts/ArtImage.sass";
import { Skeleton, Stack } from "@mui/material";

interface ArtImageProps {
  artist: artist;
  activeStep: number;
}
const ArtImage = (props: ArtImageProps) => {
  // Guard against a step with no matching artwork so navigating never crashes.
  const art = props.artist.art?.[props.activeStep];

  return (
    <div className="art-image">
      {props.artist._id && art?.url ? (
        <img src={art.url} alt={`Clue ${props.activeStep + 1}`} />
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={300} height={118} />
        </Stack>
      )}
    </div>
  );
};

export default ArtImage;
