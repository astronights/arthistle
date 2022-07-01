import { Alert, AlertColor, Backdrop, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { midnightTom, getNumber } from "../../utils/dateUtil";

interface ToastProps {
  flag: boolean;
  update: Function;
  code: AlertColor;
  text: string;
  share: Function;
}
export const Toast = (props: ToastProps) => {
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState(0); // 0: not copied, 1: copied, -1: error

  useEffect(() => {
    setOpen(props.flag);
  }, [props.flag]);

  const padNum = (x: number) => {
    return String(x).padStart(2, "0");
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        open={copy !== 0}
        onClose={() => {
          setCopy(0);
        }}
        message={copy === 1 ? "Results copied!" : "Error (Use Https)"}
      />
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
                  let isCopy = props.share();
                  isCopy ? setCopy(1) : setCopy(-1);
                }}
              >
                Share
              </Button>
            }
          >
            {props.text} The next Arthistle (#{getNumber() + 1}) will be
            available in{" "}
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
            . Stay tuned!
          </Alert>
        </Snackbar>
      </Backdrop>
    </div>
  );
};

export default Toast;
