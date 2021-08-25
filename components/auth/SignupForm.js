import { useRef } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formTitle: {
    paddingBottom: theme.spacing(0.5),
  },
  description: {
    paddingBottom: theme.spacing(2.5),
  },
  inputTitle: {
    paddingBottom: theme.spacing(1),
  },
  inputField: {
    paddingBottom: theme.spacing(2.5),
  },
  formButton: {
    marginBottom: theme.spacing(4),
    height: "3rem",
  },
  specialText: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

export default function SignupForm() {
  const classes = useStyles();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <div>
      <Typography variant="h4" className={classes.formTitle}>
        Get&apos;s Started
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Start organizing you task today!
      </Typography>
      <form>
        <div>
          <Typography variant="subtitle1" className={classes.inputTitle}>
            <strong>Email address*</strong>
          </Typography>
          <TextField
            inputRef={emailInputRef}
            required
            autoFocus
            type="text"
            variant="outlined"
            placeholder="name@domain.com"
            className={classes.inputField}
            fullWidth
          />
        </div>
        <div>
          <Typography variant="subtitle1" className={classes.inputTitle}>
            <strong>Password*</strong>
          </Typography>
          <TextField
            inputRef={passwordInputRef}
            required
            type="password"
            variant="outlined"
            placeholder="at least 8 characters"
            className={classes.inputField}
            fullWidth
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.formButton}
            fullWidth
          >
            Sign Up
          </Button>
        </div>
      </form>

      <Typography variant="subtitle1">
        Already have an account?{" "}
        <span className={classes.specialText}>
          <strong>Log In</strong>
        </span>
      </Typography>
    </div>
  );
}
