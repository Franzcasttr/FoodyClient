import {
  forgotPassword,
  logoutUser,
  refreshToken,
  showUser,
  signIn,
  signUp,
} from '../api';
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REMOVE_CART,
  SHOW_USER,
  SHOW_USER_FAIL,
  SHOW_USER_REQUEST,
  SIGNIN_BEGIN,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNUP_BEGIN,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../Constants/actionTypes';
import { getCartItems } from './cart';

export const signin = (formData) => async (dispatch) => {
  dispatch({ type: SIGNIN_BEGIN });
  try {
    const res = await signIn(formData);
    const { accessToken } = res.data;

    if (res.status === 200) {
      dispatch(getCartItems());
      dispatch(showuser());
    }
    dispatch({ type: SIGNIN_SUCCESS, payload: accessToken });
  } catch (error) {
    dispatch({ type: SIGNIN_FAIL, payload: error.response.data.msg });
  }
};
export const signup = (formData) => async (dispatch) => {
  dispatch({ type: SIGNUP_BEGIN });
  try {
    const { data } = await signUp(formData);
    const { msg } = data;
    dispatch({ type: SIGNUP_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.response.data.msg });
  }
};

export const forgotpassword = (payload) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const { data } = await forgotPassword(payload);
    const { msg } = data;
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.msg });
  }
};

export const logoutuser = () => async (dispatch) => {
  try {
    await logoutUser();

    dispatch({ type: LOGOUT });
    dispatch({ type: REMOVE_CART });
  } catch (error) {
    console.log(error);
  }
};

export const refreshtoken = () => async (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_REQUEST });
  try {
    const res = await refreshToken();
    const { accessToken } = res.data;

    dispatch(showuser());
    dispatch(getCartItems());
    dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: accessToken });
  } catch (error) {
    dispatch({ type: REFRESH_TOKEN_FAIL, payload: error.response.data });
  }
};

export const showuser = () => async (dispatch) => {
  dispatch({ type: SHOW_USER_REQUEST });
  try {
    const { data } = await showUser();
    const { user } = data;

    dispatch({ type: SHOW_USER, payload: user });
  } catch (error) {
    dispatch({ type: SHOW_USER_FAIL, payload: error.response.data.msg });
  }
};
