import { Product } from './../../ui/interfaces';
import { RootReducers } from './../store';

export const getProducts = (state: RootReducers): Array<Product> => {
  return state.products;
};

export const getProductById = (
  state: RootReducers,
  id: string | undefined
): Product | undefined => {
  return state.products.find((product: Product) => product._id === id);
};
