import {
  addToFavorite,
  changePassword,
  createAddress,
  createPayment,
  createUserOrder,
  getAddress,
  getUserFavorite,
  getUserOrder,
  removeFromFavorite,
  removeUserAddress,
  updateAddress,
  updateUser,
} from '../api';
import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_TO_FAVORITE_FAIL,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_PAYMENT_INTENT_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  GET_USER_ADDRESS_REQUEST,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_FAVORITE_FAIL,
  GET_USER_FAVORITE_REQUEST,
  GET_USER_FAVORITE_SUCCESS,
  GET_USER_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  UPDATE_USER_ADDRESS_FAIL,
  UPDATE_USER_ADDRESS_REQUEST,
  UPDATE_USER_ADDRESS_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../Constants/actionTypes';
import { showuser } from './auth';

export const createaddress = (payload) => async (dispatch) => {
  dispatch({ type: ADD_ADDRESS_REQUEST });
  try {
    const { data } = await createAddress(payload);
    const { result: address } = data;
    dispatch(getaddress());
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: { address } });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_ADDRESS_FAIL, payload: error.response.data.msg });
  }
};

export const getaddress = () => async (dispatch) => {
  dispatch({ type: GET_USER_ADDRESS_REQUEST });
  try {
    const { data } = await getAddress();
    const { userAddress } = data;

    dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: { userAddress } });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_ADDRESS_FAIL, payload: error.response.data.msg });
  }
};
export const updateaddress = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_ADDRESS_REQUEST });
  try {
    const { data } = await updateAddress(payload);
    const { address } = data;
    dispatch(getaddress());

    dispatch({ type: UPDATE_USER_ADDRESS_SUCCESS, payload: { address } });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_USER_ADDRESS_FAIL,
      payload: error.response.data.msg,
    });
  }
};
export const updateuser = (form) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    const res = await updateUser(form);
    const { msg } = res.data;
    if (res.status === 200) {
      dispatch(showuser());
    }

    dispatch({ type: USER_UPDATE_SUCCESS, payload: msg });
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data.msg });
  }
};

export const changepassword = (payload) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });
  try {
    const res = await changePassword(payload);
    const { msg } = res.data;
    if (res.status === 200) {
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: msg });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.response.data.msg });
  }
};

export const removeuseraddress = (_id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_ADDRESS_REQUEST });
  try {
    const { data } = await removeUserAddress(_id);
    const { msg } = data;

    dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: msg });
    dispatch(getaddress());
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_USER_ADDRESS_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const createuserorder = (payload) => async (dispatch) => {
  dispatch({ type: ADD_ORDER_REQUEST });
  try {
    const { data } = await createUserOrder(payload);
    const { clientSecret } = data;
    dispatch({ type: ADD_ORDER_SUCCESS, payload: { clientSecret } });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_ADDRESS_FAIL, payload: error.response.data.msg });
  }
};

export const getuserorder = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDER_REQUEST });
  try {
    const { data } = await getUserOrder();
    const { orders } = data;
    dispatch({ type: GET_USER_ORDER_SUCCESS, payload: { orders } });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_ORDER_FAIL, payload: error.response.data.msg });
  }
};

export const createpayment = (payload) => async (dispatch) => {
  try {
    const { data } = await createPayment(payload);
    const { clientSecret } = data;
    dispatch({
      type: CREATE_PAYMENT_INTENT_SUCCESS,
      payload: { clientSecret },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addtofavorite = (product) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const { data } = await addToFavorite(product);
    const { favorite } = data;
    dispatch({ type: ADD_TO_FAVORITE_SUCCESS });
    dispatch(getuserfavorite());
    // dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: { favorite } });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_TO_FAVORITE_FAIL, payload: error.response.data.msg });
  }
};

export const getuserfavorite = () => async (dispatch) => {
  dispatch({ type: GET_USER_FAVORITE_REQUEST });
  try {
    const { data } = await getUserFavorite();
    const { favorite } = data;
    dispatch({ type: GET_USER_FAVORITE_SUCCESS, payload: { favorite } });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_FAVORITE_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const removefromfavorite = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITE_REQUEST });
  try {
    const res = await removeFromFavorite(id);
    const { message } = res.data;
    dispatch({ type: REMOVE_FAVORITE_SUCCESS, payload: { message } });

    dispatch(getuserfavorite());
  } catch (error) {
    console.log(error);
    dispatch({ type: REMOVE_FAVORITE_FAIL, payload: error.response.data.msg });
  }
};
