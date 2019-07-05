import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectSelectedProductId = () =>
  createSelector(
    selectHome,
    homeState => homeState.selectedProductId,
  );

export { selectHome, makeSelectSelectedProductId };
