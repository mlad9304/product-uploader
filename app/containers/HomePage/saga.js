/**
 * Gets the products
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_PRODUCTS } from 'containers/App/constants';
import { productsLoaded, productsLoadingError } from 'containers/App/actions';

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}
