import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FileInput from "../UI/FileInput/FileInput";

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
    description: "",
    image: null,
  });

  const submitFormHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];
    setState(prevState => {
      return {...prevState, [name]: file}
    });
  };

  console.log(state);

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
          required
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <TextField
          required
          type="number"
          label="Price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <TextField
          required
          multiline
          rows={3}
          label="Description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <FileInput
          label="Image"
          name="image"
          onChange={fileChangeHandler}
        />
      </Grid>

      <Grid item xs>
        <Button type="submit" color="primary" variant="contained">Create</Button>
      </Grid>
    </Grid>
  );
};

export default ProductForm;