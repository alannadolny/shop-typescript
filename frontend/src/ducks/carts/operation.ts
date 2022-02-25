import { types } from './types';
import { createAction } from 'redux-api-middleware';

export const getCartList = () => {
  return createAction({
    endpoint: 'http://localhost:5432/carts',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.GET_CARTS_REQUEST,
      {
        type: types.GET_CARTS_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_CARTS_FAILURE,
    ],
  });
};

export const addToCart = (id: string | undefined) => {
  return createAction({
    endpoint: 'http://localhost:5432/carts/new',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: id,
    }),
    types: [
      types.ADD_TO_CART_REQUEST,
      {
        type: types.ADD_TO_CART_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json.id;
        },
      },
      types.ADD_TO_CART_FAILURE,
    ],
  });
};

export const deleteFromCart = (id: string | undefined) => {
  return createAction({
    endpoint: 'http://localhost:5432/carts/product',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: id,
    }),
    types: [
      types.DELETE_FROM_CART_REQUEST,
      {
        type: types.DELETE_FROM_CART_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json.id;
        },
      },
      types.DELETE_FROM_CART_FAILURE,
    ],
  });
};

export const deleteCart = () => {
  return createAction({
    endpoint: 'http://localhost:5432/carts/all',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.DELETE_CART_REQUEST,
      {
        type: types.DELETE_CART_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DELETE_CART_FAILURE,
    ],
  });
};

export const buyCart = () => {
  return createAction({
    endpoint: 'http://localhost:5432/carts/buy',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.BUY_CART_REQUEST,
      {
        type: types.BUY_CART_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.BUY_CART_FAILURE,
    ],
  });
};
