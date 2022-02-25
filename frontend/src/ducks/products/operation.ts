import { Product, ProductYupSchema } from './../../ui/interfaces';
import { types } from './types';
import { createAction } from 'redux-api-middleware';

export const getProductList = () => {
  return createAction({
    endpoint: 'http://localhost:5432/products',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.GET_PRODUCTS_REQUEST,
      {
        type: types.GET_PRODUCTS_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_PRODUCTS_FAILURE,
    ],
  });
};

export const sellProduct = (productToSell: ProductYupSchema) => {
  return createAction({
    endpoint: 'http://localhost:5432/products',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productToSell),
    types: [
      types.SELL_PRODUCT_REQUEST,
      {
        type: types.SELL_PRODUCT_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return [json];
        },
      },
      types.SELL_PRODUCT_FAILURE,
    ],
  });
};

export const deleteProduct = (productToSell: string) => {
  return createAction({
    endpoint: 'http://localhost:5432/products',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: productToSell }),
    types: [
      types.DELETE_PRODUCT_REQUEST,
      {
        type: types.DELETE_PRODUCT_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return [json];
        },
      },

      types.DELETE_PRODUCT_FAILURE,
    ],
  });
};
