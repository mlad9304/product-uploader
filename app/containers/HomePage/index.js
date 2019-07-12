/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import { push } from 'connected-react-router';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectProducts,
} from 'containers/App/selectors';
import {
  loadProducts,
  addProduct,
  updateProduct,
} from 'containers/App/actions';
import ProductList from './components/ProductList';
import { changeSelectedProductId } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSelectedProductId } from './selectors';

const key = 'home';

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

export function HomePage({
  products,
  selectedProductId,
  onLoadProducts,
  onChangeSelectedProductId,
  onAddProduct,
  onUpdateProduct,
  onNext,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    onLoadProducts();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RadioGroup
        value={selectedProductId}
        onChange={onChangeSelectedProductId}
      >
        <Grid container spacing={3}>
          <ProductList products={products} onUpdateProduct={onUpdateProduct} />

          <div style={{ width: '100%' }}>
            <Box display="flex" xs={12}>
              <Box flexGrow={1}>
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  className={classes.fab}
                  onClick={onAddProduct}
                >
                  <AddIcon className={classes.btnIcon} />
                  Add Product
                </Fab>
              </Box>
              <Box>
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  className={classes.fab}
                  onClick={() => onNext(selectedProductId)}
                >
                  Next
                </Fab>
              </Box>
            </Box>
          </div>
        </Grid>
      </RadioGroup>
    </div>
  );
}

HomePage.propTypes = {
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  selectedProductId: PropTypes.string,
  onLoadProducts: PropTypes.func,
  onChangeSelectedProductId: PropTypes.func,
  onAddProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  onNext: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  selectedProductId: makeSelectSelectedProductId(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadProducts: () => {
      dispatch(loadProducts());
    },
    onChangeSelectedProductId: event =>
      dispatch(changeSelectedProductId(event.target.value)),
    onAddProduct: () => dispatch(addProduct()),
    onUpdateProduct: product => dispatch(updateProduct(product)),
    onNext: productId => {
      if (productId && productId !== '')
        dispatch(push(`/products/${productId}`));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
