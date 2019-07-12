import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductDetail = state => state.productDetail || initialState;

const makeSelectProductDetailInfo = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.info,
  );

const makeSelectDropboxImages = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.dropboxImages,
  );

const makeSelectDropboxVideo = () =>
  createSelector(
    selectProductDetail,
    productDetailState => productDetailState.dropboxVideo,
  );

export {
  selectProductDetail,
  makeSelectProductDetailInfo,
  makeSelectDropboxImages,
  makeSelectDropboxVideo,
};
