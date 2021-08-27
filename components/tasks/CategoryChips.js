import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-1),
  },
  chip: {
    margin: theme.spacing(0.5),
    "&:focus": { backgroundColor: theme.palette.primary.main },
    "&:hover": { backgroundColor: "E0E0E0" },
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.main,
  },
}));

export default function CategoryChips(props) {
  const classes = useStyles();
  const [activeChip, setActiveChip] = useState(
    props.categories[0]._id.toString()
  );

  const handleClick = (categoryId) => {
    setActiveChip(categoryId.toString());
  };

  return (
    <div component="ul" className={classes.root}>
      {props.categories.map((category) => {
        return (
          <li key={category._id}>
            <Chip
              key={category._id}
              label={`${category.name}`}
              onClick={handleClick.bind(null, category._id)}
              style={{ backgroundColor: "fff" }}
              className={`${classes.chip} ${
                activeChip == category._id.toString() ? classes.active : ""
              }`}
            />
          </li>
        );
      })}
    </div>
  );
}
