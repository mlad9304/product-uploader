/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RadioGroup from '@material-ui/core/RadioGroup';

import Product from './components/Product';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
  },
  btnIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    selectedProductId: "1",
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <RadioGroup
        value={values.selectedProductId}
        onChange={handleChange('selectedProductId')}
      >
        <Grid container spacing={3}>
          <Product productId="1" />
          <Product productId="2" />

          <Grid item xs={12}>
            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
              <AddIcon className={classes.btnIcon} />
              Add Product
            </Fab>
          </Grid>
        </Grid>
      </RadioGroup>
    </div>
  );
}

