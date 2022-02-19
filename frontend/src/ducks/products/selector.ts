import { RootReducers } from './../store';
export const getProducts = (state: RootReducers) => {
  return state.products;
};
