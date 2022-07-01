import { Alert, AlertColor, Backdrop, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { midnightTom } from "../../utils/dateUtil";

interface ToastProps {
  flag: boolean;
  update: Function;
  code: AlertColor;
  text: string;
  share: Function;
}
export const Toast = (props: ToastProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.flag);
  }, [props.flag]);

  const padNum = (x: number) => {
    return String(x).padStart(2, "0");
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={(e) => {
        setOpen(!open);
      }}
    >
      <Snackbar
        open={props.flag}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => props.update(false)}
      >
        <Alert
          severity={props.code}
          sx={{ width: "inherit" }}
          onClick={(e) => e.stopPropagation()}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                props.share();
              }}
            >
              Share
            </Button>
          }
        >
          {props.text} The next Arthistle will be available in{" "}
          {
            <Countdown
              date={midnightTom()}
              renderer={(timeprops) => (
                <span>
                  {padNum(timeprops.hours)}:{padNum(timeprops.minutes)}:
                  {padNum(timeprops.seconds)}
                </span>
              )}
            />
          }
        </Alert>
      </Snackbar>
    </Backdrop>
  );
};

export default Toast;
