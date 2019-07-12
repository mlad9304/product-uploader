import {
  POST_USER_INFO,
  POST_USER_INFO_SUCCESS,
  POST_USER_INFO_ERROR,
} from './constants';

export function postUserInfo(userInfo) {
  return {
    type: POST_USER_INFO,
    userInfo,
  };
}

export function userInfoPosted(userInfo) {
  return {
    type: POST_USER_INFO_SUCCESS,
    userInfo,
  };
}

export function userInfoPostingError(error) {
  return {
    type: POST_USER_INFO_ERROR,
    error,
  };
}
