import {
  getAllProduct,
  getProductByCategory,
  getProductBySearch,
  getProductBySearch2,
  getSingleProduct,
  getSingleProductReview,
} from '../api';
import {
  FETCH_ALL_PRODUCT,
  FETCH_PRODUCT_BY_CATEGORY_FAIL,
  FETCH_PRODUCT_BY_CATEGORY_REQUEST,
  FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
  FETCH_PRODUCT_BY_SEARCH,
  FETCH_SINGLE_PRODUCT,
  PRODUCT_ERROR,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCESS,
} from '../Constants/actionTypes';

export const fetchallproduct = () => async (dispatch) => {
  try {
    const { data } = await getAllProduct();
    const { product } = data;
    dispatch({ type: FETCH_ALL_PRODUCT, payload: product });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await getProductBySearch(search);
    const { product, totalProduct, numOfPages } = data;

    dispatch({
      type: FETCH_PRODUCT_BY_SEARCH,
      payload: { product, totalProduct, numOfPages },
    });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.msg });
  }
};
export const fetchproductbycategory = (search) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_BY_CATEGORY_REQUEST });
  try {
    const { data } = await getProductByCategory(search);
    const { product } = data;
    dispatch({ type: FETCH_PRODUCT_BY_CATEGORY_SUCCESS, payload: product });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_BY_CATEGORY_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const fetchProductBySearch2 = (search) => async (dispatch) => {
  try {
    const { data } = await getProductBySearch2(search);
    const { product, totalProduct, numOfPages } = data;

    dispatch({
      type: FETCH_PRODUCT_BY_SEARCH,
      payload: { product, totalProduct, numOfPages },
    });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.msg });
  }
};

export const singleproduct = (id) => async (dispatch) => {
  try {
    const { data } = await getSingleProduct(id);
    const { product } = data;
    dispatch({ type: FETCH_SINGLE_PRODUCT, payload: product });
  } catch (error) {
    console.log(error);
  }
};
export const singleproductreview = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_REVIEW_REQUEST });
  try {
    const { data } = await getSingleProductReview(id);
    const { review } = data;

    dispatch({ type: PRODUCT_REVIEW_SUCESS, payload: review });
  } catch (error) {
    console.log(error);
    dispatch({ type: PRODUCT_REVIEW_FAIL });
  }
};
