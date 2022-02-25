import { Cart } from './../../ui/interfaces';
import { GetCartsSuccess, types, AddToCartSuccess } from './types';

const deleteOneProduct = (
  productArray: Array<string>,
  productToDelete: string | Cart[]
) => {
  let deleted: number = 0;
  return productArray.filter((el) => {
    if (deleted === 0 && el.toString() === productToDelete) {
      deleted = 1;
      return false;
    } else return true;
  });
};

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
    case types.DELETE_FROM_CART_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.active)
            return {
              ...el,
              products: deleteOneProduct(el.products, action.payload),
            };
          else return el;
        }),
      ];
    case types.DELETE_CART_SUCCESS:
      return [...state.filter((cart) => !cart.active)];
    case types.BUY_CART_SUCCESS:
      return [
        ...state.map((el: Cart) => {
          return { ...el, active: false };
        }),
      ];
    default:
      return state;
  }
};
