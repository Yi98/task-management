import React, { useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import axios from "axios";
import FeedbackContext from "../../store/feedbackContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.main,
    width: "80%",
  },
  button: {
    marginTop: theme.spacing(2),
    textAlign: "right",
  },
  categoryPopper: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function AddCategoryForm(props) {
  const classes = useStyles();
  const nameInputRef = useRef();
  const feedbackCtx = useContext(FeedbackContext);

  const submitCategoryHandler = async function () {
    const name = nameInputRef.current.value;

    try {
      const response = await axios.post("/api/categories", { name });

      props.closeHandler();
      feedbackCtx.showFeedback({ message: "New category added." });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      placement="right-start"
      transition
      className={classes.categoryPopper}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
                onClick={props.closeHandler}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Grid>

            <TextField
              inputRef={nameInputRef}
              autoFocus
              id="name"
              required
              label="Category name"
              type="text"
              fullWidth
            />
            <Button
              onClick={submitCategoryHandler}
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              disableElevation
            >
              Create
            </Button>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
