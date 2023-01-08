import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ORDER_FAIL,
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
  ORDER_COMPLETE,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  UPDATE_USER_ADDRESS_FAIL,
  UPDATE_USER_ADDRESS_REQUEST,
  UPDATE_USER_ADDRESS_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../../Constants/actionTypes';

const initialState = {
  address: [],
  loading: false,
  error: '',
  errors: false,
  clientSecret: '',
  order: [],
  favorites: [],
  success: false,
  message: '',
  wishlist: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_ADDRESS_REQUEST:
    //   return { ...state, loading: true };

    // case ADD_ADDRESS_SUCCESS:
    //   return { ...state, address: action.payload.address, loading: false };

    // case ADD_ADDRESS_FAIL:
    //   return { ...state, error: action.payload, loading: false };

    // case UPDATE_USER_ADDRESS_REQUEST:
    //   return { ...state, loading: true };

    // case UPDATE_USER_ADDRESS_SUCCESS:
    //   return { ...state, address: action.payload.address, loading: false };

    // case UPDATE_USER_ADDRESS_FAIL:
    //   return { ...state, error: action.payload, loading: false };

    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };

    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        errors: true,
        error: action.payload,
      };

    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };

    case USER_UPDATE_FAIL:
      return { ...state, error: action.payload, loading: false };

    case GET_USER_ADDRESS_REQUEST:
      return { ...state, loading: true };

    case GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.payload.userAddress, loading: false };

    case GET_USER_ADDRESS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case DELETE_USER_ADDRESS_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };

    case DELETE_USER_ADDRESS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case ADD_ORDER_REQUEST:
      return { ...state, loading: true };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        loading: false,
      };

    case ADD_ORDER_FAIL:
      return { ...state, error: action.payload, loading: false };

    case CREATE_PAYMENT_INTENT_SUCCESS:
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        loading: false,
      };

    case GET_USER_ORDER_REQUEST:
      return { ...state, loading: true };

    case GET_USER_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload.orders };

    case GET_USER_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_TO_FAVORITE_REQUEST:
      return { ...state, loading: true };

    case ADD_TO_FAVORITE_SUCCESS:
      return { ...state, loading: false };

    case ADD_TO_FAVORITE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_USER_FAVORITE_REQUEST:
      return { ...state, loading: true };

    case GET_USER_FAVORITE_SUCCESS:
      return { ...state, loading: false, favorites: action.payload.favorite };

    case GET_USER_FAVORITE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_FAVORITE_REQUEST:
      return { ...state, loading: true };

    case REMOVE_FAVORITE_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };

    case REMOVE_FAVORITE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
