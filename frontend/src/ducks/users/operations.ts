import { types } from './types';
import { createAction } from 'redux-api-middleware';

export const getUser = () => {
  return createAction({
    endpoint: 'http://localhost:5432/users/details',
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.GET_USER_REQUEST,
      {
        type: types.GET_USER_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_USER_FAILURE,
    ],
  });
};
