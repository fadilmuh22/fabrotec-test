import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = MuiButtonProps & {
  loading?: boolean;
};

export default function Button(props: ButtonProps) {
  return (
    <MuiButton
      {...props}
      disabled={props.loading}
      endIcon={props.loading && <CircularProgress size={16} />}
    >
      {props.children}
    </MuiButton>
  );
}
