import { Button, TextField } from "@mui/material";
import { SetStateAction, useState } from "react";
import "../../assets/css/gameParts/ArtInput.sass";

interface ArtInputProps {
  disabled: boolean;
  checkArtist: Function;
}

const ArtInput = (props: ArtInputProps) => {
  const [gameValue, setGameValue] = useState("");
  return (
    <div className="art-input">
      <form
        className="input-form"
        onSubmit={(valueEvent) => {
          valueEvent.preventDefault();
          props.checkArtist(gameValue);
        }}
      >
        <TextField
          disabled={props.disabled}
          className="form-text"
          fullWidth
          size="small"
          id="outlined-basic"
          label="Artist"
          name="artist"
          variant="outlined"
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setGameValue(e.target.value);
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
