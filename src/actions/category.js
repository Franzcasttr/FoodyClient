import { fetchcategory } from '../api';
import {
  FETCH_CATEGORY_FAIL,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from '../Constants/actionTypes';

export const fetchCategory = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORY_REQUEST });
  try {
    const { data } = await fetchcategory();
    const { result } = data;
    dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: result });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_CATEGORY_FAIL, payload: error.response.data.error });
  }
};
