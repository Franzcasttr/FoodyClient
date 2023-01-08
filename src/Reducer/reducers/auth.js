import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SHOW_USER,
  SHOW_USER_FAIL,
  SHOW_USER_REQUEST,
  SIGNIN_BEGIN,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNUP_BEGIN,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../../Constants/actionTypes';

const initialState = {
  showAlert: false,
  isError: false,
  isLoading: false,
  alertText: '',
  alertType: '',
  user: null,
  token: '',
  tokenLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        showAlert: false,
        token: action.payload,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case SIGNUP_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertText: action.payload,
        alertType: 'success',
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertText: action.payload,
        alertType: 'success',
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertText: action.payload,
        alertType: 'success',
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case SHOW_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SHOW_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case SHOW_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        tokenLoading: true,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        tokenLoading: false,
      };
    case REFRESH_TOKEN_FAIL:
      return {
        ...state,
        tokenLoading: false,
        isError: true,
        alertText: action.payload,
        alertType: 'danger',
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
export default authReducer;
