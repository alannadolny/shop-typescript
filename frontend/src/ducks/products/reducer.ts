import { Product } from '../../ui/interfaces';
import { types, GetProductsSuccess } from './types';

export const productsReducer = (
  state: Array<Product> = [],
  action: GetProductsSuccess
): Array<Product> => {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
      return state;
    case types.GET_PRODUCTS_SUCCESS:
      return action.payload;
    case types.GET_PRODUCTS_FAILURE:
      return [];
    default:
      return state;
  }
};
