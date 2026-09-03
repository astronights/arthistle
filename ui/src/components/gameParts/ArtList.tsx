import "../../assets/css/gameParts/ArtList.sass";
import { Box, Step, StepButton, Stepper } from "@mui/material";

interface ArtListProps {
  size: number;
  curr: number;
  steps: boolean[];
  unlocked: boolean[];
  update: (step: number) => void;
}
const ArtList = (props: ArtListProps) => {
  return (
    <div className="art-list">
      <Box>
        <Stepper nonLinear activeStep={props.curr}>
          {Array.from(Array(props.size).keys()).map((index) => (
            <Step key={index} completed={props.steps[index]}>
              <StepButton
                color="inherit"
                aria-label={`Clue ${index + 1}`}
                disabled={!props.unlocked[index]}
                onClick={() => props.update(index)}
              />
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};
export default ArtList;
