/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from './constants';

export function loadProducts() {
  return {
    type: LOAD_PRODUCTS,
  };
}

export function productsLoaded(products) {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    products,
  };
}

export function productsLoadingError(error) {
  return {
    type: LOAD_PRODUCTS_ERROR,
    error,
  };
}

export function addProduct() {
  return {
    type: ADD_PRODUCT,
  };
}

export function productAdded(product) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    product,
  };
}

export function productAddingError(error) {
  return {
    type: ADD_PRODUCT_ERROR,
    error,
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
}

export function productUpdated(product) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    product,
  };
}

export function productUpdatingError(error) {
  return {
    type: UPDATE_PRODUCT_ERROR,
    error,
  };
}

export function deleteProduct(productId) {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
}

export function deleteProductSuccess(
  productId,
  deletedProduct,
  deletedDropboxProduct,
) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    productId,
    deletedProduct,
    deletedDropboxProduct,
  };
}

export function deleteProductError(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    error,
  };
}
