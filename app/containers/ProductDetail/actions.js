import {
  INIT_FILES,
  GET_DROPBOX_FILES,
  GET_DROPBOX_FILES_SUCCESS,
  GET_DROPBOX_FILES_ERROR,
} from './constants';

export function initFiles() {
  return {
    type: INIT_FILES,
  };
}

export function getDropboxFiles(productId) {
  return {
    type: GET_DROPBOX_FILES,
    productId,
  };
}

export function getDropboxFilesSuccess(dropboxFiles) {
  return {
    type: GET_DROPBOX_FILES_SUCCESS,
    dropboxFiles,
  };
}

export function getDropboxFilesError(error) {
  return {
    type: GET_DROPBOX_FILES_ERROR,
    error,
  };
}
