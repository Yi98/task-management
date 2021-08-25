import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import { Box, IconButton } from "@material-ui/core";
import AddCategoryForm from "../categories/AddCategoryForm";

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
  },
}));

const ChipsArray = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const openHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const closeHandler = (event) => {
    setOpen(false);
  };

  const [chipData, setChipData] = React.useState([
    { key: 1, label: "Work" },
    { key: 2, label: "Personal" },
    { key: 3, label: "Wishlist" },
    { key: 4, label: "Others" },
  ]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div component="ul" className={classes.root}>
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              color="default"
              label={`${data.label} (5)`}
              onClick={handleClick}
              className={classes.chip}
            />
          </li>
        );
      })}
      <AddCategoryForm
        open={open}
        anchorEl={anchorEl}
        closeHandler={closeHandler}
      />
      <Box mt={-0.5}>
        <IconButton aria-label="add" onClick={openHandler}>
          <AddIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default ChipsArray;
