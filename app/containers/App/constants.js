/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_PRODUCTS = 'product_uploader/App/LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS =
  'product_uploader/App/LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_ERROR = 'product_uploader/App/LOAD_PRODUCTS_ERROR';

export const ADD_PRODUCT = 'product_uploader/App/ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'product_uploader/App/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'product_uploader/App/ADD_PRODUCT_ERROR';

export const UPDATE_PRODUCT = 'product_uploader/App/UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS =
  'product_uploader/App/UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'product_uploader/App/UPDATE_PRODUCT_ERROR';

export const UPLOAD_FILE = 'product_uploader/App/UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'product_uploader/App/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_ERROR = 'product_uploader/App/UPLOAD_FILE_ERROR';

export const GET_PRODUCT = 'product_uploader/App/GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'product_uploader/App/GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'product_uploader/App/GET_PRODUCT_ERROR';

export const POST_USER_INFO = 'product_uploader/App/POST_USER_INFO';
export const POST_USER_INFO_SUCCESS =
  'product_uploader/App/POST_USER_INFO_SUCCESS';
export const POST_USER_INFO_ERROR = 'product_uploader/App/POST_USER_INFO_ERROR';
