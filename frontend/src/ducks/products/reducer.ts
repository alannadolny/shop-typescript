import { types, ProductsDispatchTypes } from './types';

export const productsReducer = (state = [], action: ProductsDispatchTypes) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return action.payload;
    case types.GET_PRODUCTS_FAILURE:
      return [];
    default:
      return state;
  }
};
