import { artist } from "../../types/artist";
import "../../assets/css/gameParts/ArtImage.sass";
import { Skeleton, Stack } from "@mui/material";
import { maskWords } from "../../utils/matchUtil";

interface ArtImageProps {
  artist: artist;
  activeStep: number;
  names: string[];
}
const ArtImage = (props: ArtImageProps) => {
  // Guard against a step with no matching artwork so navigating never crashes.
  const art = props.artist.art?.[props.activeStep];
  const loaded = Boolean(props.artist._id && art?.url);

  return (
    <figure className="art-figure">
      <div className="art-image">
        {loaded ? (
          <img src={art!.url} alt={`Clue ${props.activeStep + 1}`} />
        ) : (
          <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={300} height={118} />
          </Stack>
        )}
      </div>
      <figcaption className="art-caption">
        {loaded && art?.name
          ? maskWords(art.name, props.names).map((part, index) =>
              part.masked ? (
                <span
                  key={index}
                  className="mask-word"
                  aria-label="hidden word"
                >
                  {Array.from(part.text).map((_, tile) => (
                    <span key={tile} className="mask-tile" aria-hidden="true" />
                  ))}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )
          : null}
        {loaded && art?.year ? <span>, {art.year}</span> : null}
      </figcaption>
    </figure>
  );
};

export default ArtImage;
