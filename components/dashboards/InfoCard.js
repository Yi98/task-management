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
    backgroundColor: theme.palette.background.dark  ,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Today tasks
        </Typography>
        {/* <Typography variant="h5" component="h2" className={classes.pos}>
          {props.title}
        </Typography> */}
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        <Typography variant="h3">0/14</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See details</Button>
      </CardActions>
    </Card>
  );
}
