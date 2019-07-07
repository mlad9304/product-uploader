import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductDetail = state => state.productDetail || initialState;

const makeSelectFiles = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.files,
  );

export { selectProductDetail, makeSelectFiles };
