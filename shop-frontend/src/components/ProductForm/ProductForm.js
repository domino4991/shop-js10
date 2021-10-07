import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

const ProductForm = ({onSubmit}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    price: "",
    description: ""
  });

  const submitFormHandler = e => {
    e.preventDefault();
    onSubmit({...state});
  };

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      className={classes.root}
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid item xs>
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <TextField
          fullWidth
          variant="outlined"
          type="number"
          label="Price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <Button type="submit" color="primary" variant="contained">Create</Button>
      </Grid>
    </Grid>
  );
};

export default ProductForm;