import produce from 'immer';
import { CHANGE_SELECTED_PRODUCT_ID } from './constants';

// The initial state of the App
export const initialState = {
  selectedProductId: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SELECTED_PRODUCT_ID:
        // Delete prefixed '@' from the github username
        draft.selectedProductId = action.productId;
        break;
    }
  });

export default homeReducer;
