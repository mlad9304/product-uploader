/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  GET_PRODUCT,
  UPLOAD_FILE,
  GET_DROPBOX_FILES,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  GET_DROPBOX_FILES_ERROR,
  GET_DROPBOX_FILES_SUCCESS,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from 'containers/ProductDetail/constants';
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  products: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line no-empty
    switch (action.type) {
      case LOAD_PRODUCTS:
        draft.loading = true;
        draft.error = false;
        draft.products = false;
        break;

      case LOAD_PRODUCTS_SUCCESS:
        draft.products = action.products;
        draft.loading = false;
        break;

      case LOAD_PRODUCTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADD_PRODUCT:
        draft.loading = true;
        draft.error = false;
        break;

      case ADD_PRODUCT_SUCCESS:
        if (draft.products)
          draft.products = [...draft.products, action.product];
        else draft.products = [action.product];
        draft.loading = false;
        break;

      case ADD_PRODUCT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_PRODUCT:
      case UPLOAD_FILE:
      case GET_DROPBOX_FILES:
      case DELETE_PRODUCT:
      case DELETE_FILE:
        draft.loading = true;
        break;

      case UPLOAD_FILE_SUCCESS:
      case UPLOAD_FILE_ERROR:
      case GET_DROPBOX_FILES_SUCCESS:
      case GET_DROPBOX_FILES_ERROR:
      case DELETE_PRODUCT_SUCCESS:
      case DELETE_PRODUCT_ERROR:
      case DELETE_FILE_SUCCESS:
      case DELETE_FILE_ERROR:
        draft.loading = false;
        break;
    }
  });

export default appReducer;
