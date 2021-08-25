import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddTaskForm from "./AddTaskForm";

const AddButton = (props) => {
  const [isOpened, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        {props.text}
      </Button>
      <AddTaskForm isOpened={isOpened} closeHandler={handleClose} />
    </Fragment>
  );
};

export default AddButton;
