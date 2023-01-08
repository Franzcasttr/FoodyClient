import { store } from '..';
import { clearCart, createOrder, getUserCart, removeUserCart } from '../api';
import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  REMOVE_CART,
  REMOVE_CART_REQUEST,
} from '../Constants/actionTypes';

export const getCartItems = () => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const { data } = await getUserCart();
    const { cartItems } = data;

    if (cartItems) {
      dispatch({ type: ADD_TO_CART, payload: { cartItems } });
    }
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL, payload: error.response.data.msg });
  }
};

export const addcart = (items, newQty = items.amount) => {
  return async (dispatch) => {
    const { cartItems } = store.getState().cart;

    const amount = cartItems[items.id]
      ? parseInt(cartItems[items.id].amount + newQty)
      : items.amount;
    cartItems[items.id] = {
      ...items,
      amount,
    };
    if (cartItems) {
      try {
        const cartItems = {
          product: items.id,
          quantity: amount,
        };

        const res = await createOrder(cartItems);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
    dispatch({
      type: ADD_TO_CART,
      payload: { cartItems },
    });
  };
};
export const removeCart = (payload) => async (dispatch) => {
  try {
    const res = await removeUserCart(payload);
    if (res.status === 202) {
      dispatch(getCartItems());
    } else {
      console.log(res.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
export const clearcart = () => async (dispatch) => {
  dispatch({ type: REMOVE_CART_REQUEST });
  try {
    const res = await clearCart();
    if (res.status === 202) {
      dispatch(getCartItems());
      dispatch({ type: REMOVE_CART });
    } else {
      console.log(res.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
