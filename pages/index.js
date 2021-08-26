import { Grid } from "@material-ui/core";
import { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import Image from "next/image";
import profilePic from "../public/illustration.svg";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "60%",
    margin: "0 auto",
    marginTop: "25%",
  },
  mainContainer: {
    height: "100vh",
  },
  illustrationOuter: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.main,
    textAlign: "center",
  },
  illustrationInner: {
    marginTop: "10%",
  },

  square1: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "70px",
    height: "70px",
    bottom: "50px",
    left: "50px",
  },
  square2: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "80px",
    height: "80px",
    bottom: 0,
  },
}));

export default function MainPage() {
  const classes = useStyles();

  const [page, setPage] = useState("signup");

  const redirectHandler = (pageTitle) => setPage(pageTitle);
  
  return (
    <Fragment>
      <Grid container className={classes.mainContainer}>
        <Grid item xs={6} className={classes.illustrationOuter}>
          <div className={classes.square1}></div>
          <div className={classes.square2}></div>

          <div className={classes.illustrationInner}>
            <Image
              src={profilePic}
              alt="Illustration"
              width={650}
              height={650}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.formContainer}>
            {page === "signup" && (
              <SignupForm redirectHandler={redirectHandler} />
            )}
            {page === "login" && (
              <LoginForm redirectHandler={redirectHandler} />
            )}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}
