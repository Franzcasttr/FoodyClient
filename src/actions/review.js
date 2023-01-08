import { createUserReview, getUserReviews } from '../api';
import {
  CREATE_USER_REVIEW_FAIL,
  CREATE_USER_REVIEW_REQUEST,
  CREATE_USER_REVIEW_SUCESS,
  GET_USER_REVIEW_FAIL,
  GET_USER_REVIEW_REQUEST,
  GET_USER_REVIEW_SUCCESS,
} from '../Constants/actionTypes';
import { getuserorder } from './user';

export const createuserreview = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REVIEW_REQUEST });
  try {
    const { data } = await createUserReview(payload);
    const { review } = data;

    dispatch({ type: CREATE_USER_REVIEW_SUCESS, payload: review });
    dispatch(getuserorder());
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_USER_REVIEW_FAIL,
      payload: error.response.data.msg,
    });
  }
};
export const getuserreviews = () => async (dispatch) => {
  dispatch({ type: GET_USER_REVIEW_REQUEST });
  try {
    const { data } = await getUserReviews();
    const { userReview } = data;

    dispatch({
      type: GET_USER_REVIEW_SUCCESS,
      payload: userReview,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_REVIEW_FAIL,
      payload: error.response.data.msg,
    });
  }
};
