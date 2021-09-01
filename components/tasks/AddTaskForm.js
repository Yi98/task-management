import React, { useRef, useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CategoryChips from "./CategoryChips";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import FeedbackContext from "../../store/feedback-context";
import CategoryContext from "../../store/category-context";
import { useRouter } from "next/router";
import useSWR from "swr";
import { initializeFetcher } from "../../lib/swr";

const useStyles = makeStyles((theme) => ({
  formDialogTitle: {
    fontSize: "4.5rem",
    paddingBottom: "5%",
    paddingLeft: "10%",
    textAlign: "center",
  },
  closeModalIcon: {
    float: "right",
    marginTop: theme.spacing(-0.5),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTaskForm(props) {
  const classes = useStyles();
  const titleInputRef = useRef();
  const dateInputRef = useRef();
  const feedbackCtx = useContext(FeedbackContext);
  const categoryCtx = useContext(CategoryContext);
  const router = useRouter();

  async function submitTaskHandler() {
    const title = titleInputRef.current.value;
    const dueDate = dateInputRef.current.value;

    try {
      const response = await axios.post("/api/tasks", {
        title,
        dueDate,
        category: categoryCtx.categoryState.selected,
      });

      // props.addTask(response.data.task);

      props.closeHandler();
      feedbackCtx.showFeedback({ message: "New task added." });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={props.isOpened}
      onClose={props.closeHandler}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
    >
      <DialogTitle id="form-dialog-title" className={classes.formDialogTitle}>
        Add new task
        <IconButton
          aria-label="close"
          onClick={props.closeHandler}
          className={classes.closeModalIcon}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            inputRef={titleInputRef}
            autoFocus
            required
            variant="outlined"
            label="Enter task headline"
            type="text"
            fullWidth
          />
        </Box>
        <Box mb={3}>
          <TextField
            inputRef={dateInputRef}
            id="date"
            required
            variant="outlined"
            label="Deadline"
            type="date"
            defaultValue="2021-08-21"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={3}>
          <CategoryChips />
        </Box>
      </DialogContent>
      <Box px={1.5} pb={1.5}>
        <DialogActions>
          <Button
            onClick={submitTaskHandler}
            variant="contained"
            color="secondary"
            endIcon={<CheckIcon />}
            disableElevation
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
