import { Cart } from './../../ui/interfaces';
import { GetCartsSuccess, types, AddToCartSuccess } from './types';
export const CartsReducer = (
  state: Array<Cart> = [],
  action: GetCartsSuccess | AddToCartSuccess
) => {
  switch (action.type) {
    case types.GET_CARTS_FAILURE:
      return [];
    case types.GET_CARTS_SUCCESS:
      return action.payload;
    case types.ADD_TO_CART_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.active)
            return { ...el, products: [...el.products, action.payload] };
          else return el;
        }),
      ];
    default:
      return state;
  }
};
