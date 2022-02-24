import { types, UserDispatchType } from './types';

export const userReducer = (state = {}, action: UserDispatchType) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return action.payload;
    case types.GET_USER_FAILURE:
      return {};
    default:
      return state;
  }
};
