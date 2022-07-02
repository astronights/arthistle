import { SetStateAction, useState } from "react";
import "../../assets/css/gameParts/ArtInput.sass";
import { Button, TextField } from "@mui/material";

interface ArtInputProps {
  disabled: boolean;
  checkArtist: Function;
}

const ArtInput = (props: ArtInputProps) => {
  const [gameValue, setGameValue] = useState("");

  const isInputValid = (x: string) => {
    return /^[A-Za-z\s]*$/.test(x);
  };
  return (
    <div className="art-input">
      <form
        className="input-form"
        onSubmit={(valueEvent) => {
          valueEvent.preventDefault();
          if (gameValue !== "")
            props.checkArtist(gameValue.replace(/\s{2,}/g, " ").trim());
          setGameValue("");
        }}
      >
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
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            let text = e.target.value.toString();
            let isError = !isInputValid(text) || text.trim().length === 0;
            if (!isError) setGameValue(text);
          }}
        />
        &nbsp;
        <Button
          disabled={props.disabled}
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
