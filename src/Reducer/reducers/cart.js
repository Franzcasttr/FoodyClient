import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  REMOVE_CART,
  REMOVE_CART_FAIL,
  REMOVE_CART_REQUEST,
} from '../../Constants/actionTypes';

const initialState = {
  cartItems: {},
  loading: false,
  shippingfee: 534,
  errorMessage: '',
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, loading: true };

    case ADD_TO_CART:
      return { ...state, cartItems: action.payload.cartItems, loading: false };
    case ADD_TO_CART_FAIL:
      return { ...state, errorMessage: action.payload, loading: false };

    case REMOVE_CART_REQUEST:
      return { ...state, loading: true };
    case REMOVE_CART:
      return { ...state, cartItems: {}, loading: false };
    case REMOVE_CART_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default cartReducer;
