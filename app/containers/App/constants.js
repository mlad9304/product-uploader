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
