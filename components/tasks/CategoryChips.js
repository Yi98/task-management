import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CategoryContext from "../../store/category-context";

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

export default function CategoryChips() {
  const classes = useStyles();
  const categoryCtx = useContext(CategoryContext);

  const handleClick = (categoryId) => {
    categoryCtx.dispatchCategory({
      type: "SELECT_ACTIVE",
      val: categoryId.toString(),
    });
  };

  return (
    <div component="ul" className={classes.root}>
      {categoryCtx.categoryState.selectable.map((category) => {
        if (category._id != "all") {
          return (
            <li key={category._id}>
              <Chip
                key={category._id}
                label={`${category.name}`}
                onClick={handleClick.bind(null, category._id)}
                style={{ backgroundColor: "fff" }}
                className={`${classes.chip} ${
                  categoryCtx.categoryState.selected == category._id || null
                    ? classes.active
                    : ""
                }`}
              />
            </li>
          );
        }
      })}
    </div>
  );
}
