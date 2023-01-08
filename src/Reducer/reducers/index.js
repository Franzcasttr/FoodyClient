import { combineReducers } from 'redux';
import auth from './auth';
import product from './product';
import cart from './cart';
import user from './user';
import category from './categories';
import review from './review';

export const reducer = combineReducers({
  auth,
  product,
  cart,
  user,
  category,
  review,
});
