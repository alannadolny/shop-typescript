import { Product } from '../../ui/interfaces';

const GET_PRODUCTS_SUCCESS: string = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_REQUEST: string = 'GET_PRODUCTS_REQUEST';
const GET_PRODUCTS_FAILURE: string = 'GET_PRODUCTS_FAILURE';

export const types = {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
};

export interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: Array<Product>;
}
