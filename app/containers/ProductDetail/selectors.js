import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductDetail = state => state.productDetail || initialState;

const makeSelectProductDetailInfo = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.info,
  );

const makeSelectFiles = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.files,
  );

export { selectProductDetail, makeSelectProductDetailInfo, makeSelectFiles };
