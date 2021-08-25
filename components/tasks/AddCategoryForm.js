import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";

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
              autoFocus
              id="name"
              required
              label="Category name"
              type="text"
              fullWidth
            />
            <Button
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
