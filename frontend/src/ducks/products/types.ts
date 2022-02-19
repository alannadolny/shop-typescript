const GET_PRODUCTS_SUCCESS: string = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_REQUEST: string = 'GET_PRODUCTS_REQUEST';
const GET_PRODUCTS_FAILURE: string = 'GET_PRODUCTS_FAILURE';

export const types = {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
};

interface GetProductsRequest {
  type: typeof GET_PRODUCTS_REQUEST;
  payload: unknown;
}

interface GetProductsFailure {
  type: typeof GET_PRODUCTS_FAILURE;
  payload: unknown;
}

interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: unknown;
}

export type ProductsDispatchTypes =
  | GetProductsRequest
  | GetProductsFailure
  | GetProductsSuccess;
