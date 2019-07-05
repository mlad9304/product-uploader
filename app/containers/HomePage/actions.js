import { CHANGE_SELECTED_PRODUCT_ID } from './constants';

export function changeSelectedProductId(productId) {
  return {
    type: CHANGE_SELECTED_PRODUCT_ID,
    productId,
  };
}
