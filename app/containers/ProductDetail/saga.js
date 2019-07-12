/**
 * Gets the products
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import globalConfig from 'global-config';
import {
  getDropboxFilesSuccess,
  getDropboxFilesError,
  fileUploaded,
  fileUploadingError,
  getProductSuccess,
  productGettingError,
} from './actions';
import { UPLOAD_FILE, GET_PRODUCT, GET_DROPBOX_FILES } from './constants';

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
export function* getDropboxFiles(payload) {
  const { productId } = payload;

  try {
    const dropBoxFiles = yield call(
      request,
      'https://api.dropboxapi.com/2/files/list_folder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalConfig.dropboxAccessKey}`,
        },
        body: JSON.stringify({
          path: `/${productId}`,
          recursive: false,
          include_media_info: false,
          include_deleted: false,
          include_has_explicit_shared_members: false,
          include_mounted_folders: true,
          include_non_downloadable_files: true,
        }),
      },
    );
    const { entries } = dropBoxFiles;
    const dropboxFilelinks = yield all(
      entries.map(file =>
        call(request, 'https://api.dropboxapi.com/2/files/get_temporary_link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${globalConfig.dropboxAccessKey}`,
          },
          body: JSON.stringify({
            path: `${file.path_lower}`,
          }),
        }),
      ),
    );
    yield put(getDropboxFilesSuccess(dropboxFilelinks));
  } catch (err) {
    yield put(getDropboxFilesError(err));
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
  yield takeLatest(GET_DROPBOX_FILES, getDropboxFiles);
}
