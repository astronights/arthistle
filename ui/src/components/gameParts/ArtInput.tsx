import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "../../assets/css/gameParts/ArtInput.sass";
import { Button, TextField } from "@mui/material";

interface ArtInputProps {
  disabled: boolean;
  checkArtist: Function;
}

const maxLength = 64;

// Artist names are letters plus the punctuation that shows up in them, e.g.
// "M.C. Escher", "Georgia O'Keeffe" or "Henri de Toulouse-Lautrec".
const disallowed = /[^\p{L}\p{M}\s'’.,-]/gu;

// Drop characters a name can never contain and tidy up spacing, but never
// reject the edit itself so that backspacing always works.
const sanitize = (text: string) =>
  text
    .replace(disallowed, "")
    .replace(/\s+/g, " ")
    .replace(/^\s+/, "")
    .slice(0, maxLength);

const ArtInput = (props: ArtInputProps) => {
  const [gameValue, setGameValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (valueEvent: FormEvent) => {
    valueEvent.preventDefault();
    const attempt = gameValue.trim();
    if (props.disabled || attempt === "") return;
    props.checkArtist(attempt);
    setGameValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="art-input">
      <form className="input-form" onSubmit={submit}>
        <TextField
          value={gameValue}
          disabled={props.disabled}
          className="form-text"
          fullWidth
          size="small"
          id="outlined-basic"
          label="Artist"
          name="artist"
          variant="outlined"
          autoComplete="off"
          inputRef={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setGameValue(sanitize(e.target.value));
          }}
        />
        <Button
          disabled={props.disabled || gameValue.trim() === ""}
          className="form-button"
          type={"submit"}
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ArtInput;
