import * as _ from 'lodash';
import { RootReducers } from '../store';

export const isLogged = (state: RootReducers) => {
  return !_.isEmpty(state.user);
};
