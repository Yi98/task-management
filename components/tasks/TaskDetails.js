import React, { useRef, useContext, useState } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";

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

export default function TaskDetails(props) {
  const classes = useStyles();
  const router = useRouter();
  const titleInputRef = useRef();
  const dateInputRef = useRef();
  const feedbackCtx = useContext(FeedbackContext);
  const categoryCtx = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState();

  async function editTaskHandler(id) {
    const title = titleInputRef.current.value;
    const dueDate = dateInputRef.current.value;

    try {
      const response = await axios.patch(`/api/tasks/${id}`, {
        title,
        dueDate,
        category: categoryCtx.categoryState.selected,
      });

      props.closeHandler();
      feedbackCtx.showFeedback({ message: response.data.message });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTaskHandler(id) {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);

      feedbackCtx.showFeedback({ message: response.data.message });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  }

  function selectCategoryHandler(categoryId) {
    setSelectedCategory(categoryId);
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
        Details
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
            defaultValue={props.task.title}
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
            defaultValue={props.task.dueDate}
            id="date"
            required
            variant="outlined"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={3}>
          <CategoryChips
            selected={props.category}
            selectCategoryHandler={selectCategoryHandler}
          />
        </Box>
      </DialogContent>
      <Box px={1.5} pb={1.5}>
        <DialogActions>
          <Button
            onClick={deleteTaskHandler.bind(null, props.task.taskId)}
            className={classes.deleteButton}
            endIcon={<DeleteIcon />}
            variant="outlined"
            disableElevation
            color="primary"
          >
            Delete
          </Button>
          <Button
            onClick={editTaskHandler.bind(null, props.task.taskId)}
            // disabled
            variant="contained"
            endIcon={<CheckIcon />}
            color="primary"
            disableElevation
          >
            Save changes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
