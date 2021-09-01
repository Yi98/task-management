import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.dark,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  remaining: {
    fontSize: theme.spacing(3),
    fontWeight: 300,
  },
  title: {
    fontSize: theme.spacing(2),
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography gutterBottom variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="body1" className={classes.remaining}>
          3 tasks remaining
        </Typography>
      </CardContent>
    </Card>
  );
}
