import { UserDetails } from './../../ui/interfaces';
import { types, UserDispatchType } from './types';

export const userReducer = (
  state: UserDetails = {},
  action: UserDispatchType
) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return action.payload;
    case types.GET_USER_FAILURE:
      return {};
    case types.DELETE_PRODUCT_SUCCESS:
      return state.selling === undefined
        ? {}
        : {
            ...state,
            selling: state.selling.filter(
              (el) => el._id !== action.payload[0]._id
            ),
          };
    default:
      return state;
  }
};
