import {
  CLOSE_MODAL,
  DECREASE,
  FETCH_ALL_PRODUCT,
  FETCH_PRODUCT_BY_CATEGORY_FAIL,
  FETCH_PRODUCT_BY_CATEGORY_REQUEST,
  FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
  FETCH_PRODUCT_BY_SEARCH,
  FETCH_SINGLE_PRODUCT,
  INCREASE,
  PRODUCT_ERROR,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCESS,
  SHOW_MODAL,
  TOTAL,
} from '../../Constants/actionTypes';

const initialState = {
  modal: false,
  error: false,
  errorText: '',
  product_loading: false,
  products: [],
  single_product: [],
  product_reviews: [],
  pages: 1,
  numOfPages: 1,
  totalProduct: 0,

  categoryProduct: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT:
      return { ...state, products: action.payload, error: false, modal: false };

    case FETCH_PRODUCT_BY_SEARCH:
      return {
        ...state,
        products: action.payload.product,
        totalProduct: action.payload.totalProduct,
        numOfPages: action.payload.numOfPages,
        error: false,
        modal: false,
      };
    case FETCH_PRODUCT_BY_CATEGORY_REQUEST:
      return {
        ...state,
        product_loading: true,
      };
    case FETCH_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryProduct: action.payload,
        product_loading: false,
      };
    case FETCH_PRODUCT_BY_CATEGORY_FAIL:
      return {
        ...state,
        errorText: action.payload,
        product_loading: false,
        error: true,
      };

    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        single_product: action.payload,
        error: false,
        modal: false,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        products: [],
        error: true,
        errorText: action.payload,
        modal: false,
      };

    case SHOW_MODAL:
      return { ...state, modal: true };

    case CLOSE_MODAL:
      return { ...state, modal: false };

    case INCREASE:
      let tempProduct = state.single_product.map((item) => {
        // console.log(item.amount + 1);
        if (item._id === action.payload.id) {
          let newAmount = item.amount + 1;

          if (newAmount >= item.inventory) {
            newAmount = item.inventory;
          }
          item = { ...item, amount: newAmount };
        }
        return item;
      });

      return { ...state, single_product: tempProduct, error: false };

    case DECREASE:
      let Product = state.single_product.map((item) => {
        // console.log(item.amount + 1);
        if (item._id === action.payload.id) {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          item = { ...item, amount: newAmount };
        }
        return item;
      });

      return { ...state, single_product: Product, error: false };

    case PRODUCT_REVIEW_REQUEST:
      return { ...state, product_loading: true, error: false };

    case PRODUCT_REVIEW_SUCESS:
      return {
        ...state,
        product_loading: false,
        error: false,
        product_reviews: action.payload,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        product_loading: false,
        error: true,
        errorText: 'Something went wrong please try again',
      };

    default:
      return state;
  }
};

export default productReducer;
