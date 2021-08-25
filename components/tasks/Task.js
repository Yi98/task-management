import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Chip, Grid, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(0.5),
      width: "100%",
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      padding: "1% 0 1% 10px",
    },
  },
  checkbox: {
    marginTop: theme.spacing(-1),
  },
  topContainer: {
    marginTop: theme.spacing(0.5),
  },
}));

export default function Task(props) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2}>
        <Grid container className={classes.topContainer}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{props.title}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.topContainer}>
            <Chip label={props.label} clickable color="primary" size="small" />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">{props.date}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.checkbox}>
            <Checkbox
              onChange={handleChange}
              color="primary"
              inputProps={{ "aria-label": "checkbox" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
