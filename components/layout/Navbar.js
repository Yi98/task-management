import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: { flexGrow: 1 },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={classes.appBar}
      color="inherit"
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" passHref={true}>
          <Typography variant="h6" className={classes.title}>
            Tasky
          </Typography>
        </Link>
        <Button color="inherit">Welcome back, Ng</Button>
      </Toolbar>
    </AppBar>
  );
}
