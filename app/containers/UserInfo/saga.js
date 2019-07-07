/**
 * Gets the products
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { POST_USER_INFO } from 'containers/App/constants';
import { userInfoPosted, userInfoPostingError } from 'containers/App/actions';

import request from 'utils/request';
import globalConfig from 'global-config';

export function* postUserInfo(payload) {
  const requestURL = `${globalConfig.baseUrl}/api/users`;

  try {
    // Call our request helper (see 'utils/request')
    const userInfo = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.userInfo),
    });
    yield put(userInfoPosted(userInfo));
  } catch (err) {
    yield put(userInfoPostingError(err));
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
  yield takeLatest(POST_USER_INFO, postUserInfo);
}
