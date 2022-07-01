import { artist } from "../../types/artist";
import "../../assets/css/gameParts/ArtImage.sass";
import { Skeleton, Stack } from "@mui/material";

interface ArtImageProps {
  artist: artist;
  activeStep: number;
}
const ArtImage = (props: ArtImageProps) => {
  return (
    <div className="art-image">
      {props.artist._id ? (
        <img
          src={props.artist.art[props.activeStep].url}
          alt={props.artist.art[props.activeStep]._id}
        />
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
