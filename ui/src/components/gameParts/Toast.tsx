import { Alert, AlertColor, Snackbar } from "@mui/material";

interface ToastProps {
  flag: boolean;
  update: Function;
  code: AlertColor;
  text: string;
}
const Toast = (props: ToastProps) => {
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

export default Toast;
