import React, { useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton, TextField } from "@material-ui/core";
import axios from "axios";
import FeedbackContext from "../../store/feedback-context";
import CategoryContext from "../../store/category-context";
import { CirclePicker } from "react-color";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { CompareArrowsOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.main,
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    textAlign: "right",
  },
  categoryPopper: {
    zIndex: theme.zIndex.modal + 1,
  },
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

export default function AddCategoryForm(props) {
  const classes = useStyles();
  const nameInputRef = useRef();
  const feedbackCtx = useContext(FeedbackContext);
  const categoryCtx = useContext(CategoryContext);
  const [color, setColor] = useState({
    background: "#fff",
  });

  const handleColorChangeComplete = (newColor) => {
    setColor({ background: newColor.hex });
    console.log(color);
  };

  const submitCategoryHandler = async function () {
    const name = nameInputRef.current.value;

    try {
      const response = await axios.post("/api/categories", {
        name,
        hexColor: color.background,
      });

      categoryCtx.dispatchCategory({
        type: "INPUT",
        val: [...categoryCtx.categoryState.original, response.data.category],
      });

      props.closeHandler();
      feedbackCtx.showFeedback({ message: "New category added." });
    } catch (error) {
      console.log(error);
    }
  };

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
        Add new category
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
            inputRef={nameInputRef}
            autoFocus
            variant="outlined"
            label="Name"
            type="text"
            fullWidth
          />
        </Box>

        <Box mb={3}>
          <CirclePicker
            width="100%"
            color={color}
            onChangeComplete={handleColorChangeComplete}
          />
        </Box>
      </DialogContent>
      <Box px={1.5} pb={1.5}>
        <DialogActions>
          <Button
            onClick={submitCategoryHandler}
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

    // <Popper
    //   open={props.open}
    //   anchorEl={props.anchorEl}
    //   placement="right-start"
    //   transition
    //   className={classes.categoryPopper}
    // >
    //   {({ TransitionProps }) => (
    //     <Fade {...TransitionProps} timeout={350}>
    //       <Paper className={classes.paper}>
    //         <Grid
    //           container
    //           direction="row"
    //           justifyContent="flex-end"
    //           alignItems="center"
    //         >
    //           <IconButton
    //             aria-label="delete"
    //             className={classes.margin}
    //             size="small"
    //             onClick={props.closeHandler}
    //           >
    //             <CloseIcon fontSize="inherit" />
    //           </IconButton>
    //         </Grid>

    //         <TextField
    //           inputRef={nameInputRef}
    //           autoFocus
    //           id="name"
    //           required
    //           label="Category name"
    //           type="text"
    //           fullWidth
    //         />
    // <CirclePicker width="252px" />
    //         <Button
    //           onClick={submitCategoryHandler}
    //           className={classes.button}
    //           variant="contained"
    //           size="small"
    //           color="primary"
    //           disableElevation
    //         >
    //           Add
    //         </Button>
    //       </Paper>
    //     </Fade>
    //   )}
    // </Popper>
  );
}
