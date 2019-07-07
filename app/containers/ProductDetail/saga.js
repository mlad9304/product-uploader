/**
 * Gets the products
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { UPLOAD_FILE, GET_PRODUCT } from 'containers/App/constants';
import {
  fileUploaded,
  fileUploadingError,
  getProductSuccess,
  productGettingError,
} from 'containers/App/actions';

import request from 'utils/request';
import globalConfig from 'global-config';

export function* getProduct(payload) {
  const { productId } = payload;
  const requestURL = `${globalConfig.baseUrl}/api/products/${productId}`;

  try {
    // Call our request helper (see 'utils/request')
    const product = yield call(request, requestURL);
    yield put(getProductSuccess(product));
  } catch (err) {
    yield put(productGettingError(err));
  }
}

export function* uploadFile(payload) {
  const { productId, file } = payload;

  try {
    const uploadedFile = yield call(
      request,
      'https://content.dropboxapi.com/2/files/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: `/${productId}/${file.name}`,
            mode: 'add',
            autorename: true,
            mute: false,
            strict_conflict: false,
          }),
          Authorization: `Bearer ${globalConfig.dropboxAccessKey}`,
        },
        body: file,
      },
    );
    yield put(fileUploaded(uploadedFile));
  } catch (err) {
    yield put(fileUploadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* productDetailData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_PRODUCT, getProduct);
  yield takeLatest(UPLOAD_FILE, uploadFile);
}
