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
