import { Alert, AlertColor, Backdrop, Button, Snackbar } from "@mui/material";
import { useState } from "react";

interface ToastProps {
  flag: boolean;
  update: Function;
  code: AlertColor;
  text: string;
}
export const Toast = (props: ToastProps) => {
  return (
    <Snackbar
      open={props.flag}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => props.update(false)}
    >
      <Alert
        onClose={() => props.update(false)}
        severity={props.code}
        sx={{ width: "inherit" }}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export const DoneToast = (props: { done: boolean; share: Function }) => {
  const [open, setOpen] = useState(props.done);
  return (
    <Backdrop
      sx={{ color: "#fff" }}
      open={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Alert
        severity="info"
        sx={{ width: "inherit" }}
        action={
          <Button color="inherit" size="small" onClick={props.share()}>
            Share
          </Button>
        }
      ></Alert>
    </Backdrop>
  );
};
