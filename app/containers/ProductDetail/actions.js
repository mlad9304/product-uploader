import {
  INIT_FILES,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_DROPBOX_FILES,
  GET_DROPBOX_FILES_SUCCESS,
  GET_DROPBOX_FILES_ERROR,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from './constants';

export function initFiles() {
  return {
    type: INIT_FILES,
  };
}

export function uploadFile(file, productId) {
  return {
    type: UPLOAD_FILE,
    file,
    productId,
  };
}

export function fileUploaded(file) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    file,
  };
}

export function fileUploadingError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function getProduct(productId) {
  return {
    type: GET_PRODUCT,
    productId,
  };
}

export function getProductSuccess(product) {
  return {
    type: GET_PRODUCT_SUCCESS,
    product,
  };
}

export function productGettingError(error) {
  return {
    type: GET_PRODUCT_ERROR,
    error,
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

export function deleteFile(filePath, productId) {
  return {
    type: DELETE_FILE,
    filePath,
    productId,
  };
}

export function deleteFileSuccess(file) {
  return {
    type: DELETE_FILE_SUCCESS,
    file,
  };
}

export function deleteFileError(error) {
  return {
    type: DELETE_FILE_ERROR,
    error,
  };
}
