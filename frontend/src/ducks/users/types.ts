const GET_USER_SUCCESS: string = 'GET_USER_SUCCESS';
const GET_USER_REQUEST: string = 'GET_USER_REQUEST';
const GET_USER_FAILURE: string = 'GET_USER_FAILURE';

export const types = {
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
};

interface GetUserRequest {
  type: typeof GET_USER_REQUEST;
  payload: unknown;
}

interface GetUserFailure {
  type: typeof GET_USER_FAILURE;
  payload: unknown;
}

interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: unknown;
}

export type UserDispatchTypes =
  | GetUserRequest
  | GetUserFailure
  | GetUserSuccess;
