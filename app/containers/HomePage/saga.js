/**
 * Gets the products
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from 'containers/App/constants';
import {
  productsLoaded,
  productsLoadingError,
  productAdded,
  productAddingError,
  productUpdated,
  productUpdatingError,
} from 'containers/App/actions';

import request from 'utils/request';
import globalConfig from 'global-config';
import { changeSelectedProductId } from './actions';

/**
 * Github repos request/response handler
 */
export function* getProducts() {
  const requestURL = `${globalConfig.baseUrl}/api/products`;

  try {
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL);
    yield put(productsLoaded(products));
    if (Array.isArray(products) && products.length > 0) {
      const firstProduct = products[0];
      // eslint-disable-next-line dot-notation
      yield put(changeSelectedProductId(firstProduct['_id']));
    }
  } catch (err) {
    yield put(productsLoadingError(err));
  }
}

export function* addProduct() {
  const requestURL = `${globalConfig.baseUrl}/api/products`;

  try {
    // Call our request helper (see 'utils/request')
    const product = yield call(request, requestURL, { method: 'POST' });
    yield put(productAdded(product));
  } catch (err) {
    yield put(productAddingError(err));
  }
}

export function* updateProduct(payload) {
  const requestURL = `${globalConfig.baseUrl}/api/products`;

  try {
    // Call our request helper (see 'utils/request')
    const updatedProduct = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.product),
    });
    yield put(productUpdated(updatedProduct));
  } catch (err) {
    yield put(productUpdatingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* productData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PRODUCTS, getProducts);
  yield takeLatest(ADD_PRODUCT, addProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
}
