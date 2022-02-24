import { Cart } from './../../ui/interfaces';
const GET_CARTS_SUCCESS: string = 'GET_CARTS_SUCCESS';
const GET_CARTS_REQUEST: string = 'GET_CARTS_REQUEST';
const GET_CARTS_FAILURE: string = 'GET_CARTS_FAILURE';

const ADD_TO_CART_REQUEST: string = 'ADD_TO_CART_REQUEST';
const ADD_TO_CART_SUCCESS: string = 'ADD_TO_CART_SUCCESS';
const ADD_TO_CART_FAILURE: string = 'ADD_TO_CART_FAILURE';

export const types = {
  GET_CARTS_REQUEST,
  GET_CARTS_FAILURE,
  GET_CARTS_SUCCESS,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
};

export interface GetCartsSuccess {
  type: typeof GET_CARTS_SUCCESS;
  payload: Array<Cart>;
}

export interface AddToCartSuccess {
  type: typeof ADD_TO_CART_SUCCESS;
  payload: string;
}
