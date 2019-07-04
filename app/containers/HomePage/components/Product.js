import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 210,
  },
}));

export default function Product({ productId }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({

  });
  const handleChange = name => event => {
    console.log(name, event.target.value)
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <FormControlLabel value={productId} control={<Radio />} />
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Product Name"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange('product_name')}
          />
          <TextField
            label="Variable 1"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Variable 2"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Variable 3"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Variable 4"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Paper>
    </Grid>
  );
}
