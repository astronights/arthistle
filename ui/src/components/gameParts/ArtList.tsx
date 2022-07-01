import "../../assets/css/gameParts/ArtList.sass";
import { Box, Step, StepButton, Stepper } from "@mui/material";

interface ArtListProps {
  size: number;
  curr: number;
  steps: boolean[];
  update: Function;
}
const ArtList = (props: ArtListProps) => {
  return (
    <div className="art-list">
      <Box>
        <Stepper nonLinear activeStep={props.curr}>
          {Array.from(Array(props.size).keys()).map((index) => (
            <Step key={index} completed={props.steps[index]}>
              <StepButton color="inherit" onClick={props.update(index)} />
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};
export default ArtList;
