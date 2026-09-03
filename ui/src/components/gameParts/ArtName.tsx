import "../../assets/css/gameParts/ArtName.sass";
import { splitRegex } from "../../utils/matchUtil";

interface ArtNameProps {
  name: string;
  names: string[];
  // "hero" is the game's own headline treatment; "inline" sits in running text.
  variant?: "hero" | "inline";
}

const ArtName = (props: ArtNameProps) => {
  // Split on the same separators the name was broken up with, keeping them so
  // the name renders exactly as written.
  const tokens = props.name.split(splitRegex).filter(Boolean);
  const hidden = new Set(
    props.names.filter(Boolean).map((name) => name.toLowerCase())
  );

  return (
    <div className={`art-name art-name-${props.variant ?? "hero"}`}>
      {tokens.map((token: string, index: number) =>
        hidden.has(token.toLowerCase()) ? (
          <span
            key={index}
            className="name-mask"
            aria-label={`Hidden word, ${token.length} letters`}
          >
            {Array.from(token).map((_, tile) => (
              <span key={tile} className="name-tile" aria-hidden="true" />
            ))}
          </span>
        ) : (
          <span key={index} className="name-plain">
            {token}
          </span>
        )
      )}
    </div>
  );
};
export default ArtName;
